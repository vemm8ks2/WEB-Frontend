import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import type { CartItem } from "@/store/useCartStore";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>{cartItem.product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <img
          src={cartItem.product.imageUrl}
          className="w-36 shadow rounded-md"
        />
        <div className="flex flex-col justify-center gap-4 text-end">
          <p className="text-sm">사이즈 : {cartItem.size}</p>
          <Separator />
          <div className="flex items-center gap-3 shadow rounded-full">
            <Button
              variant="ghost"
              className="rounded-full p-0 w-10 h-10 text-zinc-500"
            >
              <MinusIcon />
            </Button>
            <p>{cartItem.quantity}</p>
            <Button
              variant="ghost"
              className="rounded-full p-0 w-10 h-10 text-zinc-500"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full">
          아이템 삭제
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItem;
