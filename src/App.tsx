import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";
import UserRoutes from "@/components/routes/UserRoutes";
import Loader from "@/components/ui/Loader";

const AdminRoutes = lazy(() => import("@/components/routes/AdminRoutes"));

function App() {
  const { data, setToken } = useAuthStore();

  useEffect(() => {
    setToken();
  }, [setToken]);

  return (
    <Suspense fallback={<Loader className="text-zinc-400" />}>
      <Routes>
        <Route path="/*" element={<UserRoutes />}></Route>
        {data && <Route path="/admin/*" element={<AdminRoutes />}></Route>}
      </Routes>
    </Suspense>
  );
}

export default App;
