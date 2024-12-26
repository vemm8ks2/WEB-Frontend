import { Route, Routes } from "react-router-dom";
import { Search } from "lucide-react";

import Dashboard from "@/pages/admin/Dashboard";
import CreateProduct from "@/pages/admin/CreateProduct";
import Charts from "@/pages/admin/Charts";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import Customer from "@/pages/admin/Customer";
import Product from "@/pages/admin/Product";
import Order from "@/pages/admin/Order";

const AdminRoutes = () => {
  return (
    <div className="w-[1540px] mx-auto">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/order" element={<Order />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
