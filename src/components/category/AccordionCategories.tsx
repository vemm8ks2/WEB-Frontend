import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ICategory {
  id: string;
  name: string;
  parentId: string;
  level: number;
  children: ICategory[]; // 자식 카테고리들
}

const categoryList: ICategory[] = [
  { id: "1", name: "신발", parentId: "0", level: 0, children: [] },
  { id: "1--1", name: "스니커즈", parentId: "1", level: 1, children: [] },
  { id: "1--2", name: "구두", parentId: "1", level: 1, children: [] },
  { id: "1--3", name: "샌들/슬리퍼", parentId: "1", level: 1, children: [] },
  { id: "1--4", name: "부츠/워커", parentId: "1", level: 1, children: [] },
  {
    id: "1--1--2",
    name: "캔버스/단화",
    parentId: "1--1",
    level: 2,
    children: [],
  },
  {
    id: "1--1--3",
    name: "스니커즈 뮬",
    parentId: "1--1",
    level: 2,
    children: [],
  },
  { id: "1--1--4", name: "슬립온", parentId: "1--1", level: 2, children: [] },
  {
    id: "1--1--5",
    name: "패션스니커즈화",
    parentId: "1--1",
    level: 2,
    children: [],
  },
  {
    id: "1--2--1",
    name: "더비 슈즈",
    parentId: "1--2",
    level: 2,
    children: [],
  },
  {
    id: "1--2--2",
    name: "몽크 스트랩",
    parentId: "1--2",
    level: 2,
    children: [],
  },
  { id: "1--3--1", name: "클로그", parentId: "1--3", level: 2, children: [] },
  {
    id: "1--3--2",
    name: "쪼리/플립플랍",
    parentId: "1--3",
    level: 2,
    children: [],
  },
  {
    id: "1--3--3",
    name: "스포츠/캐주얼 샌들",
    parentId: "1--3",
    level: 2,
    children: [],
  },
  { id: "1--4--1", name: "롱 부츠", parentId: "1--4", level: 2, children: [] },
  {
    id: "1--4--2",
    name: "니하이 부츠",
    parentId: "1--4",
    level: 2,
    children: [],
  },
];

// 카테고리 데이터를 트리 형태로 변환하는 함수
const transformToTree = (categories: ICategory[]): ICategory[] => {
  const categoryMap: { [key: string]: ICategory } = {};

  //카테고리 맵핑: id를 기준으로 카테고리를 맵에 추가
  categories.forEach((category) => {
    categoryMap[category.id] = category;
  });

  // 부모-자식 관계 설정
  categories.forEach((category) => {
    const parentId = category.parentId;
    if (parentId !== "0") {
      // 부모가 있을 경우 부모의 children 배열에 자식 추가
      categoryMap[parentId].children?.push(categoryMap[category.id]);
    }
  });

  // 최상위 카테고리만 반환 (parentId가 "0")
  return categories
    .filter((category) => category.parentId === "0")
    .map((category) => categoryMap[category.id]);
};

const categoryTree = transformToTree(categoryList);

const AccordionCategories = () => {
  return (
    <Accordion type="multiple" className="w-full">
      {categoryTree.map((category) => (
        <AccordionCategory category={category} />
      ))}
    </Accordion>
  );
};

const AccordionCategory = ({ category }: { category: ICategory }) => {
  if (category.children.length === 0) {
    return (
      <AccordionContent className={`ml-${category.level * 2}`}>
        <a href="#" className="hover:underline">
          {category.name}
        </a>
      </AccordionContent>
    );
  }

  return (
    <AccordionItem value={category.id} className="border-0">
      <AccordionTrigger className={`ml-${category.level * 2}`}>
        <a href="#">{category.name}</a>
      </AccordionTrigger>
      <AccordionContent className="last:pb-0">
        {category.children.map((category) => (
          <AccordionCategory category={category} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionCategories;
