import { Fragment, useEffect } from "react";

import { useProductStore } from "@/store/admin/useProductStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Loader from "@/components/ui/Loader";
import { Separator } from "@/components/ui/separator";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import Pageable from "@/components/common/Pageable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const { data: auth } = useAuthStore();
  const { data, getProduct, isLoading } = useProductStore();

  useEffect(() => {
    if (!auth) return;
    getProduct({ token: auth.token });
  }, [auth, getProduct]);

  return (
    <Card className="max-w-screen-lg mx-auto border-0 shadow-lg">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>상품 목록</CardTitle>
          <CardDescription>
            상품의 식별자와 상품명, 가격, 카테고리, 옵션 데이터를 보여줍니다.
          </CardDescription>
        </div>
        <Button
          className="px-20"
          onClick={() => navigate("/admin/product/create")}
        >
          상품생성
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">식별자</TableHead>
              <TableHead className="text-center">상품명</TableHead>
              <TableHead className="text-center">가격</TableHead>
              <TableHead className="text-center">카테고리</TableHead>
              <TableHead className="text-center">옵션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.content.map((product) => (
                  <TableRow key={product.id} className="[&>td]:py-3">
                    <TableCell className="text-center">{product.id}</TableCell>
                    <TableCell className="font-medium text-ellipsis">
                      {product.title}
                    </TableCell>
                    <TableCell className="text-right">
                      ₩ {Number(product.price).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.category.name}
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <p className="col-span-1">사이즈</p>
                        <p className="col-span-1">재고</p>
                        {product.productOptions.map((option) => (
                          <Fragment key={option.id}>
                            <Separator className="col-span-2" />
                            <div className="col-span-2 grid grid-cols-11">
                              <p className="col-span-5">{option.size}</p>
                              <Separator
                                className="col-span-1 mx-auto"
                                orientation="vertical"
                              />
                              <p className="col-span-5">
                                {option.stock.toLocaleString()}
                              </p>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : isLoading && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Loader className="text-zinc-400 mx-auto my-4" />
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell colSpan={5}>
                {data && (
                  <Pageable data={data} mode="ADMIN" callback={getProduct} />
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Product;
