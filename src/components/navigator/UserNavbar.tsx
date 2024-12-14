import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon, UserIcon } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icon/SearchIcon";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const UserNavbar = () => {
  const navigate = useNavigate();

  const { data, signout } = useAuthStore();

  return (
    <div className="flex justify-between gap-6 items-center min-h-16 px-8 shadow-lg sticky top-0 bg-white z-20">
      <h1>
        <Button variant="ghost" onClick={() => navigate("/")}>
          LOGO
        </Button>
      </h1>
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
      {data ? (
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="w-10 h-10 rounded-full">
                <ShoppingCartIcon className="text-zinc-700" />
              </Button>
            </SheetTrigger>
            <SheetContent></SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-10 h-10 rounded-full">
                <UserIcon className="text-zinc-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
  );
};

export default UserNavbar;
