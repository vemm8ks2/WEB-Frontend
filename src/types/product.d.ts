import type { Category } from "@/types/category";

interface ProductOption {
  id: number;
  stock: number;
  size: string;
}

export interface Product {
  active: boolean;
  category: Category;
  id: number;
  imageUrl: string;
  price: number;
  productOptions: ProductOption[];
  title: string;
}
