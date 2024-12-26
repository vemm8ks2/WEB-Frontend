import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

import type { Page } from "@/types/api";

interface Params<T> {
  data: Page<T>;
  callback: (params: { token: string; page?: number; size?: number }) => void;
}

export default function Pageable<T>({ data, callback }: Params<T>) {
  const { data: auth } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!auth) return;
    callback({ token: auth.token, page: currentPage });
  }, [auth, callback, currentPage]);

  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 3, data.totalPages);

  return (
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
        {currentPage > 2 && (
          <>
            <PaginationItem>
              <Button
                onClick={() => setCurrentPage(0)}
                variant="link"
                className="rounded-full w-9 h-9"
              >
                1
              </Button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((curr, i) => (
          <PaginationItem key={i}>
            <Button
              onClick={() => setCurrentPage(curr - 1)}
              variant={curr - 1 === currentPage ? "default" : "link"}
              className="rounded-full w-9 h-9"
            >
              {curr}
            </Button>
          </PaginationItem>
        ))}
        {currentPage < data.totalPages - 3 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => setCurrentPage(data.totalPages - 1)}
                variant="link"
                className="rounded-full w-9 h-9"
              >
                {data.totalPages}
              </Button>
            </PaginationItem>
          </>
        )}
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
  );
}
