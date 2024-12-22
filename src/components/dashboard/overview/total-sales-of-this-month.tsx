import OverviewCard from "@/components/dashboard/overview/overview-card";
import { useAuthStore } from "@/store/useAuthStore";

import { DollarSign } from "lucide-react";
import { useEffect } from "react";

const TotalSalesOfThisMonth = () => {
  const { data: auth } = useAuthStore();

  useEffect(() => {
    (async () => {
      if (!auth) return;

      const res = await fetch(
        "http://localhost:5454/api/admin/dashboard/total-sales-of-this-month",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await res.json();

      console.log(data);
    })();
  }, []);

  return (
    <OverviewCard
      title="이번 달 총 판매액"
      Icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      mainText="$45,231.89"
      subText="전달 대비 +20.1% 상승"
    />
  );
};

export default TotalSalesOfThisMonth;
