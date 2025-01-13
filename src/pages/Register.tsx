import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { Gender, useAuthStore } from "@/store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";

import type { FormEvent } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, signup } = useAuthStore();

  const [invalid, setInvalid] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const birthDate = formData.get("birthDate")?.toString();
    const gender = formData.get("gender")?.toString() as Gender | undefined;

    if (!username || !password) {
      setInvalid(true);
      return;
    }

    const res = await signup({ username, password, birthDate, gender });

    if (res) navigate("/login");
  };

  return (
    <main className="w-full min-h-[calc(100vh-4rem-44px)] flex justify-center items-center">
      <Card className="w-96 border-0 shadow-lg">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            회원가입을 위한 정보를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="birthDate">생일</Label>
                  <Input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="생일을 입력해주세요."
                    className="block"
                  />
                </div>
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="gender">성별</Label>
                  <Select name="gender">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="성별을 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="MALE">남성</SelectItem>
                        <SelectItem value="FEMALE">여성</SelectItem>
                        <SelectItem value="OTHER">기타</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {invalid && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>회원가입 실패</AlertTitle>
                  <AlertDescription>
                    아이디와 비밀번호는 필수 입력사항입니다.
                  </AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5"
              >
                {isLoading ? <Loader /> : <>회원가입</>}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 justify-between">
          <div className="w-full flex items-center justify-end">
            <p className="text-sm">계정이 이미 있으신가요?</p>
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              className="p-2 ml-2"
            >
              로그인
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Register;
