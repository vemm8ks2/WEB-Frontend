import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/admin/useOrderStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";
import orderStatistics from "@/utils/chart/order-statistics";

import type { Order } from "@/types/order";
import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartLabel() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllOrder } = useOrderStore();

  const chartWrapperText: ChartWrapperText = {
    head: "요일별 주문건수",
    headDesc: "과거부터 현재까지 전체 기간입니다.",
    footerDesc: "선 그래프 - Label",
    footerSubDesc:
      "월요일부터 일요일까지 요일별로 구분되어 있으며, 차트의 숫자는 해당 요일에 들어왔던 모든 주문 건수를 나타냅니다.",
  };

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
    line: { label },
  } = orderStatistics({ orders: allData });

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={label}
        margin={{ top: 20, left: 12, right: 12 }}
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
        <Line
          dataKey="count"
          name="주문 건수"
          type="natural"
          stroke="var(--color-orders)"
          strokeWidth={2}
          dot={{ fill: "var(--color-orders)" }}
          activeDot={{ r: 6 }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};
