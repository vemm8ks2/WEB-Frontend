import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
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
import { PaymentMethod } from "@/store/useOrderStore";
import { useOrderStore } from "@/store/admin/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import orderStatistics from "@/utils/chart/order-statistics";
import htmlToPng from "@/utils/html-to-png";
import { useRef, useState } from "react";
import paymentMethodKorean from "@/utils/payment-method-korean";

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

export function PieChartInteractive() {
  const divRef = useRef<HTMLDivElement>(null);
  const [activeMethod, setActiveMethod] = useState(PaymentMethod.digitalWallet);

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

  const id = "pie-interactive";

  return (
    <div className="flex flex-col h-full">
      <Card data-chart={id} className="flex-1">
        <div ref={divRef} className="flex flex-col h-full">
          <ChartStyle id={id} config={chartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>파이 차트 - Interactive</CardTitle>
              <CardDescription>
                과거부터 현재까지 전체 기간입니다.
              </CardDescription>
            </div>
            <Select
              value={activeMethod}
              onValueChange={(value) => setActiveMethod(value as PaymentMethod)}
            >
              <SelectTrigger
                className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {[
                  PaymentMethod.digitalWallet,
                  PaymentMethod.creditOrDebitCart,
                  PaymentMethod.depositWithoutPassbook,
                ].map((key) => {
                  const config = chartConfig[key as keyof typeof chartConfig];

                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{ backgroundColor: `var(--color-${key})` }}
                        />
                        {config.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center pb-0">
            {!allData && (
              <div className="flex">
                <Button
                  onClick={callback}
                  disabled={isLoading}
                  className="w-52 mx-auto my-8"
                >
                  {isLoading ? (
                    <Loader className="text-zinc-400" />
                  ) : (
                    <>시각화 불러오기</>
                  )}
                </Button>
              </div>
            )}
            {allData &&
              (() => {
                const {
                  pie: { label },
                } = orderStatistics({ orders: allData });

                const activeIndex = label.findIndex(
                  (item) => item.method === activeMethod
                );

                return (
                  <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                  >
                    <PieChart>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
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
                        activeIndex={activeIndex}
                        activeShape={({
                          outerRadius = 0,
                          ...props
                        }: PieSectorDataItem) => (
                          <g>
                            <Sector {...props} outerRadius={outerRadius + 10} />
                            <Sector
                              {...props}
                              outerRadius={outerRadius + 25}
                              innerRadius={outerRadius + 12}
                            />
                          </g>
                        )}
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
                                    {label[activeIndex].count}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    결제 수
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
              })()}
            <p className="text-sm text-center mt-4">
              결제수단이 [{paymentMethodKorean(activeMethod)}]인 모든
              주문건수입니다.
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
    </div>
  );
}
