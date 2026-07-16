import { motion } from 'framer-motion';

interface LineChartProps {
  data: { month: string; score: number }[];
  width?: number;
  height?: number;
}

export default function LineChart({ data, width = 560, height = 200 }: LineChartProps) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const max = 100;
  const min = 40;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.score - min) / (max - min)) * h;
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[400px]"
        style={{ height }}
      >
        <defs>
          <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3563ff" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3563ff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#3563ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
            <line
              key={i}
              x1="0"
              y1={h * t}
              x2={w}
              y2={h * t}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Y labels */}
          {[100, 75, 50].map((v, i) => (
            <text
              key={i}
              x="-8"
              y={h - ((v - min) / (max - min)) * h}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-slate-500 text-[10px]"
            >
              {v}
            </text>
          ))}

          {/* Area */}
          <motion.path
            d={areaPath}
            fill="url(#lineFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Line */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#lineStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#0a0b1a"
              stroke="url(#lineStroke)"
              strokeWidth="2.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* X labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={h + 22}
              textAnchor="middle"
              className="fill-slate-500 text-[10px]"
            >
              {p.month}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
