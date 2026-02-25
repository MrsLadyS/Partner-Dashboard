/**
 * Dreamlife-Sim Partner Dashboard – Standalone static site (demo).
 * Same design as Dreamlife-Sim. No connection to main web app, Android, or iOS.
 */

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SpeedometerGauge } from "./components/SpeedometerGauge";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Calendar,
  Link2,
  Plus,
  List,
  TrendingUp,
  TrendingDown,
  Target,
  Upload,
  ImagePlus,
  MessageCircle,
  Reply,
} from "lucide-react";

// Partner has 300 members signed up – all user counts scale from this base
const PARTNER_MEMBERS = 300;

const MOCK_FUNNEL_BREAKDOWN = [
  { product: "Open a Checking Account", clicks: 24 },
  { product: "Mortgage Pre-Approval", clicks: 14 },
  { product: "Apply for a Credit Card", clicks: 4 },
  { product: "Business Loan", clicks: 8 },
];

const MOCK_GOALS_BREAKDOWN = [
  { period: "1-Month Goals", count: 48 },
  { period: "3-Month Goals", count: 96 },
  { period: "12-Month Goals", count: 27 },
];

const MOCK_STAFF_HOURS_SAVED = 100; // ~400 touchpoints × 15 min

const MOCK_ORIGIN_BREAKDOWN = [
  { origin: "Links from Your Website", count: 10 },
  { origin: "Community Workshop", count: 8 },
  { origin: "Branch Event", count: 6 },
  { origin: "Digital / App", count: 3 },
];

// Task Agent prompts – user counts scaled for 300 members
const MOCK_TASK_AGENT_PROMPTS = [
  { action: "Open High Yield Savings", goalContext: "Emergency fund / short-term savings", users: 72, horizon: "3 mo", trendPct: 18, focus: true },
  { action: "Debt consolidation or refinance", goalContext: "Pay off debt", users: 57, horizon: "6 mo", trendPct: 12, focus: true },
  { action: "Auto loan pre-qual or savings for down payment", goalContext: "Buy a car", users: 48, horizon: "90 days", trendPct: 8, focus: true },
  { action: "Open Investment account", goalContext: "Longer-term goals / first home (5+ yr)", users: 37, horizon: "90 days", trendPct: 5, focus: false },
  { action: "Open High Yield Savings or Investment account", goalContext: "First home down payment", users: 27, horizon: "6–12 mo", trendPct: -3, focus: false },
  { action: "Open Credit Card", goalContext: "Building credit", users: 33, horizon: "90 days", trendPct: 6, focus: false },
  { action: "Open CD or Student checking", goalContext: "College / teen turning 14+", users: 23, horizon: "12 mo", trendPct: 2, focus: false },
];
const PROMPTS_MAX = Math.max(...MOCK_TASK_AGENT_PROMPTS.map((d) => d.users));
const FOCUS_PROMPTS = MOCK_TASK_AGENT_PROMPTS.filter((d) => d.focus);

const MOCK_WEEKLY_METRICS = [
  { label: "Weekly Active Members", value: 180, max: PARTNER_MEMBERS, unit: "", trendPct: 5 },
  { label: "Avg Tasks Completed per Week", value: 2.8, max: 5, unit: "", trendPct: 12 },
  { label: "Engagement Streaks (Days)", value: 12, max: 30, unit: "avg streak", trendPct: -2 },
  { label: "Appointments Set", value: 12, max: 25, unit: "this week", trendPct: 8 },
];

const MOCK_KPI_TRENDS = [8, 14, 6, 11]; // Funnel, Goals, Touchpoints, New users this month

// Micro-lessons from core financial course – 6 buckets (percentages)
const MOCK_LESSONS_BY_BUCKET = [
  { name: "Earning Income", value: 18 },
  { name: "Saving", value: 22 },
  { name: "Spending", value: 17 },
  { name: "Investing", value: 15 },
  { name: "Building Credit", value: 14 },
  { name: "Managing Risk", value: 14 },
];
const PIE_COLORS = ["#456432", "#77A440", "#A4BE86", "#5a7a33", "#6B8E44", "#8FAF6A"];

// Top lessons per bucket + members who took each in last 90 days (scaled for 300 members)
const MOCK_TOP_LESSONS_BY_BUCKET: Record<string, { topic: string; users: number }[]> = {
  "Earning Income": [
    { topic: "Paychecks & deductions", users: 95 },
    { topic: "Side gigs & freelancing", users: 68 },
    { topic: "Career salary growth", users: 58 },
    { topic: "Benefits & retirement at work", users: 48 },
    { topic: "Tax basics for earners", users: 40 },
  ],
  "Saving": [
    { topic: "Emergency fund basics", users: 118 },
    { topic: "Auto-save habits", users: 84 },
    { topic: "Savings accounts & rates", users: 72 },
    { topic: "Short-term vs long-term goals", users: 61 },
    { topic: "Saving for big purchases", users: 52 },
  ],
  "Spending": [
    { topic: "Budgeting 101", users: 108 },
    { topic: "Needs vs wants", users: 76 },
    { topic: "Subscription audit", users: 56 },
    { topic: "Spending triggers", users: 47 },
    { topic: "Smart grocery & shopping", users: 37 },
  ],
  "Investing": [
    { topic: "What is investing?", users: 84 },
    { topic: "Retirement accounts (401k, IRA)", users: 67 },
    { topic: "Index funds & diversification", users: 50 },
    { topic: "Compound growth", users: 41 },
    { topic: "Risk and time horizon", users: 32 },
  ],
  "Building Credit": [
    { topic: "What is a credit score?", users: 74 },
    { topic: "Using a credit card wisely", users: 63 },
    { topic: "Credit reports & disputes", users: 46 },
    { topic: "Building credit from scratch", users: 34 },
    { topic: "When to use credit", users: 29 },
  ],
  "Managing Risk": [
    { topic: "Insurance basics", users: 64 },
    { topic: "Emergency fund as protection", users: 55 },
    { topic: "Identity theft protection", users: 43 },
    { topic: "Estate basics", users: 31 },
    { topic: "When to get help", users: 25 },
  ],
};

const MOCK_UNBANKED_IN_REGION = 55; // unbanked in region (separate from 300 members)

const CARD_STYLE =
  "rounded-lg border border-brand-green bg-white shadow-[0px_8px_20px_rgba(69,100,50,0.08)]";
const HEADLINE_CLASS = "text-primary font-raleway-bold";
const BODY_CLASS = "text-body-color font-raleway-medium";

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`${CARD_STYLE} ${className ?? ""}`}>{children}</div>;
}

function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-4 ${className ?? ""}`}>{children}</div>;
}

function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col space-y-1.5 p-4 pb-0 ${className ?? ""}`}>{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-raleway-bold text-primary leading-none">{children}</h3>;
}

function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-brand-green text-primary hover:bg-brand-green/10 transition-colors px-3 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function HorizontalBarGauge({
  label,
  value,
  max,
  unit = "",
  trendPct,
}: {
  label: string;
  value: number;
  max: number;
  unit?: string;
  trendPct?: number;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const displayValue = Number.isInteger(value) ? value : value.toFixed(1);
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline gap-2 mb-1">
        <span className="text-xs font-raleway-medium text-body-color truncate">{label}</span>
        <span className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-sm font-raleway-bold text-primary tabular-nums">
            {displayValue}
            {unit ? ` ${unit}` : ""}
          </span>
          {trendPct !== undefined && (
            <span className={`text-xs font-raleway-medium tabular-nums ${trendPct >= 0 ? "text-green-700" : "text-amber-700"}`}>
              {trendPct >= 0 ? "↑" : "↓"}{Math.abs(trendPct)}%
            </span>
          )}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-green to-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [openGauge, setOpenGauge] = useState<string | null>(null);
  const [insightsExpanded, setInsightsExpanded] = useState(false);
  const [selectedPieBucket, setSelectedPieBucket] = useState<string | null>(null);

  const toggleGauge = (id: string) => {
    setOpenGauge((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-raleway">
      {/* Header – same look as Dreamlife-Sim */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between min-h-16">
          <img
            src={`${import.meta.env.BASE_URL}moneyling-logo-text.png`}
            alt="Moneyling"
            className="h-10 w-auto object-contain"
          />
          <div className="rounded border-2 border-dashed border-brand-green/50 bg-gray-50/80 px-4 py-2 flex items-center justify-center min-h-[40px] min-w-[120px]">
            <span className="text-xs font-raleway-medium text-gray-500">Your logo here</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 pb-10">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-raleway-bold text-primary">
            Community Engagement Command Center
          </h1>
          <p className="text-body-color font-raleway-medium text-sm sm:text-base mt-1">
            One Stop Hub for Community Outreach — Member Impact & KPI Tracking
          </p>
        </div>

        {/* Part 1: Key Performance Indicators for your members */}
        <section className="mb-8">
          <h2 className={`text-lg sm:text-xl ${HEADLINE_CLASS} mb-4`}>
            Key Performance Indicators (KPIs) for Your Members
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Core metrics for ROI and program momentum. Click a gauge for details.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 pb-3 flex flex-col items-center">
                <div onClick={() => toggleGauge("funnel")} className="cursor-pointer flex justify-center w-full">
                  <SpeedometerGauge
                    value={50}
                    max={120}
                    label="Redirects to Your Links"
                    unit="this month"
                    trendPct={MOCK_KPI_TRENDS[0]}
                  />
                </div>
                <Button
                  className="w-full mt-2 text-xs max-w-[200px]"
                  onClick={() => toggleGauge("funnel")}
                >
                  {openGauge === "funnel" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {openGauge === "funnel" ? "Hide" : "View by product"}
                </Button>
                {openGauge === "funnel" && (
                  <div className="mt-3 pt-3 border-t border-brand-green/50 text-left w-full">
                    <p className="text-xs font-raleway-bold text-primary mb-2">Clicks to your linked pages (this month)</p>
                    <ul className="text-xs space-y-1">
                      {MOCK_FUNNEL_BREAKDOWN.map((row) => (
                        <li key={row.product} className={BODY_CLASS}>
                          {row.product}: <strong>{row.clicks}</strong> redirects
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-3 flex flex-col items-center">
                <div onClick={() => toggleGauge("goals")} className="cursor-pointer flex justify-center w-full">
                  <SpeedometerGauge
                    value={171}
                    max={PARTNER_MEMBERS}
                    label="Predictive Milestones Captured"
                    unit="this month"
                    trendPct={MOCK_KPI_TRENDS[1]}
                  />
                </div>
                <Button className="w-full mt-2 text-xs max-w-[200px]" onClick={() => toggleGauge("goals")}>
                  {openGauge === "goals" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {openGauge === "goals" ? "Hide" : "View 1, 3, 12-Month Horizon"}
                </Button>
                {openGauge === "goals" && (
                  <div className="mt-3 pt-3 border-t border-brand-green/50 text-left w-full">
                    <p className="text-xs font-raleway-bold text-primary mb-2">By goal horizon</p>
                    <ul className="text-xs space-y-1">
                      {MOCK_GOALS_BREAKDOWN.map((row) => (
                        <li key={row.period} className={BODY_CLASS}>
                          {row.period}: <strong>{row.count}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-3 flex flex-col items-center">
                <div onClick={() => toggleGauge("lessons")} className="cursor-pointer flex justify-center w-full">
                  <SpeedometerGauge
                    value={400}
                    max={600}
                    label="Automated touchpoints"
                    unit="this month"
                    trendPct={MOCK_KPI_TRENDS[2]}
                  />
                </div>
                <Button className="w-full mt-2 text-xs max-w-[200px]" onClick={() => toggleGauge("lessons")}>
                  {openGauge === "lessons" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {openGauge === "lessons" ? "Hide" : "View"} impact
                </Button>
                {openGauge === "lessons" && (
                  <div className="mt-3 pt-3 border-t border-brand-green/50 text-left w-full">
                    <p className="text-xs font-raleway-bold text-primary mb-2">Capacity impact</p>
                    <p className="text-sm font-raleway-medium text-body-color">
                      Estimated <strong>{MOCK_STAFF_HOURS_SAVED} staff hours saved</strong> (15 min per touchpoint).
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 pb-3">
                <div onClick={() => toggleGauge("origin")} className="cursor-pointer">
                  <SpeedometerGauge
                    value={27}
                    max={50}
                    label="New Engaged Members"
                    unit="this month"
                    trendPct={MOCK_KPI_TRENDS[3]}
                  />
                </div>
                <Button className="w-full mt-2 text-xs max-w-[200px]" onClick={() => toggleGauge("origin")}>
                  {openGauge === "origin" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {openGauge === "origin" ? "Hide" : "View"} by origin
                </Button>
                {openGauge === "origin" && (
                  <div className="mt-3 pt-3 border-t border-brand-green/50 text-left w-full">
                    <p className="text-xs font-raleway-bold text-primary mb-2">By acquisition source (origin)</p>
                    <ul className="text-xs space-y-1">
                      {MOCK_ORIGIN_BREAKDOWN.map((row) => (
                        <li key={row.origin} className={BODY_CLASS}>
                          {row.origin}: <strong>{row.count}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Weekly Trend – horizontal bar gauges */}
        <section className="mb-8">
          <h2 className={`text-lg sm:text-xl ${HEADLINE_CLASS} mb-2`}>
            Weekly Trend
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Key engagement metrics week over week.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_WEEKLY_METRICS.map((m) => (
              <Card key={m.label}>
                <CardContent className="pt-4 pb-4 flex flex-col items-center">
                  <div className="w-full max-w-[240px]">
                    <HorizontalBarGauge
                    label={m.label}
                    value={m.value}
                    max={m.max}
                    unit={m.unit}
                    trendPct={m.trendPct}
                  />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Member interest by topic – last 90 days */}
        <section className="mb-8">
          <h2 className={`text-lg sm:text-xl ${HEADLINE_CLASS} mb-2`}>
            Here’s Trending Member Intent (Last 90 Days)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Share of engagement across the six core financial topics.
          </p>
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 sm:gap-6 items-start">
                <div className="h-[280px] sm:h-[320px] w-full flex justify-center items-center min-w-0 py-4 px-2 sm:px-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <Pie
                        data={MOCK_LESSONS_BY_BUCKET}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="58%"
                        label={({ name, percent, cx, cy, midAngle, outerRadius }) => {
                          const RADIAN = Math.PI / 180;
                          const r = Number(outerRadius) + 24;
                          const x = Number(cx) + r * Math.cos(-midAngle * RADIAN);
                          const y = Number(cy) + r * Math.sin(-midAngle * RADIAN);
                          const textAnchor = x >= Number(cx) ? "start" : "end";
                          return (
                            <g
                              onClick={() => setSelectedPieBucket(name)}
                              style={{ cursor: "pointer" }}
                            >
                              <text
                                x={x}
                                y={y}
                                textAnchor={textAnchor}
                                dominantBaseline="central"
                                fill="#374151"
                                className="text-xs font-raleway-medium"
                              >
                                {name} {(percent * 100).toFixed(0)}%
                              </text>
                            </g>
                          );
                        }}
                        labelLine={false}
                        onClick={(data) => setSelectedPieBucket(data.name)}
                        style={{ cursor: "pointer" }}
                      >
                        {MOCK_LESSONS_BY_BUCKET.map((entry, i) => (
                          <Cell
                            key={entry.name}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                            stroke={selectedPieBucket === entry.name ? "#456432" : undefined}
                            strokeWidth={selectedPieBucket === entry.name ? 3 : 0}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, "Share"]}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #A4BE86",
                          borderRadius: 8,
                          fontFamily: "Raleway, sans-serif",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full min-h-[200px] sm:min-h-[280px] border border-brand-green/30 rounded-lg bg-gray-50/50 p-4 sm:p-5 flex flex-col">
                  {selectedPieBucket ? (
                    <>
                      <h3 className="text-sm font-raleway-bold text-primary mb-1">{selectedPieBucket}</h3>
                      <p className="text-xs text-gray-500 mb-3">Top Financial Pathways · Active Members</p>
                      <ul className="text-xs text-body-color font-raleway-medium space-y-2 list-disc list-inside flex-1 overflow-y-auto pr-1">
                        {(MOCK_TOP_LESSONS_BY_BUCKET[selectedPieBucket] ?? []).map((item) => (
                          <li key={item.topic} className="leading-snug">
                            {item.topic} — <span className="font-raleway-bold text-primary tabular-nums">{item.users.toLocaleString()}</span> members
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 font-raleway-medium flex-1 flex items-center justify-center text-center py-4">
                      Click a slice to see top financial pathways
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200 text-center">
                Earning Income, Saving, Spending, Investing, Building Credit, Managing Risk. Click a slice to view top pathways.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Part 2: Task Agent prompts – what the agent will have users do (product/action) */}
        <section className="mb-8">
          <h2 className={`text-lg sm:text-xl ${HEADLINE_CLASS} mb-2`}>
            Your Community's Insights
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Key for targeted marketing campaigns. These are the products and links your members will need next based on their active goals—use them to build campaigns and ensure your rates and links are updated.
          </p>

          {/* Where to focus – actionable summary for marketing */}
          <Card className="mb-4 border-primary/30 bg-primary/5">
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary shrink-0" />
                <h3 className="text-sm font-raleway-bold text-primary">
                  Recommended focus this period
                </h3>
              </div>
              <p className="text-sm text-body-color font-raleway-medium mb-3">
                Use these for targeted campaigns. Highest volume + growth; ensure these actions are linked and your marketing matches what the Task Agent is surfacing from your community.
              </p>
              <div className="flex flex-wrap gap-3">
                {FOCUS_PROMPTS.map((d) => (
                  <div
                    key={d.action}
                    className="inline-flex flex-col gap-0.5 rounded-lg bg-white border border-brand-green/50 px-3 py-2 shadow-sm"
                  >
                    <span className="font-raleway-bold text-primary">{d.action}</span>
                    <span className="text-xs text-gray-500">{d.goalContext}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-body-color font-raleway-medium tabular-nums text-sm">{d.users} members</span>
                      {d.trendPct >= 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-xs font-raleway-medium text-green-700">
                          <TrendingUp className="h-3.5 w-3.5" /> +{d.trendPct}%
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-xs font-raleway-medium text-amber-700">
                          <TrendingDown className="h-3.5 w-3.5" /> {d.trendPct}%
                        </span>
                      )}
                      <span className="text-xs text-gray-500">({d.horizon})</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* List: top tasks for SMART goals; rest behind Export Marketing Forecast */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-sm font-raleway-medium text-body-color mb-4">
                These are the top tasks your members will need to complete to accomplish their SMART goals. Be ready to help them achieve their milestones.
              </p>
              <div className="space-y-4">
                {(insightsExpanded ? MOCK_TASK_AGENT_PROMPTS : MOCK_TASK_AGENT_PROMPTS.slice(0, 3)).map((d) => {
                  const barPct = PROMPTS_MAX > 0 ? (d.users / PROMPTS_MAX) * 100 : 0;
                  const isRising = d.trendPct >= 0;
                  return (
                    <div key={d.action} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {d.focus && (
                            <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-xs font-raleway-bold text-primary">
                              Focus
                            </span>
                          )}
                          <div className="min-w-0">
                            <span className="font-raleway-medium text-body-color block">{d.action}</span>
                            <span className="text-xs text-gray-500">Goal: {d.goalContext}</span>
                          </div>
                          <span className="text-xs text-gray-500 shrink-0">({d.horizon})</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-raleway-bold text-primary tabular-nums">{d.users}</span>
                          <span className="text-xs text-gray-500">members</span>
                          {isRising ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-raleway-medium text-green-800">
                              <TrendingUp className="h-3 w-3" /> +{d.trendPct}%
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-raleway-medium text-amber-800">
                              <TrendingDown className="h-3 w-3" /> {d.trendPct}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-green to-primary transition-all duration-300"
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => setInsightsExpanded((prev) => !prev)}
              >
                {insightsExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> Collapse forecast
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> Export Marketing Forecast
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200">
                Action = product or next step. Goal = member outcome. Trend = % change vs prior period. Match product links and campaigns to these actions.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Part 3: Campaign & Content Management */}
        <section>
          <h2 className={`text-lg sm:text-xl ${HEADLINE_CLASS} mb-2`}>
            Digital Extension Controls
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Manage your digital extension. Set it once; the platform does the rest.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-green/20">
                    <Link2 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Product & Milestone Matching</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-body-color font-raleway-medium mb-4">
                  Add links to your auto loans, CDs, checking accounts. Content is served when members reach the matching milestone.
                </p>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage product links (demo)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-green/20">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Event & Workshop Calendar</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-body-color font-raleway-medium mb-4">
                  Publish workshops and in-branch events for any of the core financial education topics. Events are surfaced to members whose goals align.
                </p>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Add event (demo)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-green/20">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Proprietary Curriculum Vault (LMS)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-body-color font-raleway-medium mb-4">
                  Add your classes—readily available for your members and turned into bite-sized weekly micro-lessons.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Micro-Lesson
                  </Button>
                  <Button>
                    <List className="h-4 w-4 mr-2" />
                    Manage your courses
                  </Button>
                  <a
                    href="https://lms.moneyling.org/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-brand-green text-primary hover:bg-brand-green/10 transition-colors px-3 py-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Institutional Curriculum
                  </a>
                  <a
                    href="https://lms.moneyling.org/courses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-brand-green text-primary hover:bg-brand-green/10 transition-colors px-3 py-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Favorite Courses
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sponsor of the Week Campaign + Managing your logo */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-green/20">
                    <ImagePlus className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Sponsor of the Week Campaign</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-body-color font-raleway-medium">
                  Book your region and week to feature as Sponsor of the Week in the member app. Upload your campaign insert; it appears in the Sponsor of the Week screen.
                </p>
                <Button className="w-full sm:w-auto">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book your region and week
                </Button>
                <div className="space-y-1">
                  <p className="text-xs font-raleway-medium text-primary">Campaign insert (drop here or click)</p>
                  <p className="text-xs text-gray-500">
                    Recommended: <strong>1200×600px</strong> (2:1) for in-app banner. PNG or JPG, max 2MB.
                  </p>
                  <div
                    className="min-h-[120px] rounded-lg border-2 border-dashed border-brand-green/50 bg-gray-50/80 flex flex-col items-center justify-center gap-2 p-4 cursor-pointer hover:bg-brand-green/5 hover:border-brand-green transition-colors"
                    onClick={() => {}}
                    onKeyDown={(e) => e.key === "Enter" && (() => {})()}
                    role="button"
                    tabIndex={0}
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600 font-raleway-medium">Add campaign insert</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-brand-green/20">
                    <ImagePlus className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Managing your logo</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-body-color font-raleway-medium">
                  Upload your institution logo. It appears in Sponsor of the Week when you are featured, and in the LMS—on your proprietary financial education courses and on institutional and member dashboards.
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-raleway-medium text-primary">Logo (drop here or click)</p>
                  <p className="text-xs text-gray-500">
                    Square recommended, min <strong>200×200px</strong>. PNG or JPG, max 1MB.
                  </p>
                  <div
                    className="min-h-[120px] rounded-lg border-2 border-dashed border-brand-green/50 bg-gray-50/80 flex flex-col items-center justify-center gap-2 p-4 cursor-pointer hover:bg-brand-green/5 hover:border-brand-green transition-colors"
                    onClick={() => {}}
                    onKeyDown={(e) => e.key === "Enter" && (() => {})()}
                    role="button"
                    tabIndex={0}
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600 font-raleway-medium">Add or replace logo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Member Support Hub – below Sponsor + Logo */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-brand-green/20">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Member Support Hub</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-sm text-body-color font-raleway-medium">
                Direct messages and questions from members through the app. Respond and track resolution in one place.
              </p>
              <Button className="w-full sm:w-auto">
                <MessageCircle className="h-4 w-4 mr-2" />
                View member messages (demo)
              </Button>
              <div className="rounded-lg border border-brand-green/30 bg-gray-50/50 p-4 space-y-3">
                {[
                  { preview: "How do I update my direct deposit account to my new…", time: "2h ago" },
                  { preview: "Is the first-time homebuyer workshop still on Tuesday at…", time: "5h ago" },
                  { preview: "I completed the savings goal—how do I get the next…", time: "1d ago" },
                ].map((msg, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-brand-green/20 last:border-b-0"
                  >
                    <p className="text-sm text-body-color font-raleway-medium truncate flex-1 min-w-0">
                      {msg.preview}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Reply className="h-3.5 w-3.5 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Unbanked users in region – campaign prompt */}
          <Card className="mt-6">
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-raleway-bold text-primary mb-1">
                    Local Member Acquisition Opportunities
                  </h3>
                  <p className="text-2xl font-raleway-bold text-primary tabular-nums">
                    {MOCK_UNBANKED_IN_REGION} members
                  </p>
                  <p className="text-sm text-body-color font-raleway-medium mt-1">
                    These members are active in the app but have not yet linked to your institution. Deploy an invite campaign to connect them.
                  </p>
                </div>
                <Button className="shrink-0 w-full sm:w-auto">
                  Deploy Acquisition Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="mt-8 p-4 rounded-lg bg-gray-100 border border-brand-green/50 text-center">
          <p className="text-sm font-raleway-medium text-gray-600">
            Standalone Partner Dashboard demo. Same style and logo as Dreamlife-Sim. No connection to the main app, Android, or iOS.
          </p>
        </div>
      </div>

      <footer className="border-t bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500">
          © {new Date().getFullYear()} Moneyling. Partner Dashboard (demo). Not connected to production data.
        </div>
      </footer>
    </div>
  );
}
