import React from "react";

interface SpeedometerGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  trendPct?: number;
  className?: string;
}

export function SpeedometerGauge({
  value,
  max,
  label,
  unit = "",
  trendPct,
  className = "",
}: SpeedometerGaugeProps) {
  const pct = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  const radius = 42;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className={className}>
      <div className="relative inline-flex flex-col items-center">
        <svg
          viewBox="0 0 100 60"
          className="w-full max-w-[140px] h-auto"
          aria-hidden
        >
          <defs>
            <linearGradient id="gauge-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A4BE86" />
              <stop offset="100%" stopColor="#77A440" />
            </linearGradient>
          </defs>
          <path
            d="M 8 52 A 42 42 0 0 1 92 52"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 8 52 A 42 42 0 0 1 92 52"
            fill="none"
            stroke="url(#gauge-fill)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-xl font-raleway-bold text-primary tabular-nums">
            {value}
          </span>
          {unit && (
            <span className="text-xs text-body-color font-raleway-medium ml-0.5">
              {unit}
            </span>
          )}
        </div>
      </div>
      <p className="text-xs font-raleway-medium text-body-color text-center mt-1 leading-tight">
        {label}
      </p>
      {trendPct !== undefined && (
        <p className={`text-xs font-raleway-medium text-center mt-0.5 tabular-nums ${trendPct >= 0 ? "text-green-700" : "text-amber-700"}`}>
          {trendPct >= 0 ? "↑" : "↓"} {Math.abs(trendPct)}% vs last month
        </p>
      )}
    </div>
  );
}
