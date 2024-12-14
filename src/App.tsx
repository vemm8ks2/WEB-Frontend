import Product from "@/components/product/Product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icon/SearchIcon";
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

function App() {
  return (
    <>
      <div className="flex justify-between gap-6 items-center min-h-16 px-8 shadow-lg sticky top-0 bg-white z-20">
        <h1>LOGO</h1>
        <form className="relative max-w-xl w-full flex">
          <Input />
          <button className="flex items-center justify-center absolute top-0 right-1 bottom-0 w-12">
            <Separator
              orientation="vertical"
              className="-translate-x-3 h-[80%]"
            />
            <div className="flex w-8 h-8">
              <SearchIcon />
            </div>
          </button>
        </form>
        <div className="flex">
          <Button className="px-6">로그인</Button>
          <Button variant="ghost" className="ml-2">
            회원가입
          </Button>
        </div>
      </div>
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
    </>
  );
}

export default App;
