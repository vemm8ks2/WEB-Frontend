import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, signin } = useAuthStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      return;
    }

    signin({ username, password });
    navigate("/");
  };

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Card className="w-96 border-0 shadow-lg">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  placeholder="아이디를 입력해주세요."
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="passowrd">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  required
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5"
              >
                {isLoading ? <Loader /> : <>로그인</>}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 justify-between">
          <div className="w-full flex items-center justify-end">
            <p className="text-sm">계정이 없으신가요?</p>
            <Button
              onClick={() => navigate("/register")}
              variant="ghost"
              className="p-2 ml-2"
            >
              회원가입
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;
