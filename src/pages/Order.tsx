import { Fragment } from "react";
import { CircleAlert } from "lucide-react";

import { PaymentMethod, useOrderStore } from "@/store/useOrderStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/cart/CartItem";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FormEvent } from "react";

const Order = () => {
  const { data: auth } = useAuthStore();
  const { data, isLoading, removeAllCartItem } = useCartStore();
  const { saveOrder } = useOrderStore();

  if (!data || data.cartItems.length === 0)
    return (
      <div className="px-4 mx-auto mt-8 max-w-screen-sm w-full">
        <Alert className="shadow-lg">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>상품이 없습니다</AlertTitle>
          <AlertDescription>
            장바구니에 담긴 상품이 없습니다. 상품을 담아주세요!
          </AlertDescription>
        </Alert>
      </div>
    );

  const totalPrice = data.cartItems.reduce(
    (acc, current) => acc + current.product.price * current.quantity,
    0
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) return;

    const formData = new FormData(e.currentTarget);

    const shippingAddress = formData.get("shippingAddress")?.toString();
    const receiverName = formData.get("receiverName")?.toString();
    const receiverPhone = formData.get("receiverPhone")?.toString();
    const paymentMethod = formData.get("paymentMethod")?.toString() as
      | PaymentMethod
      | undefined;

    if (!shippingAddress || !paymentMethod) return;

    const token = auth.token;

    const { statusCode } = await saveOrder({
      token,
      shippingAddress,
      receiverName,
      receiverPhone,
      paymentMethod,
      totalPrice,
    });

    if (statusCode === 201) {
      removeAllCartItem({ token });
    }
  };

  return (
    <main className="flex gap-4 justify-center mt-8">
      <div className="max-w-xs w-full">
        {data ? (
          <div className="flex flex-col gap-4">
            {data.cartItems.map((cartItem) => (
              <Fragment key={cartItem.id}>
                <input type="hidden" name="cartItemId" value={cartItem.id} />
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  activeDeleteBtn={false}
                />
              </Fragment>
            ))}
          </div>
        ) : (
          isLoading && <Loader />
        )}
      </div>
      <div>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
            <CardDescription>주문 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid w-full items-center gap-4 min-w-64"
            >
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="shippingAddress">배송지</Label>
                <Input
                  id="shippingAddress"
                  name="shippingAddress"
                  placeholder="주소를 입력해주세요."
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="receiverName">수취인 (선택)</Label>
                <Input
                  id="receiverName"
                  name="receiverName"
                  placeholder="수취인을 입력해주세요."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="receiverPhone">수취인 연락처 (선택)</Label>
                <Input
                  id="receiverPhone"
                  name="receiverPhone"
                  placeholder="수취인 연락처 입력해주세요."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="paymentMethod">결제 수단</Label>
                <Select name="paymentMethod">
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="결제 수단을 선택해주세요." />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={PaymentMethod.digitalWallet}>
                      간편 결제
                    </SelectItem>
                    <SelectItem value={PaymentMethod.creditOrDebitCart}>
                      신용/체크카드 결제
                    </SelectItem>
                    <SelectItem value={PaymentMethod.depositWithoutPassbook}>
                      무통장 입금
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <p className="w-full text-end">
                총 결제금액 : {totalPrice.toLocaleString()}원
              </p>
              <Separator />
              <Button type="submit" className="w-full">
                결제하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Order;
