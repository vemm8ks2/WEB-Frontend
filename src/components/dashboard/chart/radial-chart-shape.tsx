import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import registerStatistics from "@/utils/chart/register-statistics";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

import type { User } from "@/types/user";
import type { ChartWrapperText } from "./chart-wrapper";

const chartConfig = {
  [Gender.MALE]: {
    label: "남성",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RadialChartShape() {
  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const chartWrapperText: ChartWrapperText = { head: "방사형 차트 - Shape" };

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
    radial: { text },
  } = registerStatistics({ users: allData });

  const sum = text[0].count + text[1].count + text[2].count;
  const maleRatio = text[1].count / sum;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={text
          .filter((item) => item.gender === Gender.MALE)
          .map((item) => ({ ...item, fill: `var(--color-${item.gender})` }))}
        endAngle={maleRatio * 360}
        innerRadius={80}
        outerRadius={140}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-zinc-100 last:fill-white"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="count" background />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-4xl font-bold"
                    >
                      {text[1].count.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      남성 회원 수
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
