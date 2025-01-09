import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button variant="link" onClick={() => navigate("/admin")}>
        개요
      </Button>
      <Button variant="link" onClick={() => navigate("/admin/product")}>
        상품목록
      </Button>
      <Button variant="link" onClick={() => navigate("/admin/order")}>
        주문목록
      </Button>
      <Button variant="link" onClick={() => navigate("/admin/customer")}>
        유저목록
      </Button>
      <Button variant="link" onClick={() => navigate("/admin/charts")}>
        시각화
      </Button>
    </nav>
  );
}
