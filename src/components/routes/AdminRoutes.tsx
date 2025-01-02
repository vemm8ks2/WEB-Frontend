import { lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Search } from "lucide-react";

import { useAdminValidateStore } from "@/store/useAdminValidateStore";
import { useAuthStore } from "@/store/useAuthStore";
import Dashboard from "@/pages/admin/Dashboard";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";

const Product = lazy(() => import("@/pages/admin/Product"));
const CreateProduct = lazy(() => import("@/pages/admin/CreateProduct"));
const Order = lazy(() => import("@/pages/admin/Order"));
const Customer = lazy(() => import("@/pages/admin/Customer"));
const Charts = lazy(() => import("@/pages/admin/Charts"));

const AdminRoutes = () => {
  const { data: auth, setToken } = useAuthStore();
  const { isLoading, checkAdmin } = useAdminValidateStore();

  const [isAdmin, setIsAdmin] = useState("INIT");

  useEffect(() => {
    setToken();
  }, [setToken]);

  useEffect(() => {
    (async () => {
      if (!auth) return;

      const result = await checkAdmin({ token: auth.token });

      if (result) setIsAdmin("ACCEPT");
      else setIsAdmin("DENY");
    })();
  }, [auth, checkAdmin]);

  if (isLoading || isAdmin === "INIT") return <></>;
  if (!auth || isAdmin === "DENY") return <Navigate to="/" />;

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
