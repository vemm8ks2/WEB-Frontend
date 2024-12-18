import { Fragment } from "react/jsx-runtime";

import { SelectItem } from "@/components/ui/select";

import type { PreprocessedCategory } from "@/store/useCategoryStore";

const SelectCategories = ({
  categories,
  level = 0,
}: {
  categories: PreprocessedCategory[];
  level?: number;
}) => {
  const ml = `ml-${level * 2}`;

  return (
    <>
      {categories.map((category) => (
        <Fragment key={category.id}>
          <div className={`${ml}`}>
            <SelectItem value={category.id}>{category.name}</SelectItem>
          </div>
          <SelectCategories
            categories={category.childCategories}
            level={level + 1}
          />
        </Fragment>
      ))}
    </>
  );
};

export default SelectCategories;
