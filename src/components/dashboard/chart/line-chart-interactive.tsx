import { useEffect, useRef, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Gender } from "@/store/admin/useCustomerStore";
import { useOrderStore } from "@/store/admin/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import htmlToPng from "@/utils/html-to-png";
import orderStatistics from "@/utils/chart/order-statistics";
import genderToKorean from "@/utils/gender-to-korean";

const chartConfig = {
  users: {
    label: "월별, 성별 주문 수",
  },
  [Gender.FEMALE]: {
    label: "여성",
    color: "hsl(var(--chart-1))",
  },
  [Gender.MALE]: {
    label: "남성",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartInteractive() {
  const divRef = useRef<HTMLDivElement>(null);

  const [activeChart, setActiveChart] = useState<Gender>(Gender.FEMALE);
  const [interactive, setInteractive] = useState<
    {
      date: string;
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
    }[]
  >([]);

  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllOrder } = useOrderStore();

  const callback = () => {
    if (!auth) return;
    getAllOrder({ token: auth.token });
  };

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      await htmlToPng({ element: div });
    } catch (error) {
      console.error("다운로드 중 오류가 발생했습니다: ", error);
    }
  };

  useEffect(() => {
    if (allData) {
      const {
        line: { interactive: data },
      } = orderStatistics({ orders: allData });

      setInteractive(
        data.map((item) => ({ ...item, date: item.date.slice(0, 7) }))
      );
    }
  }, [allData]);

  const total = {
    [Gender.FEMALE]: interactive.reduce((acc, curr) => acc + curr.FEMALE, 0),
    [Gender.MALE]: interactive.reduce((acc, curr) => acc + curr.MALE, 0),
  };

  return (
    <>
      <Card>
        <div ref={divRef}>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>월별 주문건수</CardTitle>
              <CardDescription>
                과거부터 현재까지 전체 기간입니다.
              </CardDescription>
            </div>
            <div className="flex">
              {[Gender.FEMALE, Gender.MALE].map((key) => {
                const chart = key as keyof typeof chartConfig;
                const num =
                  total[
                    (key as Gender.FEMALE) || (key as Gender.MALE)
                  ].toLocaleString();

                return (
                  <button
                    key={chart}
                    data-active={Gender}
                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(key)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold mx-auto leading-none sm:text-3xl">
                      {num === "0" ? "-" : num}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            {!allData && (
              <div className="flex">
                <Button
                  onClick={callback}
                  disabled={isLoading}
                  className="w-96 mx-auto my-24"
                >
                  {isLoading ? (
                    <Loader className="text-zinc-400" />
                  ) : (
                    <>시각화 불러오기</>
                  )}
                </Button>
              </div>
            )}
            {allData && (
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={interactive}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="w-[150px]" />}
                  />
                  <Line
                    dataKey={activeChart}
                    type="monotone"
                    stroke={`var(--color-${activeChart})`}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            )}
            <p className="text-sm text-center mt-4">
              &#91;선 그래프 - Interactive&#93; 과거부터 현재까지 모든 기간 중{" "}
              {genderToKorean(activeChart)}의 주문건수를 월별로 나타냅니다.
            </p>
          </CardContent>
        </div>
      </Card>
      <Button
        variant="outline"
        onClick={handleDownload}
        disabled={!allData}
        className="mt-3 w-full"
      >
        다운로드
      </Button>
    </>
  );
}
