interface Category {
  id: string;
  level: number;
  name: string;
  parentCategory: Category | null;
}
