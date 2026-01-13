import { useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount((value) => value + 1);
  const decrement = () => setCount((value) => Math.max(value - 1, 1));


  return {
    count,

    increment,
    decrement,
  };
}

