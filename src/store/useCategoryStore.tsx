import { create } from "zustand";

interface ResponseCategory {
  id: string;
  name: string;
  level: number;
  parentCategory: ResponseCategory | null;
}

export interface PreprocessedCategory {
  id: string;
  name: string;
  level: number;
  parentCategoryId: string;
  childCategories: PreprocessedCategory[];
}

interface State {
  categories: PreprocessedCategory[];
  isLoading: boolean;
  getCategories: () => void;
}

export const useCategoryStore = create<State>((set) => ({
  categories: [],
  isLoading: false,
  getCategories: async () => {
    set({ isLoading: true });

    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/public/category`;

      const res = await fetch(endpoint);
      const categories: ResponseCategory[] = await res.json();

      set({ categories: categorized(categories) });
    } catch (e) {
      console.log(e);
    }

    set({ isLoading: false });
  },
}));

const categorized = (data: ResponseCategory[]) => {
  const mapped: { [key: string]: PreprocessedCategory } = {};
  const organized: PreprocessedCategory[][] = [];

  data.forEach((category) => {
    const preprocessed: PreprocessedCategory = {
      id: category.id,
      level: category.level,
      name: category.name,
      parentCategoryId: category.parentCategory
        ? category.parentCategory.id
        : "0",
      childCategories: [],
    };

    mapped[preprocessed.id] = preprocessed;

    if (organized[preprocessed.level])
      organized[preprocessed.level].push(preprocessed);
    else organized[preprocessed.level] = [preprocessed];
  });

  const rootCategories: PreprocessedCategory[] = [];

  organized.reverse().forEach((categries) => {
    categries.forEach((category) => {
      if (category.level === 0) {
        rootCategories.push(mapped[category.id]);
      } else {
        mapped[category.parentCategoryId].childCategories.push(category);
      }
    });
  });

  return rootCategories;
};
