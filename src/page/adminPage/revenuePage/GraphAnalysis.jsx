"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ---------- MOCK DATA ----------
const revenue = [
  { month: "2025-01", totalRevenue: 48500 },
  { month: "2025-02", totalRevenue: 43200 },
  { month: "2025-03", totalRevenue: 52800 },
  { month: "2025-04", totalRevenue: 47100 },
  { month: "2025-05", totalRevenue: 61200 },
  { month: "2025-06", totalRevenue: 65800 },
  { month: "2025-07", totalRevenue: 0 },
  { month: "2025-08", totalRevenue: 0 },
  { month: "2025-09", totalRevenue: 0 },
  { month: "2025-10", totalRevenue: 0 },
  { month: "2025-11", totalRevenue: 0 },
  { month: "2025-12", totalRevenue: 0 },
];

//TRANSFORM DATA (logic)
const chartData = revenue.map((item) => ({
  month: new Date(item.month + "-01").toLocaleString("en-US", {
    month: "short",
  }),
  revenue: item.totalRevenue,
}));

//CHART CONFIG
const chartConfig = {
  revenue: {
    label: "Revenue (THB)",
    color: "var(--color-brown)",
  },
};

//COMPONENT
export default function GraphAnalysis() {
  return (
    <Card className="mx-auto w-full lg:max-w-[960px] px-4 md:px-8 pt-20 pb-16 flex-1 mt-10">
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Jan - Dec 2025</CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <div className="h-[260px] sm:h-[300px] md:h-[360px] lg:h-[470px]">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            
            <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={false} />

            <YAxis tickFormatter={(value) => value.toLocaleString("en-US")} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
          </BarChart>
        </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>This month vs last</CardFooter>
    </Card>
  );
}
