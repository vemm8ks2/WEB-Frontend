import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";

import OverviewCard from "@/components/dashboard/overview/overview-card";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";

const OrdersNumberOfThisMonth = () => {
  const { data: auth } = useAuthStore();
  const { useOrdersNumberOfThisMonth, useOrdersNumberOfLastMonth } =
    useDashboardStore();
  const {
    data: ordersNumberOfThisMonth,
    getData: getordersNumberOfThisMonth,
    isLoading: isThisMonthLoading,
  } = useOrdersNumberOfThisMonth();
  const {
    data: ordersNumberOfLastMonth,
    getData: getordersNumberOfLastMonth,
    isLoading: isLastMonthLoading,
  } = useOrdersNumberOfLastMonth();

  const [text, setText] = useState<{ mainText: string; subText: string }>({
    mainText: "",
    subText: "",
  });

  useEffect(() => {
    if (!auth) return;

    getordersNumberOfThisMonth({ token: auth.token });
    getordersNumberOfLastMonth({ token: auth.token });
  }, [auth, getordersNumberOfLastMonth, getordersNumberOfThisMonth]);

  useEffect(() => {
    if (text.mainText && text.subText) return;
    if (!ordersNumberOfThisMonth || !ordersNumberOfLastMonth) return;

    const thisMonth = ordersNumberOfThisMonth.data || 0;
    const lastMonth = ordersNumberOfLastMonth.data;

    let mainText = "";
    let subText = "";

    if (thisMonth || thisMonth === 0)
      mainText = `+${thisMonth.toLocaleString()}`;

    if ((thisMonth || thisMonth === 0) && lastMonth) {
      const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

      mainText = `+${thisMonth.toLocaleString()}`;
      subText =
        percent >= 0
          ? `전달 같은 기간 대비(${lastMonth}건) +${percent.toFixed(2)}% 상승`
          : `전달 같은 기간 대비(${lastMonth}건) ${percent.toFixed(2)}% 하락`;
    }

    if (!thisMonth) mainText = "+0";
    if (!lastMonth) subText = "전달 같은 기간동안 데이터가 존재하지 않습니다.";

    setText({ mainText, subText });
  }, [
    ordersNumberOfLastMonth,
    ordersNumberOfLastMonth?.data,
    ordersNumberOfThisMonth,
    ordersNumberOfThisMonth?.data,
    text.mainText,
    text.subText,
  ]);

  return (
    <OverviewCard
      title="이번 달 주문 건수"
      Icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      mainText={text.mainText}
      subText={text.subText}
      isLoading={isThisMonthLoading || isLastMonthLoading}
    />
  );
};

export default OrdersNumberOfThisMonth;
