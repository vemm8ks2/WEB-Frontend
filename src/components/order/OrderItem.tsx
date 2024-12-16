import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { ResponseOrderItem } from "@/store/useOrderStore";

const OrderItem = ({ orderItem }: { orderItem: ResponseOrderItem }) => {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>{orderItem.product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <img
          src={orderItem.product.imageUrl}
          className="w-36 h-36 shadow rounded-md object-cover"
        />
        <div className="flex flex-col justify-center gap-4 text-end">
          <p className="text-sm">주문 사이즈 : {orderItem.size}</p>
          <Separator />
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              상품가 : {orderItem.price.toLocaleString()}원
            </p>
            <p className="text-sm">주문 수량 : {orderItem.quantity}</p>
          </div>
          <Separator />
          <p className="text-sm">
            합계 : {(orderItem.price * orderItem.quantity).toLocaleString()}원
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
