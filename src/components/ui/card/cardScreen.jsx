import { useCounter } from "./cardContainer";

function CardItem({ product }) {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="w-64">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover"
        />
      </div>
      <h3 className="h3-style pt-5 pb-4 text-[#411D03] line-clamp-2">
        {product.title}
      </h3>
      <p className="p-style text-[#411D03] pb-5">Size S | Size L</p>
      <p>{product.price} bath</p>
      <div className="flex flex-row gap-5 h3-style text-[#411D03] pb-5">
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
      <button className="button-style bg-[#411D03] text-[#f3ece3] w-35 h-8 rounded-2xl">
        Add to Cart
      </button>
    </div>
  );
}

export default function CardScreen({ product }) {
  return (
    <div className="flex items-center w-64 h-114 gap-7">
      {product.map((item) => (
        <CardItem key={item.id || item.title} product={item} />
      ))}
    </div>
  );
}
