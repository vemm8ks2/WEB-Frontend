import { useEffect } from "react";

import dateFormat from "@/utils/date-format";
import paymentMethodKorean from "@/utils/payment-method-korean";
import { useOrderStore } from "@/store/admin/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import Pageable from "@/components/common/Pageable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import Loader from "@/components/ui/Loader";

const Order = () => {
  const { data: auth } = useAuthStore();
  const { data, getOrder, isLoading } = useOrderStore();

  useEffect(() => {
    if (!auth) return;
    getOrder({ token: auth.token });
  }, [auth, getOrder]);

  return (
    <Card className="max-w-screen-xl mx-auto border-0 shadow-lg">
      <CardHeader>
        <CardTitle>주문 목록</CardTitle>
        <CardDescription>
          주문의 식별자와 결제수단, 배송지, 결제금액, 배송일, 수취인, 수취인
          연락처 데이터를 보여줍니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-center">
              <TableHead>식별자</TableHead>
              <TableHead>결제수단</TableHead>
              <TableHead>배송지</TableHead>
              <TableHead>결제금액</TableHead>
              <TableHead>배송일</TableHead>
              <TableHead>수취인</TableHead>
              <TableHead>수취인 연락처</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.content.map((order) => (
                  <TableRow key={order.id} className="[&>td]:py-3">
                    <TableCell className="font-medium text-ellipsis text-center">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-center">
                      {paymentMethodKorean(order.paymentMethod)}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.shippingAddress}
                    </TableCell>
                    <TableCell className="text-end">
                      ₩ {order.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {dateFormat({ date: new Date(order.deliveredAt) })}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.receiverName ? order.receiverName : "정보 없음"}
                    </TableCell>
                    <TableCell className="text-center">
                      {order.receiverPhone ? order.receiverPhone : "정보 없음"}
                    </TableCell>
                  </TableRow>
                ))
              : isLoading && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Loader className="text-zinc-400 mx-auto my-4" />
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell colSpan={7}>
                {data && <Pageable data={data} callback={getOrder} />}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Order;
