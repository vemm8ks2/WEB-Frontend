import { Pie, PieChart } from "recharts";

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

export function PieChartLabel() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllOrder } = useOrderStore();

  const chartWrapperText: ChartWrapperText = {
    head: "파이 차트 - Label",
    headDesc: "과거부터 현재까지 전체 기간입니다.",
    footerDesc: "결제수단별 주문건수",
    footerSubDesc:
      "모든 주문건수를 결제수단별로 구분지어 나타냅니다. 청록색은 간편 결제, 붉은색은 신용/체크카드 결제, 검은색은 무통장입금입니다.",
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

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent hideLabel className="w-min" />}
        />
        <Pie
          data={label.map((item) => ({
            ...item,
            fill: `var(--color-${item.method})`,
          }))}
          dataKey="count"
          label
          nameKey="method"
        />
      </PieChart>
    </ChartContainer>
  );
};
