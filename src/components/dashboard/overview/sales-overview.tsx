import { useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/Loader";
import { useAuthStore } from "@/store/useAuthStore";

const SalesOverview = () => {
  const { data: auth } = useAuthStore();
  const { useOrderAmountForLastYear } = useDashboardStore();
  const {
    data: orderAmountForLastYear,
    getData: getOrderAmountForLastYear,
    isLoading,
  } = useOrderAmountForLastYear();

  useEffect(() => {
    if (!auth) return;

    getOrderAmountForLastYear({ token: auth.token });
  }, [auth, getOrderAmountForLastYear]);

  const data = Array.from({ length: 12 }).map(() => ({ name: "·", total: 0 }));

  if (orderAmountForLastYear?.data) {
    const orderAmount = orderAmountForLastYear.data.map((v) => ({
      name: `${v[0]}-${v[1]}`,
      total: v[2],
    }));

    const len = orderAmountForLastYear.data.length;
    const startIndex = 12 - len;

    data.splice(startIndex, len, ...orderAmount);
  }

  return (
    <Card className="col-span-4 flex flex-col">
      <CardHeader>
        <CardTitle>판매액 개요</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 flex-1 flex justify-center items-center">
        {isLoading ? (
          <Loader className="text-zinc-400" />
        ) : (
          orderAmountForLastYear && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data} margin={{ left: 15 }}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
