'use client';

import { useMemo } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
  // Memoize chart calculations
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    const barWidth = 100 / data.length;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    return {
      maxValue,
      minValue,
      range,
      bars: data.map((point, index) => ({
        ...point,
        x: index * barWidth,
        width: barWidth * 0.8,
        height: ((point.value - minValue) / range) * 100,
        color: point.color || colors[index % colors.length],
      })),
    };
  }, [data]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <div className="relative" style={{ height: `${height}px` }}>
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}
          {/* Bars */}
          {chartData.bars.map((bar, index) => (
            <rect
              key={index}
              x={bar.x + bar.width * 0.1}
              y={100 - bar.height}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              opacity="0.8"
            />
          ))}
        </svg>
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {chartData.bars.map((bar, index) => (
            <div key={index} className="flex-1 text-center truncate">
              {bar.label}
            </div>
          ))}
        </div>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>{chartData.maxValue.toLocaleString()}</span>
          <span>{((chartData.maxValue + chartData.minValue) / 2).toLocaleString()}</span>
          <span>{chartData.minValue.toLocaleString()}</span>
        </div>
        {/* Value labels on bars */}
        <div className="absolute top-0 left-0 right-0" style={{ height: `${height}px` }}>
          {chartData.bars.map((bar, index) => (
            <div
              key={index}
              className="absolute text-xs font-medium text-gray-700"
              style={{
                left: `${bar.x + bar.width * 0.1}%`,
                width: `${bar.width}%`,
                bottom: `${100 - bar.height}%`,
                transform: 'translateY(100%)',
              }}
            >
              {bar.value.toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
