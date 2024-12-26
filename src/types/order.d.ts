import { PaymentMethod } from "@/store/useOrderStore";

import type { Product } from "@/types/product";
import type { User } from "@/types/user";

interface OrderItem {
  id: number;
  price: number;
  product: Product;
  quantity: number;
  size: string;
}

interface Order {
  deliveredAt: Date;
  id: number;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
  receiverName: string | null;
  receiverPhone: string | null;
  shippingAddress: string;
  totalPrice: number;
  user: User;
}
