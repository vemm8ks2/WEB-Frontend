import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useCustomerStore } from "@/store/admin/useCustomerStore";
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
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = {
    head: "영역 차트",
    headDesc: "과거부터 현재까지 전체 기간입니다.",
    footerDesc: "요일별 회원가입 수",
    footerSubDesc:
      "월요일부터 일요일 별로 회원가입 수를 연속된 그래프로 나타냅니다.",
  };

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
  const { area } = registerStatistics({ users: allData });

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={area}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dayOfWeek"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="count"
          name="회원가입 수"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
