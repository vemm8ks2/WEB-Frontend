import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import { useOrderStore } from "@/store/admin/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";
import orderStatistics from "@/utils/chart/order-statistics";
import { PaymentMethod } from "@/store/useOrderStore";

import type { Order } from "@/types/order";
import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";

const chartConfig = {
  "payment method": {
    label: "Payment method",
  },
  [PaymentMethod.digitalWallet]: {
    label: "간편 결제",
    color: "hsl(var(--chart-1))",
  },
  [PaymentMethod.creditOrDebitCart]: {
    label: "신용/체크카드 결제",
    color: "hsl(var(--chart-2))",
  },
  [PaymentMethod.depositWithoutPassbook]: {
    label: "무통장입금",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieChartDonutWithText() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllOrder } = useOrderStore();

  const chartWrapperText: ChartWrapperText = {
    head: "파이 차트 - Donut with text",
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
    pie: { label },
  } = orderStatistics({ orders: allData });

  const totalVisitors = useMemo(() => {
    return label.reduce((acc, curr) => acc + curr.count, 0);
  }, [label]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="w-min" />}
        />
        <Pie
          data={label.map((item) => ({
            ...item,
            fill: `var(--color-${item.method})`,
          }))}
          dataKey="count"
          nameKey="method"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      총 결제 수
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
