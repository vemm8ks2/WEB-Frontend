import { useEffect } from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loader from "@/components/ui/Loader";
import {
  PreprocessedCategory,
  useCategoryStore,
} from "@/store/useCategoryStore";

const AccordionCategories = () => {
  const { categories, isLoading, getCategories } = useCategoryStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (isLoading)
    return (
      <div className="flex justify-center py-4">
        <Loader className="text-zinc-500" />
      </div>
    );

  return (
    <Accordion type="multiple" className="w-full">
      {categories.map((category) => (
        <AccordionCategory key={category.id} category={category} />
      ))}
    </Accordion>
  );
};

const AccordionCategory = ({
  category,
}: {
  category: PreprocessedCategory;
}) => {
  if (category.childCategories.length === 0) {
    return (
      <AccordionContent className={cn(`ml-${category.level * 2}`)}>
        <a href="#" className="hover:underline">
          {category.name}
        </a>
      </AccordionContent>
    );
  }

  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger className={cn(`ml-${category.level * 2}`)}>
        <a href="#">{category.name}</a>
      </AccordionTrigger>
      <AccordionContent className="last:pb-0">
        {category.childCategories.map((category) => (
          <AccordionCategory key={category.id} category={category} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionCategories;
