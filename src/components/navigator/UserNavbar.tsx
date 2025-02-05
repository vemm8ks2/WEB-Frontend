import { useNavigate } from "react-router-dom";
import { UserIcon } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import SearchIcon from "@/components/icon/SearchIcon";
import CartSheet from "@/components/cart/CartSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { FormEvent } from "react";

const UserNavbar = () => {
  const navigate = useNavigate();

  const { data, signout } = useAuthStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("keyword");

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("category_id") || undefined;

    let route = `/?`;

    if (keyword) route += `keyword=${keyword}`;
    if (categoryId) route += `&category_id=${categoryId}`;

    navigate(route);
  };

  return (
    <>
      <div className="text-center py-3 bg-zinc-100 text-sm">
        해당 사이트는 데모입니다. 실제 상품 판매 행위는 하지 않습니다.
      </div>
      <div className="flex justify-between gap-6 items-center min-h-16 px-8 shadow-lg sticky top-0 bg-white z-20">
        <h1>
          <Button variant="link" onClick={() => navigate("/")}>
            LOGO
          </Button>
        </h1>
        <form onSubmit={handleSubmit} className="relative max-w-xl w-full flex">
          <Input name="keyword" />
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
        {data ? (
          <div className="flex items-center gap-3">
            <CartSheet />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-10 h-10 rounded-full">
                  <UserIcon className="text-zinc-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="p-0">
                  <button
                    onClick={() => navigate("/order-history")}
                    className="p-1.5 w-full text-start"
                  >
                    주문목록
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <button onClick={signout} className="p-1.5 w-full text-start">
                    로그아웃
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => navigate("/login")} className="px-6">
              로그인
            </Button>
            <Button
              onClick={() => navigate("/register")}
              variant="ghost"
              className="ml-2"
            >
              회원가입
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserNavbar;
