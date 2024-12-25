import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import OverviewCard from "@/components/dashboard/overview/overview-card";
import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";

const SignupUsersOfThisMonth = () => {
  const { data: auth } = useAuthStore();
  const { useSignupUsersOfThisMonth, useSignupUsersOfLastMonth } =
    useDashboardStore();
  const {
    data: signupUsersOfThisMonth,
    getData: getsignupUsersOfThisMonth,
    isLoading: isThisMonthLoading,
  } = useSignupUsersOfThisMonth();
  const {
    data: signupUsersOfLastMonth,
    getData: getsignupUsersOfLastMonth,
    isLoading: isLastMonthLoading,
  } = useSignupUsersOfLastMonth();

  const [text, setText] = useState<{ mainText: string; subText: string }>({
    mainText: "",
    subText: "",
  });

  useEffect(() => {
    if (!auth) return;

    getsignupUsersOfThisMonth({ token: auth.token });
    getsignupUsersOfLastMonth({ token: auth.token });
  }, [auth, getsignupUsersOfLastMonth, getsignupUsersOfThisMonth]);

  useEffect(() => {
    if (text.mainText && text.subText) return;
    if (!signupUsersOfThisMonth || !signupUsersOfLastMonth) return;

    const thisMonth = signupUsersOfThisMonth.data;
    const lastMonth = signupUsersOfLastMonth.data;

    let mainText = "";
    let subText = "";

    if (thisMonth) mainText = `+${thisMonth.toLocaleString()}`;

    if (thisMonth && lastMonth) {
      const percent = ((thisMonth - lastMonth) / lastMonth) * 100;

      mainText = `+${thisMonth.toLocaleString()}`;
      subText =
        percent >= 0
          ? `전달 대비 +${percent.toFixed(2)}% 상승`
          : `전달 대비 ${percent.toFixed(2)}% 하락`;
    }

    if (!thisMonth) mainText = "+0";
    if (!lastMonth) subText = "이전 달 데이터가 존재하지 않습니다.";

    setText({ mainText, subText });
  }, [
    signupUsersOfLastMonth?.data,
    signupUsersOfThisMonth?.data,
    text.mainText,
    text.subText,
  ]);

  return (
    <OverviewCard
      title="이번 달 신규 고객 수"
      Icon={<Users className="h-4 w-4 text-muted-foreground" />}
      mainText={text.mainText}
      subText={text.subText}
      isLoading={isThisMonthLoading || isLastMonthLoading}
    />
  );
};

export default SignupUsersOfThisMonth;
