import { Route, Routes } from "react-router-dom";

import UserRoutes from "@/components/routes/UserRoutes";
import AdminRoutes from "@/components/routes/AdminRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { data, setToken } = useAuthStore();

  useEffect(() => {
    setToken();
  }, [setToken]);

  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />}></Route>
      {data && <Route path="/admin/*" element={<AdminRoutes />}></Route>}
    </Routes>
  );
}

export default App;
