import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loader from "@/components/ui/Loader";

interface ResponseCategory {
  id: string;
  name: string;
  level: number;
  parentCategory: ResponseCategory | null;
}

interface PreprocessedCategory {
  id: string;
  name: string;
  level: number;
  parentCategoryId: string;
  childCategories: PreprocessedCategory[];
}

const AccordionCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<PreprocessedCategory[]>([]);

  useEffect(() => {
    const fn = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("http://localhost:5454/api/public/category");
        const data: ResponseCategory[] = await res.json();

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

        setCategories(rootCategories);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fn();
  }, []);

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
  const ml =
    category.level === 0
      ? "ml-0"
      : category.level === 1
      ? "ml-2"
      : category.level === 2
      ? "ml-4"
      : category.level === 3
      ? "ml-6"
      : "ml-8";

  if (category.childCategories.length === 0) {
    return (
      <AccordionContent className={ml}>
        <a href="#" className="hover:underline">
          {category.name}
        </a>
      </AccordionContent>
    );
  }

  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger className={ml}>
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
