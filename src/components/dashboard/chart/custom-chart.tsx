import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useCustomChartStore } from "@/store/admin/useCustomChart";
import { ChartWrapper } from "@/components/dashboard/chart/chart-wrapper";

export function CustomChart({ arg }: { arg: string }) {
  const { data: auth } = useAuthStore();
  const { isLoading, getChart } = useCustomChartStore();

  const [chartSvg, setChartSvg] = useState("");

  const handleLoad = async () => {
    if (!auth) return;

    const chart = await getChart({ token: auth.token, arg });
    setChartSvg(chart);
  };

  return (
    <ChartWrapper
      disableDonwload={!chartSvg}
      hasData={Boolean(chartSvg)}
      isLoading={isLoading}
      callback={handleLoad}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: chartSvg.replace("<svg", `<svg width="100%" height="100%"`),
        }}
      />
    </ChartWrapper>
  );
}
