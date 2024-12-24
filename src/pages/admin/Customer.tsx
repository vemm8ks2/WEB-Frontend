import { useEffect } from "react";

import { useCustomerStore } from "@/store/admin/useCustomerStore";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/ui/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dateFormat from "@/utils/date-format";
import Pageable from "@/components/common/Pageable";

const Customer = () => {
  const { data: auth } = useAuthStore();
  const { data, getCustomer, isLoading } = useCustomerStore();

  useEffect(() => {
    if (!auth) return;
    getCustomer({ token: auth.token });
  }, [auth, getCustomer]);

  return (
    <Card className="max-w-screen-md mx-auto border-0 shadow-lg">
      <CardHeader>
        <CardTitle>유저 목록</CardTitle>
        <CardDescription>
          유저의 아이디와 성별, 생일, 가입일 데이터를 보여줍니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>아이디</TableHead>
              <TableHead className="text-center">성별</TableHead>
              <TableHead className="text-center">생일</TableHead>
              <TableHead className="text-center">가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.content.map((user) => (
                  <TableRow key={user.id} className="[&>td]:py-3">
                    <TableCell className="font-medium text-ellipsis">
                      {user.username}
                    </TableCell>
                    <TableCell className="text-center">{user.gender}</TableCell>
                    <TableCell className="text-center">
                      {user.birthDate
                        ? dateFormat({
                            date: new Date(user.birthDate),
                            hasTime: false,
                          })
                        : "정보 없음"}
                    </TableCell>
                    <TableCell className="text-center">
                      {dateFormat({ date: new Date(user.createdAt) })}
                    </TableCell>
                  </TableRow>
                ))
              : isLoading && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Loader className="text-zinc-400 mx-auto my-4" />
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell colSpan={4}>
                {data && <Pageable data={data} callback={getCustomer} />}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Customer;
