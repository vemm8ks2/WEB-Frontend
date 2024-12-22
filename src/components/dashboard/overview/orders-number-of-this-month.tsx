import OverviewCard from "@/components/dashboard/overview/overview-card";

import { CreditCard } from "lucide-react";

const OrdersNumberOfThisMonth = () => {
  return (
    <OverviewCard
      title="이번 달 상품 판매 개수"
      Icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      mainText="+12,234"
      subText="전달 대비 +19% 상승"
    />
  );
};

export default OrdersNumberOfThisMonth;
