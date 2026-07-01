import { NextResponse } from 'next/server';

const portfolioEmail = "313721325sjw@gmail.com";

// Check if running in server environment
const isServerEnvironment = typeof window === 'undefined' && process.env.NODE_ENV === 'production';

// Helper function to create system data
const createSystemData = (overrides: {
  cpu?: Partial<{
    usage: number;
    cores: number[];
    temperature: number;
    frequency: number;
    coresCount: number;
    manufacturer: string;
    brand: string;
  }>;
  memory?: Partial<{
    total: number;
    used: number;
    free: number;
    usage: number;
  }>;
  system?: Partial<{
    platform: string;
    distro: string;
    release: string;
    arch: string;
    hostname: string;
  }>;
  contact?: Partial<{
    email: string;
  }>;
} = {}) => ({
  cpu: {
    usage: Math.random() * 100,
    cores: Array(8).fill(0).map(() => Math.random() * 100),
    temperature: 40 + Math.random() * 30,
    frequency: 2000 + Math.random() * 2000,
    coresCount: 8,
    manufacturer: "Server",
    brand: "Cloud Instance",
    ...overrides.cpu
  },
  memory: {
    total: 16,
    used: Math.random() * 16,
    free: 16 - Math.random() * 16,
    usage: Math.random() * 100,
    ...overrides.memory
  },
  system: {
    platform: "server",
    distro: "Cloud",
    release: "Production",
    arch: "x64",
    hostname: "cloud-server",
    ...overrides.system
  },
  contact: {
    email: portfolioEmail,
    ...overrides.contact
  },
  timestamp: new Date().toISOString()
});

export async function GET() {
  try {
    // In server environment, return mock data directly
    if (isServerEnvironment) {
      return NextResponse.json(createSystemData());
    }

    // In development environment, try to use systeminformation
    const si = await import('systeminformation');
    
    // Get CPU information
    const cpu = await si.cpu();
    const cpuCurrentSpeed = await si.cpuCurrentSpeed();
    const cpuTemperature = await si.cpuTemperature();
    const cpuLoad = await si.currentLoad();
    
    // Get memory information
    const mem = await si.mem();
    
    // Get system information
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const system = await si.system() as Record<string, any>;
    
    // Calculate CPU usage
    const cpuUsage = cpuLoad.currentLoad;
    const cores = cpuLoad.cpus.map(core => core.load);
    
    // Get CPU temperature (if available)
    const temperature = cpuTemperature.main || 45; // Default 45 degrees
    
    // Get CPU frequency
    const frequency = cpuCurrentSpeed.avg || cpu.speed || 2400;
    
    const systemData = {
      cpu: {
        usage: Math.round(cpuUsage * 100) / 100,
        cores: cores.map(load => Math.round(load * 100) / 100),
        temperature: Math.round(temperature * 10) / 10,
        frequency: Math.round(frequency),
        coresCount: cpu.cores,
        manufacturer: cpu.manufacturer,
        brand: cpu.brand
      },
      memory: {
        total: Math.round(mem.total / 1024 / 1024 / 1024 * 100) / 100, // GB
        used: Math.round(mem.used / 1024 / 1024 / 1024 * 100) / 100, // GB
        free: Math.round(mem.free / 1024 / 1024 / 1024 * 100) / 100, // GB
        usage: Math.round((mem.used / mem.total) * 100 * 100) / 100 // Percentage
      },
      system: {
        platform: system.platform || 'unknown',
        distro: system.distro || 'Unknown',
        release: system.release || 'Unknown',
        arch: system.arch || 'x64',
        hostname: system.hostname || 'localhost'
      },
      contact: {
        email: portfolioEmail
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(systemData);
  } catch (error) {
    console.error('Error fetching system data:', error);
    
    // If getting real data fails, return mock data
    return NextResponse.json(createSystemData({
      cpu: { manufacturer: "Unknown", brand: "Unknown" },
      system: { platform: "unknown", distro: "Unknown", release: "Unknown", hostname: "localhost" }
    }));
  }
}
