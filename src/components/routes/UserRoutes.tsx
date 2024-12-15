import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserNavbar from "@/components/navigator/UserNavbar";

const UserRoutes = () => {
  const { data, setToken } = useAuthStore();

  useEffect(() => {
    setToken();
  }, []);

  useEffect(() => {
    const fn = async () => {
      if (!data) return;

      const res = await fetch("http://localhost:5454/api/user/cart-item", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      console.log(res);
      const parsed = await res.json();
      console.log(parsed);
    };

    fn();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={data ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={data ? <Navigate to="/" /> : <Register />}
        ></Route>
      </Routes>
    </div>
  );
};

export default UserRoutes;
