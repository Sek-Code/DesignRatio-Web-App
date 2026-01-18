import { useCounter } from "./cardContainer";
import { Button } from "../button";
import { teaProducts } from "@/mock-data/teaData";
import SizeChoose from "./sizeChoose/sizeScreen";
import { useState } from "react";

function CardItem({ product }) {
  const { count, increment, decrement } = useCounter();
  const [selectedSize, setSelectedSize] = useState(null)

  return (
    <div className="w-66 h-auto my-4 p-3 flex flex-col items-center gap-y-4">

      <div>
        <img
          src={product.img}
          alt={product.name}
          className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover"
        />
      </div>

      <h3 className="lg:text-2xl pt-5 pb-4 text-(--color-brown) truncate w-full text-center ">
        {product.name}
      </h3>

      <SizeChoose
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize} />

        <p className="lg:text-xl">
        Selected: {selectedSize || "—"}
        </p>
        <p className="mb-3 lg:text-xl">
        Price: {selectedSize
        ? product.sizes[selectedSize].price
        : "—"} baht
        </p>

      <div className="flex flex-row items-center gap-5 h3-style text-(--color-brown) pb-5 ">
        <button
          className="flex items-center justify-center border border-(--color-brown) rounded-full w-8 h-8 active:bg-(--color-brown) active:text-white"
          onClick={decrement}
        >
          <p>-</p>
        </button>
        <p>{count}</p>
        <button
          className="flex items-center justify-center border border-(--color-brown) rounded-full w-8 h-8 active:bg-(--color-brown) active:text-white"
          onClick={increment}
        >
          <p>+</p>
        </button>
      </div>
      <Button className="px-6 py-2 rounded-4xl lg:text-base lg:py-5 lg:px-8 lg:rounded-[30px] hover:bg-(--color-matcha)">
        Add to Cart
      </Button>
    </div>
  );
}

export default function CardScreen() {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-4">
      {teaProducts.map((item) => (
        <CardItem key={item.id || item.name} product={item} />
      ))}
    </div>
  );
}
