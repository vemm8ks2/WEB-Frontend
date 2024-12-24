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

const Product = () => {
  const { data: auth } = useAuthStore();
  const { data, getProduct, isLoading } = useProductStore();

  useEffect(() => {
    if (!auth) return;
    getProduct({ token: auth.token });
  }, [auth, getProduct]);

  return (
    <Card className="max-w-screen-lg mx-auto border-0 shadow-lg">
      <CardHeader>
        <CardTitle>상품 목록</CardTitle>
        <CardDescription>
          상품의 식별자와 상품명, 가격, 카테고리, 옵션 데이터를 보여줍니다.
        </CardDescription>
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
                    <TableCell colSpan={4}>
                      <Loader className="text-zinc-400 mx-auto my-4" />
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell colSpan={4}>
                {data && (
                  <Pageable data={data} callback={getProduct} />
                  // <Pagination>
                  //   <PaginationContent>
                  //     <PaginationItem>
                  //       <Button
                  //         onClick={() => setCurrentPage((prev) => prev - 1)}
                  //         variant="link"
                  //         disabled={currentPage <= 0}
                  //         className="gap-1 pl-2.5"
                  //       >
                  //         <ChevronLeft className="h-4 w-4" />
                  //         <span>이전</span>
                  //       </Button>
                  //     </PaginationItem>
                  //     {Array.from({ length: data.totalPages }).map((_, i) => (
                  //       <PaginationItem key={i}>
                  //         <Button
                  //           onClick={() => setCurrentPage(i)}
                  //           variant={i === currentPage ? "default" : "link"}
                  //           className="rounded-full w-9 h-9"
                  //         >
                  //           {i + 1}
                  //         </Button>
                  //       </PaginationItem>
                  //     ))}
                  //     <PaginationItem>
                  //       <Button
                  //         onClick={() => setCurrentPage((prev) => prev + 1)}
                  //         variant="link"
                  //         disabled={data.totalPages - 1 <= currentPage}
                  //         className="gap-1 pr-2.5"
                  //       >
                  //         <span>다음</span>
                  //         <ChevronRight className="h-4 w-4" />
                  //       </Button>
                  //     </PaginationItem>
                  //   </PaginationContent>
                  // </Pagination>
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
