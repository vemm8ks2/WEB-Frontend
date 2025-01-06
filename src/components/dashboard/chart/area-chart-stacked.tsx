import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
import { useAuthStore } from "@/store/useAuthStore";
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
import registerStatistics from "@/utils/chart/register-statistics";

import type { User } from "@/types/user";

const chartConfig = {
  female: {
    label: "Female",
    color: "hsl(var(--chart-1))",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AreaChartStacked() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = { head: "영역 차트 - Stacked" };

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
  const { stacked } = registerStatistics({ users: allData });

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={stacked}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dayOfWeek"
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
          dataKey={Gender.OTHER}
          name="기타"
          type="natural"
          fill="var(--color-other)"
          fillOpacity={0.4}
          stroke="var(--color-other)"
          stackId="a"
        />
        <Area
          dataKey={Gender.MALE}
          name="남성"
          type="natural"
          fill="var(--color-male)"
          fillOpacity={0.4}
          stroke="var(--color-male)"
          stackId="a"
        />
        <Area
          dataKey={Gender.FEMALE}
          name="여성"
          type="natural"
          fill="var(--color-female)"
          fillOpacity={0.4}
          stroke="var(--color-female)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
