import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { useCustomerStore } from "@/store/admin/useCustomerStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import registerStatistics from "@/utils/chart/register-statistics";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";
import type { User } from "@/types/user";

const chartConfig = {
  ageGroup: {
    label: "Age Group",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartLabel() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = { head: "바 차트" };

  const callback = () => {
    if (!auth) return;
    getAllCustomer({ token: auth.token });
  };

  return (
    <ChartWrapper
      {...chartWrapperText}
      disableDonwload={!Array.isArray(allData)}
      hasData={Array.isArray(allData)}
      isLoading={isLoading}
      callback={callback}
    >
      {allData && <Chart allData={allData} />}
    </ChartWrapper>
  );
}

const Chart = ({ allData }: { allData: User[] }) => {
  const {
    bar: { label },
  } = registerStatistics({ users: allData });

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={label} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="group"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="count"
          name="유저의 수"
          fill="var(--color-ageGroup)"
          radius={8}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
