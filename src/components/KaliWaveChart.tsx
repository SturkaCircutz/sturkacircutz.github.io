'use client';

import React, { useEffect, useRef } from 'react';

interface KaliWaveChartProps {
  value: number; // 0-100
  height?: number;
  color?: string;
  animated?: boolean;
}

const KaliWaveChart: React.FC<KaliWaveChartProps> = ({ 
  value, 
  height = 40, 
  color = 'green',
  animated = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'rgb(var(--accent))';
      case 'yellow': return '#ffff00';
      case 'orange': return '#ff8800';
      case 'red': return '#ff0000';
      case 'cyan': return '#00ffff';
      case 'purple': return '#8800ff';
      default: return 'rgb(var(--accent))';
    }
  };

  const drawWave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate wave parameters
    const normalizedValue = value / 100;
    const waveHeight = height * 0.6;
    const centerY = height / 2;
    const time = timeRef.current * 0.01;
    
    // Draw multi-layer waves
    const layers = [
      { amplitude: waveHeight * normalizedValue * 0.8, frequency: 0.02, phase: 0, alpha: 0.8 },
      { amplitude: waveHeight * normalizedValue * 0.6, frequency: 0.03, phase: Math.PI / 3, alpha: 0.6 },
      { amplitude: waveHeight * normalizedValue * 0.4, frequency: 0.05, phase: Math.PI / 2, alpha: 0.4 },
    ];

    layers.forEach((layer, layerIndex) => {
      ctx.beginPath();
      ctx.strokeStyle = getColorClass(color);
      ctx.lineWidth = 2;
      ctx.globalAlpha = layer.alpha;
      
      // Draw main wave
      for (let x = 0; x < width; x += 2) {
        const y = centerY + 
          Math.sin(x * layer.frequency + time + layer.phase) * layer.amplitude +
          Math.sin(x * layer.frequency * 2 + time * 1.5 + layer.phase) * layer.amplitude * 0.3 +
          Math.sin(x * layer.frequency * 3 + time * 0.8 + layer.phase) * layer.amplitude * 0.1;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw 3D effect - shadow
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 3;
      ctx.globalAlpha = layer.alpha * 0.5;
      
      for (let x = 0; x < width; x += 2) {
        const y = centerY + 
          Math.sin(x * layer.frequency + time + layer.phase) * layer.amplitude +
          Math.sin(x * layer.frequency * 2 + time * 1.5 + layer.phase) * layer.amplitude * 0.3 +
          Math.sin(x * layer.frequency * 3 + time * 0.8 + layer.phase) * layer.amplitude * 0.1 + 2;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    // Draw data points
    const pointSpacing = width / 20;
    for (let i = 0; i < 20; i++) {
      const x = i * pointSpacing;
      const y = centerY + 
        Math.sin(x * 0.02 + time) * waveHeight * normalizedValue * 0.8 +
        Math.sin(x * 0.03 + time + Math.PI / 3) * waveHeight * normalizedValue * 0.6 +
        Math.sin(x * 0.05 + time + Math.PI / 2) * waveHeight * normalizedValue * 0.4;
      
      // Draw glowing points
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = getColorClass(color);
      ctx.globalAlpha = 0.8;
      ctx.fill();
      
      // Draw outer ring glow effect
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.strokeStyle = getColorClass(color);
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Add random flicker effect
      if (Math.random() > 0.95) {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.strokeStyle = getColorClass(color);
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Draw border
    ctx.strokeStyle = getColorClass(color);
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    ctx.strokeRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (width / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Reset transparency
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    if (!animated) {
      drawWave();
      return;
    }

    const animate = () => {
      timeRef.current += 1;
      drawWave();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, animated, color]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={200}
        height={height}
        className="w-full"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Add scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-[rgb(var(--accent))] to-transparent opacity-60"
          style={{
            animation: 'scan 2s linear infinite',
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      </div>
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(${height}px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default KaliWaveChart;
