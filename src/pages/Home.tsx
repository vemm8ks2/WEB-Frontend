import { useEffect } from "react";

import { useProductStore } from "@/store/useProductStore";
import Product from "@/components/product/Product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AccordionCategories from "@/components/category/AccordionCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Home = () => {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const hasProducts = products.length > 0;

  return (
    <>
      <main className="max-w-screen-2xl w-full flex-1 mx-auto p-5 lg:flex lg:justify-center lg:gap-6">
        <Card className="sticky top-[84px] min-w-64 h-min rounded-md border-0 shadow-lg hidden lg:block">
          <CardHeader>
            <CardTitle>필터</CardTitle>
            <CardDescription>
              조회를 원하는 상품 조건을 선택해주세요.
            </CardDescription>
          </CardHeader>
          <Separator className="mb-4" />
          <CardContent>
            <p className="text-sm">카테고리</p>
            <AccordionCategories />
          </CardContent>
          <Separator className="mb-6" />
          <CardFooter>
            <Button variant="outline" className="w-full">
              초기화
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col flex-1 justify-between">
          {hasProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Alert className="m-auto w-[25rem] border-0 shadow-lg">
              <Info className="h-4 w-4" />
              <AlertTitle>상품이 존재하지 않습니다!</AlertTitle>
              <AlertDescription>
                검색 키워드를 수정하거나 조건을 다르게 설정해보세요.
              </AlertDescription>
            </Alert>
          )}
          <Pagination className="my-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </>
  );
};

export default Home;
