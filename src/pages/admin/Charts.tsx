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
import { RadarChartComponent } from "@/components/dashboard/chart/radar-chart";
import { RadarChartLinesOnly } from "@/components/dashboard/chart/radar-chart-lines-only";
import { RadarChartLegend } from "@/components/dashboard/chart/radar-chart-legend";
import { RadialChartText } from "@/components/dashboard/chart/radial-chart-text";
import { RadialChartShape } from "@/components/dashboard/chart/radial-chart-shape";
import { RadarChartStacked } from "@/components/dashboard/chart/radial-chart-stacked";

const Charts = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <AreaChartComponent />
      </div>
      <div className="col-span-4">
        <AreaChartStacked />
      </div>
      <div className="col-span-4">
        <AreaChartStep />
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
      <div className="col-span-4">
        <BarChartNegative />
      </div>
      <div className="col-span-12">
        <BarChartInteractive />
      </div>
      <Separator className="col-span-12 my-8" />
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
      <div className="col-span-4">
        <RadialChartText />
      </div>
      <div className="col-span-4">
        <RadialChartShape />
      </div>
      <div className="col-span-4">
        <RadarChartStacked />
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
    </div>
  );
};

export default Charts;
