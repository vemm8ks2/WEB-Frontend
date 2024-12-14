import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icon/SearchIcon";
import { Separator } from "@/components/ui/separator";

const UserNavbar = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default UserNavbar;
