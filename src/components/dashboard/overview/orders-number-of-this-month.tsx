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

    const isNumber =
      !isNaN(Number(ordersNumberOfThisMonth.data)) &&
      !isNaN(Number(ordersNumberOfLastMonth.data));

    if (!isNumber) return;

    const thisMonth = ordersNumberOfThisMonth.data as number;
    const lastMonth = ordersNumberOfLastMonth.data as number;

    const percent = ((thisMonth - lastMonth) / lastMonth) * 100 || 0;

    const mainText = `+${thisMonth}`;
    const subText =
      percent >= 0
        ? `전달 대비 +${percent.toFixed(2)}% 상승`
        : `전달 대비 ${percent.toFixed(2)}% 하락`;

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
      title="이번 달 상품 판매 개수"
      Icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      mainText={text.mainText}
      subText={text.subText}
      isLoading={isThisMonthLoading || isLastMonthLoading}
    />
  );
};

export default OrdersNumberOfThisMonth;
