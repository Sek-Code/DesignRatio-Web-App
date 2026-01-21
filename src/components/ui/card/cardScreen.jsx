import { useCounter } from "./cardContainer";
import { Button } from "../button";
import { readyProducts } from "@/mock-data/readyProducts";
import SizeChoose from "./sizeChoose/sizeScreen";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

function CardItem({ product, onCardClick}) {
  const { count, increment, decrement } = useCounter();
  const [selectedSize, setSelectedSize] = useState(null)
  const addToCart = useCartStore((state) => state.addToCart);

  // แปลง variants → sizes object
  const sizes = product.variants?.reduce((acc, variant) => {
    acc[variant.size] = { 
      price: variant.price,
      gram: variant.gram
    };
    return acc;
  }, {}) || {};

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, count, selectedSize);
    alert("Added to cart!");
  };

  return (
    <div
      className="w-66 h-auto mb-15 p-3 flex flex-col items-center"
      onClick={() => {
        onCardClick?.(product);
      }}
    >
      <div className="">
        <img
          src={product.image}
          alt={product.name}
          className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover"
        />
      </div>

      <h3 className="h3-style pt-5 pb-4 text-[#411D03] truncate w-full text-center ">
        {product.name}
      </h3>

      <SizeChoose
        sizes={sizes}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <p>
        Selected: {selectedSize || "—"}
      </p>
      <p className="mb-3">
        Price: {selectedSize
        ? sizes[selectedSize].price
        : "—"} baht
      </p>

      <div className="flex flex-row items-center gap-5 h3-style text-[#411D03] pb-5 ">
        <button
          className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8 active:bg-[#411D03] active:text-white"
          onClick={(e) => {
            e.stopPropagation();
            decrement();
          }}
        >
          <p>-</p>
        </button>
        <p>{count}</p>
        <button
          className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8 active:bg-[#411D03] active:text-white"
          onClick={(e) => {
            e.stopPropagation();
            increment();
          }}
        >
          <p>+</p>
        </button>
      </div>
      <Button
        variant="default"
        className="bg-[#411D03] text-[#f3ece3] text-sm"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default function CardScreen({onCardClick}) {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-7">
      {readyProducts.map((item) => (
        <CardItem key={item._id || item.name} product={item}
        onCardClick={onCardClick}/>
      ))}
    </div>
  );
}
