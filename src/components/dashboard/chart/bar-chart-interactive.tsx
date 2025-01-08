import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
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
import registerStatistics from "@/utils/chart/register-statistics";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import htmlToPng from "@/utils/html-to-png";
import genderToKorean from "@/utils/gender-to-korean";

const chartConfig = {
  users: {
    label: "나이별 유저 수",
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

export function BarChartInteractive() {
  const divRef = useRef<HTMLDivElement>(null);

  const [activeChart, setActiveChart] = useState<Gender>(Gender.FEMALE);
  const [interactive, setInteractive] = useState<
    {
      birth: string;
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
    }[]
  >([]);

  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const callback = () => {
    if (!auth) return;
    getAllCustomer({ token: auth.token });
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
        bar: { interactive: data },
      } = registerStatistics({ users: allData });

      setInteractive(data);
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
              <CardTitle>바 차트 - Interactive</CardTitle>
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
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
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
                <BarChart
                  accessibilityLayer
                  data={interactive}
                  margin={{ left: 12, right: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="birth"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent className="w-[150px]" />}
                  />
                  <Bar
                    dataKey={activeChart}
                    fill={`var(--color-${activeChart})`}
                  />
                </BarChart>
              </ChartContainer>
            )}
            <p className="text-sm text-center mt-2">
              회원가입한 모든 유저 중 {genderToKorean(activeChart)}의 태어난
              연도 분포입니다.
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
