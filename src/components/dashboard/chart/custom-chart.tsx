import { useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useCustomChartStore } from "@/store/admin/useCustomChart";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
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
    <ChartWrapper disableDonwload={!chartSvg}>
      {!chartSvg && (
        <div className="flex">
          <Button
            onClick={handleLoad}
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
      <div
        dangerouslySetInnerHTML={{
          __html: chartSvg.replace("<svg", `<svg width="100%" height="100%"`),
        }}
      />
    </ChartWrapper>
  );
}
