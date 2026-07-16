import { motion } from 'framer-motion';

interface RadarChartProps {
  data: { label: string; value: number }[];
  size?: number;
}

export default function RadarChart({ data, size = 320 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 50;
  const angles = data.map((_, i) => (Math.PI * 2 * i) / data.length - Math.PI / 2);

  const pointFor = (value: number, i: number) => {
    const r = (value / 100) * radius;
    return [cx + r * Math.cos(angles[i]), cy + r * Math.sin(angles[i])];
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = data.map((d, i) => pointFor(d.value, i));
  const polygon = dataPoints.map((p) => p.join(',')).join(' ');

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3563ff" stopOpacity="0.4" />
            <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a8aff" />
            <stop offset="0.5" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridLevels.map((level, gi) => (
          <polygon
            key={gi}
            points={data.map((_, i) => {
              const r = level * radius;
              return [cx + r * Math.cos(angles[i]), cy + r * Math.sin(angles[i])].join(',');
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {angles.map((a, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + radius * Math.cos(a)}
            y2={cy + radius * Math.sin(a)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <motion.polygon
          points={polygon}
          fill="url(#radarFill)"
          stroke="url(#radarStroke)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="4"
            fill="#fff"
            stroke="#5a8aff"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const lx = cx + (radius + 28) * Math.cos(angles[i]);
          const ly = cy + (radius + 28) * Math.sin(angles[i]);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-300 text-[11px] font-medium"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
