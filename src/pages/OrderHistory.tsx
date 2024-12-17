import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { PaymentMethod, useOrderStore } from "@/store/useOrderStore";
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
        {orders.map((order) => {
          const date = new Date(order.deliveredAt);
          const year = date.getFullYear();
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const hours = ("0" + date.getHours()).slice(-2);
          const minutes = ("0" + date.getMinutes()).slice(-2);
          const seconds = ("0" + date.getSeconds()).slice(-2);
          const deliveredAt = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

          return (
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
              <CardFooter className="flex flex-col items-end gap-3 mt-6 text-sm">
                <div className="flex flex-col gap-1 text-end">
                  <p>
                    결제 수단 :{" "}
                    {order.paymentMethod === PaymentMethod.digitalWallet
                      ? "간편 결제"
                      : order.paymentMethod === PaymentMethod.creditOrDebitCart
                      ? "신용/체크카드 결제"
                      : "무통장입금"}
                  </p>
                  <p>배송지 : {order.shippingAddress}</p>
                  {order.receiverName && <p>받는이 : {order.receiverName}</p>}
                  {order.receiverPhone && (
                    <p>받는이 연락처 : {order.receiverPhone}</p>
                  )}
                  <p>배송날짜 : {deliveredAt}</p>
                </div>
                <p>
                  총 결제 금액 :
                  <span className="font-semibold ml-1 text-base">
                    {order.totalPrice.toLocaleString()}원
                  </span>
                </p>
              </CardFooter>
            </Card>
          );
        })}
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
