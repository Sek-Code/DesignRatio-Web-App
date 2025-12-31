import { useCounter } from "./cardContainer";
import { Button } from "../button";
import { teaProducts } from "@/mock-data/teaData";
import SizeChoose from "./sizeChoose/sizeScreen";
import { useState } from "react";

function CardItem({ product }) {
  const { count, increment, decrement } = useCounter();
  const [selectedSize, setSelectedSize] = useState(null)

  return (
    <div className=" w-66 h-auto mb-15 p-3 flex flex-col items-center">

      <div className="">
        <img
          src={product.img}
          alt={product.name}
          className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover"
        />
      </div>

      <h3 className="h3-style pt-5 pb-4 text-[#411D03] truncate w-full text-center ">
        {product.name}
      </h3>

      <SizeChoose
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize} />

        <p className="mt-3">
        Selected: {selectedSize || "—"}
        </p>
        <p>
        Price: {selectedSize
        ? product.sizes[selectedSize].price
        : "—"} baht
        </p>

      <div className="flex flex-row items-center gap-5 h3-style text-[#411D03] pb-5 ">
        <button
          className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8 active:bg-[#411D03] active:text-white"
          onClick={decrement}
        >
          <p>-</p>
        </button>
        <p>{count}</p>
        <button
          className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8 active:bg-[#411D03] active:text-white"
          onClick={increment}
        >
          <p>+</p>
        </button>
      </div>
      <Button variant="default" className=" bg-[#411D03] text-[#f3ece3] text-sm  ">
        Add to Cart
      </Button>
    </div>
  );
}

export default function CardScreen() {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-7">
      {teaProducts.map((item) => (
        <CardItem key={item.id || item.name} product={item} />
      ))}
    </div>
  );
}
