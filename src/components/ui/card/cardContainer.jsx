import { useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount((value) => Math.min(value + 1, 5));
  const decrement = () => setCount((value) => Math.max(value - 1, 1));


  return {
    count,

    increment,
    decrement,
  };
}

