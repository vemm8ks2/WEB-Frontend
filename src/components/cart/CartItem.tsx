import { MinusIcon, PlusIcon } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import type { ResponseCartItem } from "@/store/useCartStore";

const CartItem = ({ cartItem }: { cartItem: ResponseCartItem }) => {
  const { data } = useAuthStore();
  const { updateQuantity, removeCartItem } = useCartStore();

  console.log(cartItem);

  const handleQuantity = (qty: number) => {
    if (!data) return;

    updateQuantity({
      token: data.token,
      quantity: cartItem.quantity + qty,
      cartItemId: cartItem.id.toString(),
    });
  };

  const handleDelete = () => {
    if (!data) return;

    removeCartItem({ token: data.token, cartItemId: cartItem.id.toString() });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>{cartItem.product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <img
          src={cartItem.product.imageUrl}
          className="w-36 shadow rounded-md"
        />
        <div className="flex flex-col justify-center gap-4 text-end">
          <p className="text-sm">사이즈 : {cartItem.size}</p>
          <Separator />
          <div className="flex items-center justify-between w-28 shadow rounded-full">
            <Button
              onClick={() => handleQuantity(-1)}
              variant="ghost"
              className="rounded-full p-0 w-10 h-10 text-zinc-500"
            >
              <MinusIcon />
            </Button>
            <p>{cartItem.quantity}</p>
            <Button
              onClick={() => handleQuantity(1)}
              variant="ghost"
              className="rounded-full p-0 w-10 h-10 text-zinc-500"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDelete} variant="destructive" className="w-full">
          장바구니 삭제
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItem;
