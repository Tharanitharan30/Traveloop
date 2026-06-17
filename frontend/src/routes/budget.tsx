import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { Card } from "@/components/ui/card";
import { trips } from "@/lib/mock-data";
import { Wallet, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget — Traveloop" }] }),
  component: BudgetPage,
});

const breakdown = [
  { name: "Transport", value: 1850 },
  { name: "Accommodation", value: 2400 },
  { name: "Food", value: 980 },
  { name: "Activities", value: 1170 },
];
const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];
const daily = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  spent: 80 + Math.round(Math.abs(Math.sin(i) * 200) + (i % 5) * 30),
}));
const trend = daily.reduce<
  { day: string; cumulative: number; budget: number }[]
>((acc, d, i) => {
  const prev = acc[i - 1]?.cumulative ?? 0;
  acc.push({ day: d.day, cumulative: prev + d.spent, budget: (i + 1) * 350 });
  return acc;
}, []);

function BudgetPage() {
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const totalSpent = trips.reduce((s, t) => s + t.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <AppLayout>
      <PageHeader
        title="Budget"
        description="Track spending across all your trips."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
          icon={Wallet}
          tone="primary"
        />
        <MetricCard
          label="Remaining"
          value={`$${remaining.toLocaleString()}`}
          hint={`${Math.round((remaining / totalBudget) * 100)}% left`}
          icon={TrendingUp}
          tone="accent"
        />
        <MetricCard
          label="Daily Average"
          value={`$${Math.round(totalSpent / 30)}`}
          icon={Calendar}
          tone="secondary"
        />
        <MetricCard
          label="Activity Spend"
          value={`$${breakdown[3].value}`}
          icon={TrendingDown}
          tone="warning"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Card className="p-6">
          <h3 className="font-semibold mb-1">Cost Breakdown</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Where your money goes
          </p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {breakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => `$${v}`}
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">Daily Spending</h3>
          <p className="text-sm text-muted-foreground mb-4">Last 14 days</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                  }}
                />
                <Bar
                  dataKey="spent"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-1">Budget Trend</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Cumulative spend vs. planned budget
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulative"
                name="Spent"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="budget"
                name="Budget"
                stroke="var(--chart-3)"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AppLayout>
  );
}
