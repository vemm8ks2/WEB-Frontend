import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import type { ProductOption } from "@/store/useProductStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

import type { FormEvent } from "react";

const Option = ({
  productId,
  productOptions,
}: {
  productId: number;
  productOptions: ProductOption[];
}) => {
  const navigate = useNavigate();

  const { data } = useAuthStore();
  const { addCartItem } = useCartStore();

  const handleOptionBtn = () => {
    if (!data) {
      navigate("/login");
      return;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const size = formData.get("size")?.toString();
    const quantity = formData.get("quantity")?.toString();

    console.log({ size, quantity, data });

    if (!size || !quantity || !data) {
      return;
    }

    addCartItem({
      token: data.token,
      cartItem: {
        product: { id: productId },
        quantity: Number(quantity),
        size: size,
      },
    });
  };

  const sizeId = nanoid(5);
  const qtyId = nanoid(5);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={handleOptionBtn} className="w-full">
          옵션 선택
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              상품의 옵션을 선택해주세요.
            </h4>
            <p className="text-sm text-zinc-500">
              사이즈와 수량은 필수 입력사항입니다.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={sizeId}>사이즈</Label>
              <Select name="size">
                <SelectTrigger id={sizeId} className="col-span-3">
                  <SelectValue placeholder="사이즈를 선택해주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {productOptions.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.size.toString()}
                      >
                        {option.size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={qtyId}>수량</Label>
              <Input
                id={qtyId}
                name="quantity"
                type="number"
                placeholder="수량을 입력해주세요."
                className="col-span-3 h-8"
              />
            </div>
            <Button type="submit" variant="outline" className="mt-2">
              장바구니 담기
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Option;
