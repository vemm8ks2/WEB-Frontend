import { Route, Routes } from "react-router-dom";

import UserRoutes from "@/components/routes/UserRoutes";
import AdminRoutes from "@/components/routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />}></Route>
      <Route path="/admin/*" element={<AdminRoutes />}></Route>
    </Routes>
  );
}

export default App;
