import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useCustomChartStore } from "@/store/admin/useCustomChart";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

import type { ChartWrapperText } from "@/components/dashboard/chart/chart-wrapper";

export function CustomChart(props: {
  arg: string;
  btnSize?: "medium" | "large";
  chartWrapperText?: ChartWrapperText;
}) {
  const { arg, btnSize = "medium", chartWrapperText } = props;

  const { data: auth } = useAuthStore();
  const { getChart } = useCustomChartStore();

  const [chartSvg, setChartSvg] = useState("");
  const [isLoading, setIsLoaing] = useState(false);

  const handleLoad = async () => {
    if (!auth) return;

    setIsLoaing(true);

    try {
      const chart = await getChart({ token: auth.token, arg });
      setChartSvg(chart);
    } catch (e) {
      console.error(e);
    }

    setIsLoaing(false);
  };

  return (
    <ChartWrapper
      disableDonwload={!chartSvg}
      hasData={Boolean(chartSvg)}
      isLoading={isLoading}
      callback={handleLoad}
      btnSize={btnSize}
      {...chartWrapperText}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: chartSvg.replace("<svg", `<svg width="100%" height="100%"`),
        }}
      />
    </ChartWrapper>
  );
}
