import { AlertCircle } from "lucide-react";

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

        <Tabs defaultValue="analyze" className="col-span-12 w-full">
          <div className="w-full flex justify-center">
            <TabsList className="mb-4 w-96">
              <TabsTrigger value="analyze" className="w-full">
                분석
              </TabsTrigger>
              <TabsTrigger value="predict" className="w-full">
                예측
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analyze" className="grid grid-cols-12 gap-4 mt-0">
            <div className="col-span-6">
              <CustomChart
                arg="월별회원가입비교"
                chartWrapperText={{
                  head: "2023년 - 2024년 월별 회원가입자 수",
                  headDesc: "2023년 1월부터 2024년 12월까지 해당됩니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "2023년과 2024년의 월별 회원가입자 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="월별회원가입24"
                chartWrapperText={{
                  head: "2024년 월별 회원가입자 수",
                  headDesc: "2024년 1월부터 12월까지 한 해가 해당됩니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc: "2024년 월별 회원가입자 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="월별회원가입23"
                chartWrapperText={{
                  head: "2023년 월별 회원가입자 수",
                  headDesc: "2023년 1월부터 12월까지 한 해가 해당됩니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc: "2023년 월별 회원가입자 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-12">
              <CustomChart
                arg="지역내도시별분포"
                chartWrapperText={{
                  head: "지역별 주문 수 통합",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc: "지역별 주문 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-12">
              <CustomChart
                arg="시도별배송지분포"
                chartWrapperText={{
                  head: "시/도별 주문 수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc: "시/도별 주문 건수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-12">
              <CustomChart
                arg="유저생일분포"
                chartWrapperText={{
                  head: "유저 생년 분포",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "고객의 생년 별로 취합하였으며, 생년별 고객의 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="나이대별생년분포"
                chartWrapperText={{
                  head: "나이대별 유저 수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "나이대로 구분하여 생일을 취합하였으며, 나이대별 고객의 수를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="상품가격분포"
                chartWrapperText={{
                  head: "상품 가격 분포",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "상자 수염 그림",
                  footerSubDesc:
                    "상품 가격의 분포를 상자 수염 그림으로 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="판매금액"
                chartWrapperText={{
                  head: "주문 결제 금액 분포",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "상자 수염 그림",
                  footerSubDesc:
                    "주문 목록의 총 결제 금액의 분포를 상자 수염 그림으로 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="시간성별구매"
                chartWrapperText={{
                  head: "시간대별, 성별 구매량",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "시간대별로 분류한 후 성별에 따른 구매 수량을 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="여성구매"
                chartWrapperText={{
                  head: "여성 구매 상품 상위 10개",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "여성이 가장 많이 구매한 상품 상위 10개를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="남성구매"
                chartWrapperText={{
                  head: "남성 구매 상품 상위 10개",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "남성이 가장 많이 구매한 상품 상위 10개를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="기타성별구매"
                chartWrapperText={{
                  head: "기타 성별 구매 상품 상위 10개",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "기타 성별이 가장 많이 구매한 상품 상위 10개를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="성별별구매"
                chartWrapperText={{
                  head: "성별 상위 구매 상품",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "성별로 구분하여 가장 많이 판매된 제품 상위 5개를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-8">
              <CustomChart
                arg="카테고리성별구매"
                chartWrapperText={{
                  head: "카테고리별, 성별 구매 횟수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "카테고리별로 분류한 후 성별로 얼마나 구매했는지 막대 그래프로 나타냅니다.",
                }}
                btnSize="large"
              />
            </div>
            <div className="col-span-4">
              <CustomChart
                arg="옷사이즈별"
                chartWrapperText={{
                  head: "옷 사이즈별 판매율",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "원 그래프",
                  footerSubDesc: "옷 사이즈별 판매율을 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-8">
              <CustomChart
                arg="월별매출"
                chartWrapperText={{
                  head: "월별 매출",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "선 그래프",
                  footerSubDesc: "월별 매출을 선 그래프로 나타냅니다.",
                }}
                btnSize="large"
              />
            </div>
            <div className="col-span-4">
              <CustomChart
                arg="신발사이즈별"
                chartWrapperText={{
                  head: "신발 사이즈별 판매율",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "원 그래프",
                  footerSubDesc: "신발 사이즈별 판매율을 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="시간대별"
                chartWrapperText={{
                  head: "시간대별 주문 건수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "주문을 시간대별로 분류하여 막대 그래프로 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="월별주문"
                chartWrapperText={{
                  head: "월별 주문 건수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "주문을 월별로 분류하여 막대 그래프로 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="인기상품"
                chartWrapperText={{
                  head: "상위 인기 상품",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대사탕 그래프",
                  footerSubDesc: "가장 많이 팔린 상품 상위 10개를 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-6">
              <CustomChart
                arg="결제수단"
                chartWrapperText={{
                  head: "결제수단별 주문 건수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "막대 그래프",
                  footerSubDesc:
                    "주문을 결제수단으로 분류하고 주문건수를 세어 막대 그래프로 나타냅니다.",
                }}
              />
            </div>
            <div className="col-span-4">
              <CustomChart
                arg="유저별주문"
                chartWrapperText={{
                  head: "주문 건수 상위 유저 10명",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "원 그래프",
                  footerSubDesc:
                    "주문 건수가 제일 많은 유저 10명을 나타냅니다.",
                }}
              />
            </div>
            <Separator className="col-span-12 my-8" />
            <div className="col-span-12">
              <CustomChart
                arg="지역별주문수"
                btnSize="large"
                chartWrapperText={{
                  head: "지역별 구매자 수",
                  headDesc: "과거부터 현재까지 전체 기간입니다.",
                  footerDesc: "지도 그래프",
                  footerSubDesc:
                    "대한민국 지역별 구매자 수를 지도에 나타냅니다.",
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="predict" className="grid grid-cols-12 gap-4 mt-0">
            <div className="col-span-12">
              <CustomChart
                arg="월별매출예측_다항회귀"
                chartWrapperText={{
                  head: "월별 매출액 예측 (다항회귀)",
                  headDesc:
                    "과거부터 현재까지 전체 기간 및 미래 3개월까지 포함합니다.",
                  footerDesc: "선 그래프",
                  footerSubDesc:
                    "과거 월별 매출액을 바탕으로 미래 3개월의 매출액을 예측합니다. 주황색 점선은 예측을 위해 사용된 훈련 결과이고, 붉은색 점선은 훈련 결과를 바탕으로 미래 3개월의 매출을 예측한 선을 나타냅니다.",
                }}
                btnSize="large"
              />
            </div>
            <div className="col-span-12">
              <CustomChart
                arg="월별매출예측_선형회귀"
                chartWrapperText={{
                  head: "월별 매출액 예측 (선형회귀)",
                  headDesc:
                    "과거부터 현재까지 전체 기간 및 미래 3개월까지 포함합니다.",
                  footerDesc: "선 그래프",
                  footerSubDesc:
                    "과거 월별 매출액을 바탕으로 미래 3개월의 매출액을 예측합니다. 주황색 점선은 예측을 위해 사용된 훈련 결과이고, 붉은색 점선은 훈련 결과를 바탕으로 미래 3개월의 매출을 예측한 선을 나타냅니다.",
                }}
                btnSize="large"
              />
            </div>
            <div className="col-span-12">
              <CustomChart
                arg="일별매출예측_선형회귀"
                chartWrapperText={{
                  head: "일별 매출액 예측 (선형회귀)",
                  headDesc:
                    "과거부터 현재까지 전체 기간 및 미래 50일까지 포함합니다.",
                  footerDesc: "선 그래프",
                  footerSubDesc:
                    "과거 월별 매출액을 바탕으로 미래 50일의 매출액을 예측합니다. 주황색 점선은 예측을 위해 사용된 훈련 결과이고, 붉은색 점선은 훈련 결과를 바탕으로 미래 50일 간 매출을 예측한 선을 나타냅니다.",
                }}
                btnSize="large"
              />
            </div>
            <div className="col-span-4">
              <CustomChart
                arg="월별결제예측_ARIMA"
                chartWrapperText={{
                  head: "매출 예측 (ARIMA)",
                  headDesc:
                    "과거부터 현재까지 전체 기간 및 미래까지 포함합니다.",
                  footerDesc: "선 그래프",
                  footerSubDesc:
                    "과거 월별 매출액을 기반으로 미래의 매출액을 예측합니다. 파란선은 과거 매출 데이터이고, 붉은선은 예측 매출 데이터를 나타냅니다.",
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
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
