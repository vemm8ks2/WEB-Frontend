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

const Home = () => {
  return (
    <>
      <main className="max-w-[1940px] mx-auto p-5 lg:flex lg:justify-center lg:gap-6">
        <Card className="sticky top-[84px] w-72 h-min rounded-md border-0 shadow-lg hidden lg:block">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_) => (
            <Product />
          ))}
        </div>
      </main>
      <Pagination className="mt-2 mb-8">
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
    </>
  );
};

export default Home;
