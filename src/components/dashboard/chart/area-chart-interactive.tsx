import { useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Gender, useCustomerStore } from "@/store/admin/useCustomerStore";
import Loader from "@/components/ui/Loader";
import htmlToPng from "@/utils/html-to-png";
import registerStatistics from "@/utils/chart/register-statistics";

import type { User } from "@/types/user";

const chartConfig = {
  register: {
    label: "Register",
  },
  [Gender.FEMALE]: {
    label: "여",
    color: "hsl(var(--chart-1))",
  },
  [Gender.MALE]: {
    label: "남",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartInteractive() {
  const divRef = useRef<HTMLDivElement>(null);

  const { data: auth } = useAuthStore();
  const { allData, isLoading, getAllCustomer } = useCustomerStore();

  const [timeRange, setTimeRange] = useState("90d");

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

  return (
    <>
      <Card>
        <div ref={divRef}>
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>차트의 종류를 기입해주세요.</CardTitle>
              <CardDescription>
                차트의 기간 범위를 기입해주세요.
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  지난 3개월
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  지난 30일
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  지난 7일
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            {!allData && (
              <div className="flex">
                <Button
                  onClick={callback}
                  disabled={isLoading}
                  className="w-52 mx-auto my-20"
                >
                  {isLoading ? (
                    <Loader className="text-zinc-400" />
                  ) : (
                    <>시각화 불러오기</>
                  )}
                </Button>
              </div>
            )}
            {allData && <Chart allData={allData} timeRange={timeRange} />}
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

const Chart = (props: { allData: User[]; timeRange: string }) => {
  const { allData, timeRange } = props;

  const { interactive } = registerStatistics({ users: allData });

  const filteredData = interactive.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();

    let daysToSubtract = 90;

    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient
            id={`fill${Gender.FEMALE}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor={`var(--color-${Gender.FEMALE})`}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={`var(--color-${Gender.FEMALE})`}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id={`fill${Gender.MALE}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={`var(--color-${Gender.MALE})`}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={`var(--color-${Gender.MALE})`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey={Gender.FEMALE}
          type="natural"
          fill={`url(#fill${Gender.FEMALE})`}
          stroke={`var(--color-${Gender.FEMALE})`}
          stackId="a"
        />
        <Area
          dataKey={Gender.MALE}
          type="natural"
          fill="url(#fillMALE)"
          stroke={`var(--color-${Gender.MALE})`}
          stackId="b"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
