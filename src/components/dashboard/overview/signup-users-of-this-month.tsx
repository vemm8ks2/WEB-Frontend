import OverviewCard from "@/components/dashboard/overview/overview-card";

import { Users } from "lucide-react";

const SignupUsersOfThisMonth = () => {
  return (
    <OverviewCard
      title="이번 달 신규 고객 수"
      Icon={<Users className="h-4 w-4 text-muted-foreground" />}
      mainText="+2350"
      subText="전달 대비 +180.1% 상승"
    />
  );
};

export default SignupUsersOfThisMonth;
