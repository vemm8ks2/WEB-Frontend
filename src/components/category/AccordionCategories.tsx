import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || undefined;

    let route = `/?category_id=${category.id}`;
    if (keyword) route += `&keyword=${keyword}`;

    navigate(route);
  };

  if (category.childCategories.length === 0) {
    return (
      <AccordionContent className={cn(`ml-${category.level * 2}`)}>
        <Button onClick={handleClick} variant="link" className="p-0">
          {category.name}
        </Button>
      </AccordionContent>
    );
  }

  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger
        onClick={handleClick}
        className={cn(`ml-${category.level * 2}`)}
      >
        {category.name}
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
