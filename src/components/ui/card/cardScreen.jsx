import { useCounter } from "./cardContainer";
import { Button } from "../button";
import SizeChoose from "./sizeChoose/sizeScreen";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

function CardItem({ product, onCardClick}) {
  const { count, increment, decrement } = useCounter();
  const [selectedSize, setSelectedSize] = useState(null)
  const addToCart = useCartStore((state) => state.addToCart);

  const resolvedImageSrc = (
    typeof product.image === "string" ? product.image.trim() : product.image
  ) || null;

  // แปลง variants → sizes object
  const sizes = product.variants?.reduce((acc, variant) => {
    acc[variant.size] = { 
      price: variant.price,
      gram: variant.gram
    };
    return acc;
  }, {}) || {};

  // Debug log
  useEffect(() => {
    console.log("Product:", product.name, {
      variants: product.variants,
      sizes: sizes,
      variantsLength: product.variants?.length || 0
    });
  }, [product]);

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
        {resolvedImageSrc ? (
          <img
            src={resolvedImageSrc}
            alt={product.name}
            className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover"
          />
        ) : (
          <div
            className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg bg-gray-100"
            role="img"
            aria-label={`${product.name} image unavailable`}
          />
        )}
      </div>

      <h3 className="h3-style pt-5 pb-4 text-(--color-brown) truncate w-full text-center ">
        {product.name}
      </h3>

      {Object.keys(sizes).length > 0 ? (
        <>
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
        </>
      ) : (
        <p className="text-red-500 text-sm mb-3">No sizes available</p>
      )}

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
        className="cursor-pointer bg-(--color-brown) text-white lg:text-base hover:bg-(--color-matcha)"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default function CardScreen({ product = [], onCardClick }) {
  return (
    <div className="flex flex-wrap justify-center items-center w-full gap-7">
      {product.map((item) => (
        <CardItem key={item._id || item.name} product={item}
        onCardClick={onCardClick}/>
      ))}
    </div>
  );
}
