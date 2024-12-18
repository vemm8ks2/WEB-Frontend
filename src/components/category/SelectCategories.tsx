import { Fragment } from "react/jsx-runtime";

import { cn } from "@/lib/utils";
import { SelectItem } from "@/components/ui/select";

import type { PreprocessedCategory } from "@/store/useCategoryStore";

const SelectCategories = ({
  categories,
  level = 0,
}: {
  categories: PreprocessedCategory[];
  level?: number;
}) => {
  return (
    <>
      {categories.map((category) => (
        <Fragment key={category.id}>
          <div className={cn(`ml-${level * 2}`)}>
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
