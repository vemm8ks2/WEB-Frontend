import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import OverviewCard from "@/components/dashboard/overview/overview-card";

const SellingQuantityForThisMonth = () => {
  const { data: auth } = useAuthStore();
  const { useSellingQuantityForThisMonth, useSellingQuantityForLastMonth } =
    useDashboardStore();
  const {
    data: sellingQuantityForThisMonth,
    getData: getSellingQuantityForThisMonth,
    isLoading: isThisMonthLoading,
  } = useSellingQuantityForThisMonth();
  const {
    data: sellingQuantityForLastMonth,
    getData: getSellingQuantityForLastMonth,
    isLoading: isLastMonthLoading,
  } = useSellingQuantityForLastMonth();

  const [text, setText] = useState<{ mainText: string; subText: string }>({
    mainText: "",
    subText: "",
  });

  useEffect(() => {
    if (!auth) return;

    getSellingQuantityForThisMonth({ token: auth.token });
    getSellingQuantityForLastMonth({ token: auth.token });
  }, [auth, getSellingQuantityForLastMonth, getSellingQuantityForThisMonth]);

  useEffect(() => {
    if (text.mainText && text.subText) return;
    if (!sellingQuantityForThisMonth || !sellingQuantityForLastMonth) return;

    const thisMonth = (sellingQuantityForThisMonth.data as number) || 0;
    const lastMonth = sellingQuantityForLastMonth.data as number;

    let mainText = "";
    let subText = "";

    if (thisMonth || thisMonth === 0)
      mainText = `+${thisMonth.toLocaleString()}`;

    if ((thisMonth || thisMonth === 0) && lastMonth) {
      const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

      mainText = `+${thisMonth.toLocaleString()}`;
      subText =
        percent >= 0
          ? `전달 같은 기간 대비(${lastMonth}개) +${percent.toFixed(2)}% 상승`
          : `전달 같은 기간 대비(${lastMonth}개) ${percent.toFixed(2)}% 하락`;
    }

    if (!thisMonth) mainText = "+0";
    if (!lastMonth) subText = "전달 같은 기간동안 데이터가 존재하지 않습니다.";

    setText({ mainText, subText });
  }, [
    sellingQuantityForLastMonth,
    sellingQuantityForThisMonth,
    text.mainText,
    text.subText,
  ]);

  return (
    <OverviewCard
      title="이번 달 판매 개수"
      Icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      mainText={text.mainText}
      subText={text.subText}
      isLoading={isThisMonthLoading || isLastMonthLoading}
    />
  );
};

export default SellingQuantityForThisMonth;
