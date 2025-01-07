import { useRef } from "react";

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
import htmlToPng from "@/utils/html-to-png";

import type { ReactNode } from "react";

export type ChartWrapperText = {
  head?: ReactNode;
  headDesc?: ReactNode;
  footerDesc?: ReactNode;
  footerSubDesc?: ReactNode;
};

export function ChartWrapper(
  props: {
    children: ReactNode;
    disableDonwload?: boolean;
    hasData?: boolean;
    isLoading?: boolean;
    callback?: () => void;
  } & ChartWrapperText
) {
  const {
    head,
    headDesc,
    footerDesc,
    footerSubDesc,
    children,
    disableDonwload = false,
    hasData = false,
    isLoading = false,
    callback,
  } = props;

  const divRef = useRef<HTMLDivElement>(null);

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
          <CardHeader>
            <CardTitle>{head || "차트의 종류를 기입해주세요."}</CardTitle>
            <CardDescription>
              {headDesc || "차트의 기간 범위를 기입해주세요."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!hasData && (
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
            {children}
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  {footerDesc || "차트의 설명을 기입해주세요."}
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  {footerSubDesc || "차트의 상세 설명을 기입해주세요."}
                </div>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
      <Button
        variant="outline"
        disabled={disableDonwload}
        onClick={handleDownload}
        className="mt-3 w-full"
      >
        다운로드
      </Button>
    </>
  );
}
