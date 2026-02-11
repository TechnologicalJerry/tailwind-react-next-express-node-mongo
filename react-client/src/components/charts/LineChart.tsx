'use client';

import { useMemo } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title, height = 300 }) => {
  // Memoize chart calculations
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    return {
      maxValue,
      minValue,
      range,
      points: data.map((point, index) => ({
        ...point,
        x: (index / (data.length - 1 || 1)) * 100,
        y: ((point.value - minValue) / range) * 100,
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

  const pathData = chartData.points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${100 - point.y}`)
    .join(' ');

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
          {/* Line path */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {chartData.points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={100 - point.y}
              r="2"
              fill="#3b82f6"
            />
          ))}
        </svg>
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {chartData.points.map((point, index) => (
            <span key={index} className="truncate max-w-[80px]">
              {point.label}
            </span>
          ))}
        </div>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>{chartData.maxValue.toLocaleString()}</span>
          <span>{((chartData.maxValue + chartData.minValue) / 2).toLocaleString()}</span>
          <span>{chartData.minValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
