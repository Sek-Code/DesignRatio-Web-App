import { useState } from "react";

const CounterAddInCart = () => {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1)
    }

    const decrease = () => {
        setCount(count -1 )
    }

}