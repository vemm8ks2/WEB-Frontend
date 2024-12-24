import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button variant="link">
        <a
          href="/admin"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          개요
        </a>
      </Button>
      <Button variant="link">
        <a
          href="/admin/product"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          상품목록
        </a>
      </Button>
      <Button variant="link">
        <a
          href="/admin/order"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          주문목록
        </a>
      </Button>
      <Button variant="link">
        <a
          href="/admin/customer"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          고객목록
        </a>
      </Button>
      <Button variant="link">
        <a
          href="/admin/charts"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          시각화
        </a>
      </Button>
    </nav>
  );
}
