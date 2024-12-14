import { useNavigate } from "react-router-dom";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Card className="w-96 border-0 shadow-lg">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            회원가입을 위한 정보를 입력해주세요.
          </CardDescription>
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
              <div className="flex gap-2">
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="birthDate">생일</Label>
                  <Input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="생일을 입력해주세요."
                  />
                </div>
                <div className="flex flex-col space-y-2 flex-1">
                  <Label htmlFor="gender">성별</Label>
                  <Select>
                    <SelectTrigger id="gender" name="gender">
                      <SelectValue placeholder="성별을 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="others">기타</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 justify-between">
          <Button className="w-full py-5">회원가입</Button>
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
