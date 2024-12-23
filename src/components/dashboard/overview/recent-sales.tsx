import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Loader from "@/components/ui/Loader";

const RecentSales = () => {
  const { data: auth } = useAuthStore();
  const { useTop5RecentOrders } = useDashboardStore();
  const {
    data: top5RecentOrders,
    isLoading,
    getData: getTop5RecentOrders,
  } = useTop5RecentOrders();

  useEffect(() => {
    if (!auth) return;

    getTop5RecentOrders({ token: auth.token });
  }, [auth, getTop5RecentOrders]);

  return (
    <>
      <Card className="col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle>최근 주문</CardTitle>
          <CardDescription>가장 최근 주문 5개입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex justify-center items-center">
          {isLoading ? (
            <Loader className="text-zinc-400" />
          ) : (
            <div className="space-y-8 w-full">
              {top5RecentOrders?.data?.map((order) => {
                const deliveredAt = new Date(order.deliveredAt);

                const year = deliveredAt.getFullYear();
                const month = String(deliveredAt.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(deliveredAt.getDate()).padStart(2, "0");
                const hours = String(deliveredAt.getHours()).padStart(2, "0");
                const minutes = String(deliveredAt.getMinutes()).padStart(
                  2,
                  "0"
                );
                const seconds = String(deliveredAt.getSeconds()).padStart(
                  2,
                  "0"
                );

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                return (
                  <div key={order.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {order.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {order.user.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{`₩ ${order.totalPrice.toLocaleString()}`}</div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RecentSales;
