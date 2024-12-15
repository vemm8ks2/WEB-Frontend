import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Option from "@/components/product/Option";

import type { Product } from "@/store/useProductStore";

const Product = ({ product }: { product: Product }) => {
  console.log(product);

  return (
    <Card className="shadow-lg border-0 flex flex-col">
      <CardHeader>
        <AspectRatio ratio={3 / 4}>
          <img
            src={product.imageUrl}
            className="w-full h-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <div className="flex flex-col justify-between flex-1">
        <CardContent>
          <p className="leading-7">
            {product.title}
            <br />
            {product.price.toLocaleString()}원
          </p>
        </CardContent>
        <CardFooter>
          <Option
            productId={product.id}
            productOptions={product.productOptions}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default Product;
