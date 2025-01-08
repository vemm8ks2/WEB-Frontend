import { AreaChartComponent } from "@/components/dashboard/chart/area-chart";
import { AreaChartInteractive } from "@/components/dashboard/chart/area-chart-interactive";
import { AreaChartStacked } from "@/components/dashboard/chart/area-chart-stacked";
import { AreaChartStep } from "@/components/dashboard/chart/area-chart-step";
import { BarChartInteractive } from "@/components/dashboard/chart/bar-chart-interactive";
import { BarChartLabel } from "@/components/dashboard/chart/bar-chart-label";
import { BarChartMultiple } from "@/components/dashboard/chart/bar-chart-multiple";
import { BarChartNegative } from "@/components/dashboard/chart/bar-chart-negative";
import { LineChartDots } from "@/components/dashboard/chart/line-chart-dots";
import { LineChartInteractive } from "@/components/dashboard/chart/line-chart-interactive";
import { LineChartLabel } from "@/components/dashboard/chart/line-chart-label";
import { LineChartMultiple } from "@/components/dashboard/chart/line-chart-multiple";
import { PieChartLabel } from "@/components/dashboard/chart/pie-chart-label";
import { PieChartDonutWithText } from "@/components/dashboard/chart/pie-chart-donut-with-text";
import { Separator } from "@/components/ui/separator";
import { PieChartInteractive } from "@/components/dashboard/chart/pie-chart-interactive";
import { RadialChartText } from "@/components/dashboard/chart/radial-chart-text";
import { RadialChartShape } from "@/components/dashboard/chart/radial-chart-shape";
import { RadialChartStacked } from "@/components/dashboard/chart/radial-chart-stacked";
import { CustomChart } from "@/components/dashboard/chart/custom-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChartComponent } from "@/components/dashboard/chart/radar-chart";
import { RadarChartLinesOnly } from "@/components/dashboard/chart/radar-chart-lines-only";
import { RadarChartLegend } from "@/components/dashboard/chart/radar-chart-legend";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Charts = () => {
  return (
    <Tabs defaultValue="custom">
      <TabsList className="mb-4">
        <TabsTrigger value="custom">커스텀</TabsTrigger>
        <TabsTrigger value="order">주문</TabsTrigger>
        <TabsTrigger value="customer">고객</TabsTrigger>
        <TabsTrigger value="other">미분류</TabsTrigger>
      </TabsList>

      <TabsContent value="custom" className="grid grid-cols-12 gap-4 mt-0">
        <Alert variant="destructive" className="col-span-12">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>주의</AlertTitle>
          <AlertDescription>
            커스텀 탭은 시각화를 불러온 후 다른 탭으로 이동하면 다시 불러와야
            합니다. 시각화가 오래 걸리는 차트를 불러올 때는 이를 유의해주세요.
          </AlertDescription>
        </Alert>

        <div className="col-span-4">
          <CustomChart
            arg="결제수단"
            btnSize="large"
            chartWrapperText={{
              head: "바 차트",
              headDesc: "과거부터 현재까지 전체 기간입니다.",
              footerDesc: "결제수단별 주문 건수",
              footerSubDesc:
                "주문을 결제수단으로 분류하고 주문건수를 세어 막대 그래프로 나타냅니다.",
            }}
          />
        </div>
        <div className="col-span-4">
          <CustomChart
            arg="월별주문"
            btnSize="large"
            chartWrapperText={{
              head: "바 차트",
              headDesc: "과거부터 현재까지 전체 기간입니다.",
              footerDesc: "월별 주문 건수",
              footerSubDesc: "주문을 월별로 분류하여 막대 그래프로 나타냅니다.",
            }}
          />
        </div>
        <div className="col-span-4">
          <CustomChart
            arg="시간대별"
            btnSize="large"
            chartWrapperText={{
              head: "바 차트",
              headDesc: "과거부터 현재까지 전체 기간입니다.",
              footerDesc: "시간대별 주문 건수",
              footerSubDesc:
                "주문을 시간대별로 분류하여 막대 그래프로 나타냅니다.",
            }}
          />
        </div>
        <div className="col-span-4">
          <CustomChart
            arg="유저별주문"
            btnSize="large"
            chartWrapperText={{
              head: "파이 차트",
              headDesc: "과거부터 현재까지 전체 기간입니다.",
              footerDesc: "주문 건수 상위 유저 10명",
              footerSubDesc: "주문 건수가 제일 많은 유저 10명을 나타냅니다.",
            }}
          />
        </div>
        <div className="col-span-12">
          <CustomChart
            arg="지역별주문수"
            btnSize="large"
            chartWrapperText={{
              head: "지도 - 지역별 구매자 수",
              headDesc: "과거부터 현재까지 전체 기간입니다.",
              footerDesc: "지역별 구매자 수",
              footerSubDesc: "대한민국 지역별 구매자 수를 지도에 나타냅니다.",
            }}
          />
        </div>
      </TabsContent>

      <TabsContent value="order" className="grid grid-cols-12 gap-4 mt-0">
        <div className="col-span-4">
          <LineChartLabel />
        </div>
        <div className="col-span-4">
          <LineChartDots />
        </div>
        <div className="col-span-4">
          <LineChartMultiple />
        </div>
        <div className="col-span-12">
          <LineChartInteractive />
        </div>
        <Separator className="col-span-12 my-8" />
        <div className="col-span-4">
          <PieChartLabel />
        </div>
        <div className="col-span-4">
          <PieChartDonutWithText />
        </div>
        <div className="col-span-4">
          <PieChartInteractive />
        </div>
      </TabsContent>

      <TabsContent value="customer" className="grid grid-cols-12 gap-4 mt-0">
        <div className="col-span-4">
          <AreaChartComponent />
        </div>
        <div className="col-span-4">
          <AreaChartStep />
        </div>
        <div className="col-span-4">
          <AreaChartStacked />
        </div>
        <div className="col-span-12">
          <AreaChartInteractive />
        </div>
        <Separator className="col-span-12 my-8" />
        <div className="col-span-4">
          <BarChartLabel />
        </div>
        <div className="col-span-4">
          <BarChartMultiple />
        </div>
        <div className="col-span-12">
          <BarChartInteractive />
        </div>
        <Separator className="col-span-12 my-8" />
        <div className="col-span-4">
          <RadialChartText />
        </div>
        <div className="col-span-4">
          <RadialChartShape />
        </div>
        <div className="col-span-4">
          <RadialChartStacked />
        </div>
      </TabsContent>

      <TabsContent value="other" className="grid grid-cols-12 gap-4 mt-0">
        <div className="col-span-4">
          <BarChartNegative />
        </div>
        <div className="col-span-4">
          <RadarChartComponent />
        </div>
        <div className="col-span-4">
          <RadarChartLinesOnly />
        </div>
        <div className="col-span-4">
          <RadarChartLegend />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Charts;
