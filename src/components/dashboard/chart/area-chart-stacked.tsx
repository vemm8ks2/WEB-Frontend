import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ChartWrapper,
  ChartWrapperText,
} from "@/components/dashboard/chart/chart-wrapper";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartStacked() {
  const chartWrapperText: ChartWrapperText = { head: "영역 차트 - Stacked" };

  return (
    <ChartWrapper {...chartWrapperText}>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill="hsl(12 76% 61%)"
            fillOpacity={0.4}
            stroke="hsl(12 76% 61%)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="hsl(173 58% 39%)"
            fillOpacity={0.4}
            stroke="hsl(173 58% 39%)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
