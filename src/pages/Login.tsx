import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Card className="w-96 border-0 shadow-lg">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="아이디를 입력해주세요."
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="passowrd">비밀번호</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 justify-between">
          <Button className="w-full py-5">로그인</Button>
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
