import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserNavbar from "@/components/navigator/UserNavbar";

const UserRoutes = () => {
  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
