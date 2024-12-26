import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import supabase, { getProductImageUrl } from "@/lib/supabaseClient";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/admin/useProductStore";
import SelectCategories from "@/components/category/SelectCategories";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FormEvent } from "react";
import type { ProductOption } from "@/types/product";

const Product = () => {
  const [option, setOption] = useState(["", "", ""]);

  const { data: auth } = useAuthStore();
  const { categories, getCategories } = useCategoryStore();
  const { createProduct } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("product-image")
      .upload(nanoid(), file);

    if (error) {
      console.error("File upload error:", error.message);
      throw error;
    }

    return data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) return;

    const formData = new FormData(e.currentTarget);

    const productImage = formData.get("product-image") as File | null;
    const productPrice = formData.get("product-price") as number | null;
    const productTitle = formData.get("product-title") as string | null;
    const productCategory = formData.get("product-category") as string | null;
    const productOption = formData.getAll("product-option") as string[] | null;
    const productQuantity = formData.getAll("product-quantity") as
      | string[]
      | null;

    if (
      !productImage ||
      !productPrice ||
      !productTitle ||
      !productCategory ||
      !productOption ||
      !productQuantity
    ) {
      return;
    }

    const options: Omit<ProductOption, "id">[] = [];
    const min = Math.min(productOption.length, productQuantity.length);

    if (min === 0) return;

    for (let i = 0; i < min; i++) {
      const size = productOption[i];
      const stock = productQuantity[i];

      if (size && stock) options.push({ size, stock: Number(stock) });
    }

    const fileData = await uploadFile(productImage);

    createProduct({
      token: auth.token,
      title: productTitle,
      price: productPrice,
      imageUrl: getProductImageUrl(fileData.fullPath),
      categoryId: productCategory,
      productOptions: options,
    });
  };

  const fileId = nanoid(5);
  const priceId = nanoid(5);
  const titleId = nanoid(5);
  const categoryId = nanoid(5);

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-sm mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader>상품 생성</CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor={titleId}>상품 제목</Label>
            <Input name="product-title" id={titleId} />
          </div>
          <div>
            <Label htmlFor={priceId}>상품 가격</Label>
            <Input type="number" name="product-price" id={priceId} />
          </div>
          <div>
            <Label htmlFor={categoryId}>상품 카테고리</Label>
            <Select name="product-category">
              <SelectTrigger id={categoryId}>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectCategories categories={categories} />
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label htmlFor={fileId}>상품 이미지</Label>
            <Input
              type="file"
              accept="image/*"
              name="product-image"
              id={fileId}
            />
          </div>
          {Array.from({ length: option.length }).map((_, i) => {
            const sizeId = nanoid(5);
            const quantityId = nanoid(5);

            return (
              <div className="col-span-2 flex gap-3">
                <div className="flex-1">
                  <Label htmlFor={sizeId}>옵션 {i + 1}. 사이즈</Label>
                  <Input key={i + "1"} id={sizeId} name="product-option" />
                </div>
                <div className="flex-1">
                  <Label htmlFor={quantityId}>옵션 {i + 1}. 개수</Label>
                  <Input
                    key={i + "2"}
                    type="number"
                    id={quantityId}
                    name="product-quantity"
                  />
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant="outline"
            onClick={() => setOption((prev) => [...prev, ""])}
            className="col-span-2"
          >
            옵션 추가
          </Button>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full py-5">
            제출
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Product;
