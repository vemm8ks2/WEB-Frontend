import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Order from "@/pages/Order";
import OrderHistory from "@/pages/OrderHistory";
import UserNavbar from "@/components/navigator/UserNavbar";
import { useAuthStore } from "@/store/useAuthStore";
import Temp from "@/pages/Temp";

const UserRoutes = () => {
  const { data, setToken } = useAuthStore();

  useEffect(() => {
    setToken();
  }, [setToken]);

  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temp" element={<Temp />} />
        {data ? (
          <>
            <Route path="/order" element={<Order />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default UserRoutes;
