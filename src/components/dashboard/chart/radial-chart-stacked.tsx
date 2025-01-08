import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { useAuthStore } from "@/store/useAuthStore";
import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import registerStatistics from "@/utils/chart/register-statistics";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

import type { User } from "@/types/user";
import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";

const chartConfig = {
  [Gender.FEMALE]: {
    label: "여성",
    color: "hsl(var(--chart-1))",
  },
  [Gender.MALE]: {
    label: "남성",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RadialChartStacked() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = {
    head: "방사형 차트 - Stacked",
    headDesc: "과거부터 현재까지 전체 기간입니다.",
    footerDesc: "남성, 여성 회원수",
    footerSubDesc:
      "남성과 여성의 전체 회원수를 보여줍니다. 청록색은 여성의 비율이고, 붉은색은 남성의 비율입니다.",
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
    radial: { stacked },
  } = registerStatistics({ users: allData });

  const total = stacked[0].FEMALE + stacked[0].MALE;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={stacked}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      남, 여 회원수
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey={Gender.FEMALE}
          stackId="a"
          cornerRadius={5}
          fill={`var(--color-${Gender.FEMALE})`}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey={Gender.MALE}
          fill={`var(--color-${Gender.MALE})`}
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
};
