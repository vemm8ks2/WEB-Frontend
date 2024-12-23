/**
 * 어드민 페이지는 아래 링크의 코드 기반으로 작성되었습니다.
 * https://github.com/luisFilipePT/shadcn-ui-theme-explorer/tree/main/app/%5Btheme%5D/dashboard
 */

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TotalSalesOfThisMonth from "@/components/dashboard/overview/total-sales-of-this-month";
import SignupUsersOfThisMonth from "@/components/dashboard/overview/signup-users-of-this-month";
import OrdersNumberOfThisMonth from "@/components/dashboard/overview/orders-number-of-this-month";
import RecentSales from "@/components/dashboard/overview/recent-sales";
import SellingQuantityForThisMonth from "@/components/dashboard/overview/selling-quantity-for-this-month";
import SalesOverview from "@/components/dashboard/overview/sales-overview";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            다운로드
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            분석
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            레포트
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            알림
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-4">
            <TotalSalesOfThisMonth />
            <SignupUsersOfThisMonth />
            <OrdersNumberOfThisMonth />
            <SellingQuantityForThisMonth />
          </div>
          <div className="grid gap-4 grid-cols-7">
            <SalesOverview />
            <RecentSales />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
