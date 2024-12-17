import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";

const AdminRoutes = () => {
  return (
    <div className="w-[1540px] mx-auto">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
