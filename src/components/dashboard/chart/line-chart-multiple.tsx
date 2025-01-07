import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { useOrderStore } from "@/store/admin/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import orderStatistics from "@/utils/chart/order-statistics";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";
import { Gender } from "@/store/admin/useCustomerStore";

import type { Order } from "@/types/order";
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
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function LineChartMultiple() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllOrder } = useOrderStore();

  const chartWrapperText: ChartWrapperText = { head: "라인 차트 - Multiple" };

  const callback = () => {
    if (!auth) return;
    getAllOrder({ token: auth.token });
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

const Chart = ({ allData }: { allData: Order[] }) => {
  const {
    line: { multiple },
  } = orderStatistics({ orders: allData });

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={multiple}
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
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey={Gender.FEMALE}
          type="monotone"
          stroke="var(--color-female)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey={Gender.MALE}
          type="monotone"
          stroke="var(--color-male)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey={Gender.OTHER}
          type="monotone"
          stroke="var(--color-other)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};
