import { useEffect } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItem from "./CartItem";
import { ScrollArea } from "../ui/scroll-area";

const CartSheet = () => {
  const { data: auth } = useAuthStore();
  const { data, getCart, isLoading } = useCartStore();

  useEffect(() => {
    if (!auth) return;
    if (!data) getCart({ token: auth.token });
  }, []);

  if (!auth) <></>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 rounded-full">
          <ShoppingCartIcon className="text-zinc-700" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>장바구니</SheetTitle>
          <SheetDescription>내가 추가한 장바구니 목록입니다.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-2 h-5/6 rounded-md">
          <div className="flex flex-col gap-6 mx-2 my-5">
            {data ? (
              <>
                {data.cartItems.map((cartItem) => (
                  <CartItem key={cartItem.cartId} cartItem={cartItem} />
                ))}
              </>
            ) : (
              isLoading && <Loader />
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full mt-8 py-5">
              결제하기
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
