import React, { useState } from 'react';
import { 
  Users, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ADOPTION_TREND_DATA } from '../data/mockData';

export default function Chart2AdoptionTrend() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG Chart Dimensions with generous height and negative space
  const width = 960;
  const height = 260;
  const padding = { top: 32, right: 36, bottom: 44, left: 52 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxUsers = 950;

  // Scale helpers
  const getX = (index) => padding.left + (index / (ADOPTION_TREND_DATA.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - (val / maxUsers) * chartHeight;

  // Sanctioned points (bottom layer)
  const sanctionedPoints = ADOPTION_TREND_DATA.map((d, i) => `${getX(i)},${getY(d.sanctioned)}`);
  const sanctionedAreaPath = `
    M ${getX(0)},${getY(0)}
    L ${sanctionedPoints.join(' L ')}
    L ${getX(ADOPTION_TREND_DATA.length - 1)},${getY(0)}
    Z
  `;

  // Total points (top layer = sanctioned + shadow)
  const totalPoints = ADOPTION_TREND_DATA.map((d, i) => `${getX(i)},${getY(d.total)}`);
  const totalAreaPath = `
    M ${getX(0)},${getY(ADOPTION_TREND_DATA[0].sanctioned)}
    L ${totalPoints.join(' L ')}
    L ${getX(ADOPTION_TREND_DATA.length - 1)},${getY(ADOPTION_TREND_DATA[ADOPTION_TREND_DATA.length - 1].sanctioned)}
    L ${sanctionedPoints.reverse().join(' L ')}
    Z
  `;

  const activePoint = hoveredIndex !== null ? ADOPTION_TREND_DATA[hoveredIndex] : ADOPTION_TREND_DATA[ADOPTION_TREND_DATA.length - 1];

  return (
    <div className="bg-white rounded-[14px] border border-[#E2E9F2] p-6 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <h3 className="text-[15px] font-semibold text-[#12233F] tracking-tight">
          12-Week Adoption Trend: Approved vs. Unapproved Tools
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3152F5]"></span>
            <span className="text-[#12233F] font-semibold">Approved Tools</span>
            <span className="text-[#60738F] tabular-nums">({activePoint.sanctioned})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E64D5B]"></span>
            <span className="text-[#12233F] font-semibold">Unapproved (Shadow)</span>
            <span className="text-[#60738F] tabular-nums">({activePoint.shadow} • {activePoint.shadowPct}%)</span>
          </div>
        </div>
      </div>

      <p className="text-[13px] text-[#60738F] mb-5">
        Weekly employee activity comparing official enterprise contracts against unvetted personal accounts over the past 12 weeks.
      </p>

      {/* SVG Interactive Area Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-64 select-none"
        >
          {/* Subtle Horizontal Grid lines */}
          {[0, 300, 600, 900].map((tick) => (
            <g key={tick}>
              <line 
                x1={padding.left} 
                y1={getY(tick)} 
                x2={width - padding.right} 
                y2={getY(tick)} 
                stroke="#E2E9F2" 
                strokeWidth="1"
              />
              <text 
                x={padding.left - 12} 
                y={getY(tick) + 4} 
                textAnchor="end" 
                className="text-[11px] fill-[#8B9BB2] font-sans tabular-nums font-medium"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Shadow AI Layer (Restrained Danger Tint) */}
          <path 
            d={totalAreaPath} 
            fill="rgba(230, 77, 91, 0.08)" 
            stroke="#E64D5B"
            strokeWidth="1.8"
          />

          {/* Sanctioned Layer (Brand Primary Blue) */}
          <path 
            d={sanctionedAreaPath} 
            fill="rgba(49, 82, 245, 0.08)" 
            stroke="#3152F5"
            strokeWidth="2.2"
          />

          {/* Milestone Annotations */}
          {ADOPTION_TREND_DATA.map((d, i) => {
            if (!d.event) return null;
            const x = getX(i);

            return (
              <g key={d.week}>
                <line 
                  x1={x} 
                  y1={padding.top} 
                  x2={x} 
                  y2={padding.top + chartHeight} 
                  stroke="#CBD5E1" 
                  strokeDasharray="3 3" 
                  strokeWidth="1.2"
                />
                <circle 
                  cx={x} 
                  cy={padding.top} 
                  r="3.5" 
                  fill="#12233F" 
                />
                <text 
                  x={x} 
                  y={padding.top - 10} 
                  textAnchor="middle" 
                  className="text-[11px] font-semibold fill-[#12233F] font-sans"
                >
                  {d.event}
                </text>
              </g>
            );
          })}

          {/* X-Axis Week Labels */}
          {ADOPTION_TREND_DATA.map((d, i) => {
            const showLabel = i % 2 === 0 || i === ADOPTION_TREND_DATA.length - 1;
            if (!showLabel) return null;
            const x = getX(i);
            const isHovered = hoveredIndex === i;

            return (
              <g key={d.week}>
                <text 
                  x={x} 
                  y={height - 12} 
                  textAnchor="middle" 
                  className={`text-[11px] font-medium font-sans ${isHovered ? 'fill-[#12233F] font-bold' : 'fill-[#8B9BB2]'}`}
                >
                  {d.week}
                </text>
              </g>
            );
          })}

          {/* Interactive Hover Hitboxes */}
          {ADOPTION_TREND_DATA.map((d, i) => {
            const x = getX(i);
            const stepWidth = chartWidth / (ADOPTION_TREND_DATA.length - 1);

            return (
              <rect
                key={d.week}
                x={x - stepWidth / 2}
                y={padding.top}
                width={stepWidth}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}

          {/* Hover Indicator Crosshair */}
          {hoveredIndex !== null && (
            <g>
              <line 
                x1={getX(hoveredIndex)} 
                y1={padding.top} 
                x2={getX(hoveredIndex)} 
                y2={padding.top + chartHeight} 
                stroke="#12233F" 
                strokeWidth="1.5"
              />
              <circle 
                cx={getX(hoveredIndex)} 
                cy={getY(activePoint.sanctioned)} 
                r="4.5" 
                fill="#3152F5" 
                stroke="#FFFFFF" 
                strokeWidth="2" 
              />
              <circle 
                cx={getX(hoveredIndex)} 
                cy={getY(activePoint.total)} 
                r="4.5" 
                fill="#E64D5B" 
                stroke="#FFFFFF" 
                strokeWidth="2" 
              />
            </g>
          )}
        </svg>
      </div>

      {/* Trajectory Strategic Insight Footer */}
      <div className="mt-4 pt-3.5 border-t border-[#E2E9F2] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#60738F] min-w-0 pr-2">
          <Info className="w-4 h-4 text-[#8B9BB2] shrink-0" strokeWidth={2} />
          <span className="leading-relaxed">
            <strong className="text-[#12233F] font-semibold">Key Trend:</strong> Unapproved AI usage dropped from 44% down to 14% after browser data protection was enabled.
          </span>
        </div>

        {/* Selected Week & Users Badge with Generous Spacing */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[8px] bg-[#F0F4F9] border border-[#E2E9F2] text-xs shrink-0 self-start md:self-auto">
          <span className="text-[#8B9BB2] font-medium">Timeline:</span>
          <span className="font-semibold text-[#12233F]">{activePoint.week}</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="font-semibold text-[#3152F5] tabular-nums">{activePoint.total.toLocaleString()}</span>
          <span className="text-[#60738F]">active users</span>
        </div>
      </div>

    </div>
  );
}
