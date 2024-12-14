import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserNavbar from "@/components/navigator/UserNavbar";

const UserRoutes = () => {
  const { data } = useAuthStore();

  return (
    <>
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
    </>
  );
};

export default UserRoutes;
