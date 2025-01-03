import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

import OverviewCard from "@/components/dashboard/overview/overview-card";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";

const TotalSalesOfThisMonth = () => {
  const { data: auth } = useAuthStore();
  const { useTotalSalesOfThisMonth, useTotalSalesOfLastMonth } =
    useDashboardStore();
  const {
    data: totalSalesOfThisMonth,
    getData: getTotalSalesOfThisMonth,
    isLoading: isThisMonthLoading,
  } = useTotalSalesOfThisMonth();
  const {
    data: totalSalesOfLastMonth,
    getData: getTotalSalesOfLastMonth,
    isLoading: isLastMonthLoading,
  } = useTotalSalesOfLastMonth();

  const [text, setText] = useState<{ mainText: string; subText: string }>({
    mainText: "",
    subText: "",
  });

  useEffect(() => {
    if (!auth) return;

    getTotalSalesOfThisMonth({ token: auth.token });
    getTotalSalesOfLastMonth({ token: auth.token });
  }, [auth, getTotalSalesOfLastMonth, getTotalSalesOfThisMonth]);

  useEffect(() => {
    if (text.mainText && text.subText) return;
    if (!totalSalesOfThisMonth || !totalSalesOfLastMonth) return;

    const thisMonth = totalSalesOfThisMonth.data;
    const lastMonth = totalSalesOfLastMonth.data;

    let mainText = "";
    let subText = "";

    if (thisMonth || thisMonth === 0)
      mainText = `+${thisMonth.toLocaleString()}`;

    if ((thisMonth || thisMonth === 0) && lastMonth) {
      const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

      mainText = `₩ ${thisMonth.toLocaleString()}`;
      subText =
        percent >= 0
          ? `전달 대비 +${percent.toFixed(2)}% 상승`
          : `전달 대비 ${percent.toFixed(2)}% 하락`;
    }

    if (!thisMonth) mainText = "₩ 0";
    if (!lastMonth) subText = "전달 같은 기간동안 데이터가 존재하지 않습니다.";

    setText({ mainText, subText });
  }, [
    text.mainText,
    text.subText,
    totalSalesOfLastMonth,
    totalSalesOfThisMonth,
  ]);

  return (
    <OverviewCard
      title="이번 달 총 판매액"
      Icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      mainText={text.mainText}
      subText={text.subText}
      isLoading={isThisMonthLoading || isLastMonthLoading}
    />
  );
};

export default TotalSalesOfThisMonth;
