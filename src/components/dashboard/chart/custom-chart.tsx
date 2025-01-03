import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { nanoid } from "nanoid";

import { useAuthStore } from "@/store/useAuthStore";
import { useCustomChartStore } from "@/store/admin/useCustomChart";
import svgToPng from "@/utils/svg-to-png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";

export function CustomChart({ arg }: { arg: string }) {
  const { data: auth } = useAuthStore();
  const { isLoading, getChart } = useCustomChartStore();

  const [chartSvg, setChartSvg] = useState("");

  const handleLoad = async () => {
    if (!auth) return;

    const chart = await getChart({ token: auth.token, arg });
    setChartSvg(chart);
  };

  const svgId = nanoid(5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            __html: chartSvg.replace(
              "<svg",
              `<svg id="${svgId}" width="100%" height="100%"`
            ),
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => svgToPng({ id: svgId, width: 431, height: 323 })}
        >
          다운로드
        </Button>
      </CardFooter>
    </Card>
  );
}
