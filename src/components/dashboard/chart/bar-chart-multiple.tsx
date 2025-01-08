import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useAuthStore } from "@/store/useAuthStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import registerStatistics from "@/utils/chart/register-statistics";
import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

import type { User } from "@/types/user";
import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";

const chartConfig = {
  female: {
    label: "Female",
    color: "hsl(var(--chart-1))",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartMultiple() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = {
    head: "바 차트 - Multiple",
    headDesc: "과거부터 현재까지 전체 기간입니다.",
    footerDesc: "연령대별, 성별 고객의 수 입니다.",
    footerSubDesc:
      "연령대별로 구분되어 있으며 세부적으로는 남성과 여성으로 다시 한 번 구분되으며 청록색은 여성, 붉은색은 남성입니다.",
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
  const {
    bar: { multiple },
  } = registerStatistics({ users: allData });

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={multiple}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="group"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar
          dataKey={Gender.FEMALE}
          name="여"
          fill="var(--color-female)"
          radius={4}
        />
        <Bar
          dataKey={Gender.MALE}
          name="남"
          fill="var(--color-male)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};
