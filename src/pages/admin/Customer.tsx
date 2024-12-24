import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dateFormat from "@/utils/date-format";

const Customer = () => {
  const { data: auth } = useAuthStore();
  const { data, getCustomer, isLoading } = useCustomerStore();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!auth) return;
    getCustomer({ token: auth.token, page: currentPage });
  }, [auth, currentPage, getCustomer]);

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
                {data && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                          variant="link"
                          disabled={currentPage <= 0}
                          className="gap-1 pl-2.5"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>이전</span>
                        </Button>
                      </PaginationItem>
                      {Array.from({ length: data.totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <Button
                            onClick={() => setCurrentPage(i)}
                            variant={i === currentPage ? "default" : "link"}
                            className="rounded-full w-9 h-9"
                          >
                            {i + 1}
                          </Button>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <Button
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          variant="link"
                          disabled={data.totalPages - 1 <= currentPage}
                          className="gap-1 pr-2.5"
                        >
                          <span>다음</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Customer;
