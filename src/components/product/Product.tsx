import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Product = () => {
  const handleCart = () => {};

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <AspectRatio ratio={3 / 4}>
          <img
            src="https://image.msscdn.net/thumbnails/images/goods_img/20200226/1324098/1324098_17026249069423_big.jpg?w=1200"
            className="w-full h-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent>
        <p className="leading-7">
          우먼즈 크롭 스웨트셔츠 [스카이 블루]
          <br />
          27,900원
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCart} className="w-full">
          장바구니 담기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
