'use client';

import React, { useState, useEffect } from 'react';
import KaliWaveChart from './KaliWaveChart';

interface CPUData {
  usage: number;
  cores: number[];
  temperature: number;
  frequency: number;
  coresCount: number;
}

interface SystemData {
  cpu: CPUData;
  memory: {
    total: number;
    used: number;
    free: number;
    usage: number;
  };
  system: {
    platform: string;
    distro: string;
    release: string;
    arch: string;
    hostname: string;
  };
  timestamp: string;
}

const CPUMonitor: React.FC = () => {
  const [cpuData, setCpuData] = useState<CPUData>({
    usage: 0,
    cores: [0, 0, 0, 0, 0, 0, 0, 0],
    temperature: 45,
    frequency: 2400,
    coresCount: 8
  });

  const [memoryData, setMemoryData] = useState({
    total: 16,
    used: 8,
    free: 8,
    usage: 50
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isRealData, setIsRealData] = useState(false);

  // Get real system data
  const fetchSystemData = async () => {
    try {
      const response = await fetch('/api/system');
      const data: SystemData = await response.json();
      
      setCpuData({
        usage: data.cpu.usage,
        cores: data.cpu.cores,
        temperature: data.cpu.temperature,
        frequency: data.cpu.frequency,
        coresCount: data.cpu.coresCount
      });
      
      setMemoryData({
        total: data.memory.total,
        used: data.memory.used,
        free: data.memory.free,
        usage: data.memory.usage
      });
      
      setIsRealData(true);
    } catch (error) {
      console.error('Failed to fetch system data:', error);
      setIsRealData(false);
    }
  };

  // Get real CPU data
  useEffect(() => {
    // Get data immediately once
    fetchSystemData();
    
    // Update every 2 seconds
    const interval = setInterval(fetchSystemData, 2000);

    return () => clearInterval(interval);
  }, []);

  // Show/hide animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getUsageColor = (usage: number) => {
    if (usage < 30) return 'text-[rgb(var(--accent))]';
    if (usage < 60) return 'text-yellow-400';
    if (usage < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={`fixed right-4 top-24 z-40 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className="w-64 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 p-3 font-mono text-xs shadow-2xl backdrop-blur-sm">
        {/* Title */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isRealData ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold text-[rgb(var(--accent))]">SYS MONITOR</span>
            {isRealData && <span className="text-xs text-[rgb(var(--accent-strong))]">LIVE</span>}
          </div>
          <div className="text-xs text-[rgb(var(--muted))]">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Overall CPU usage */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[rgb(var(--muted))]">CPU</span>
            <span className={`font-bold text-xs ${getUsageColor(cpuData.usage)}`}>
              {cpuData.usage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <KaliWaveChart 
              value={cpuData.usage} 
              height={20}
              color={cpuData.usage < 30 ? 'green' : cpuData.usage < 60 ? 'yellow' : cpuData.usage < 80 ? 'orange' : 'red'}
              animated={true}
            />
          </div>
        </div>

        {/* Memory usage */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-[rgb(var(--muted))]">RAM</span>
            <span className={`font-bold text-xs ${getUsageColor(memoryData.usage)}`}>
              {memoryData.usage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <KaliWaveChart 
              value={memoryData.usage} 
              height={20}
              color={memoryData.usage < 30 ? 'green' : memoryData.usage < 60 ? 'yellow' : memoryData.usage < 80 ? 'orange' : 'red'}
              animated={true}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-[rgb(var(--muted))]">
            <span>{memoryData.used.toFixed(1)}G</span>
            <span>{memoryData.total.toFixed(1)}G</span>
          </div>
        </div>

        {/* Core usage */}
        <div className="mb-3">
          <div className="mb-1 text-xs text-[rgb(var(--muted))]">CORES</div>
          <div className="grid grid-cols-4 gap-1">
            {cpuData.cores.slice(0, 4).map((core, index) => (
              <div key={index} className="text-center">
                <div className="mb-1 text-xs text-[rgb(var(--muted))]">C{index + 1}</div>
                <div className="relative">
                  <KaliWaveChart 
                    value={core} 
                    height={15}
                    color={core < 30 ? 'green' : core < 60 ? 'yellow' : core < 80 ? 'orange' : 'red'}
                    animated={true}
                  />
                </div>
                <div className={`text-xs mt-1 ${getUsageColor(core)}`}>
                  {core.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System information */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-[rgb(var(--muted))]">TEMP:</span>
            <span className="text-yellow-400">{cpuData.temperature.toFixed(1)}°C</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[rgb(var(--muted))]">FREQ:</span>
            <span className="text-blue-400">{(cpuData.frequency / 1000).toFixed(1)}G</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[rgb(var(--muted))]">CORES:</span>
            <span className="text-[rgb(var(--accent))]">{cpuData.coresCount}</span>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-2 border-t border-[rgb(var(--border))] pt-1">
          <div className="flex space-x-1">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="h-1 w-1 animate-pulse rounded-full bg-[rgb(var(--accent))]/40"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPUMonitor;
