import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import OrderItem from "@/components/order/OrderItem";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

const OrderHistory = () => {
  const { orders, getOrderList } = useOrderStore();
  const { data: auth } = useAuthStore();

  useEffect(() => {
    if (!auth) return;
    const token = auth.token;

    getOrderList({ token });
  }, [auth, getOrderList]);

  return (
    <main className="flex flex-col gap-4 justify-center items-center my-8">
      <div className="max-w-sm w-full flex flex-col gap-6">
        {orders.map((order) => (
          <Card className="w-full border-0 shadow-lg">
            <CardHeader>
              <CardTitle>주문 번호 : {order.id}</CardTitle>
              <CardDescription>
                주문 번호 {order.id} 주문 내역입니다.
              </CardDescription>
            </CardHeader>
            <Separator className="mb-6" />
            <CardContent className="flex flex-col gap-4">
              {order.orderItems.map((orderItem) => (
                <OrderItem orderItem={orderItem} />
              ))}
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end mt-6 text-sm">
              총 결제 금액 :
              <span className="font-semibold ml-1 text-base">
                {order.totalPrice.toLocaleString()}원
              </span>
            </CardFooter>
          </Card>
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default OrderHistory;
