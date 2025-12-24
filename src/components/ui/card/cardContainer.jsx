import { useState } from "react";

export function Counter(){
    const [count, setCount] = useState(0)

    const increament = () => setCount(count => count + 1)
    const decreament = () => setCount(count => Math.max(count - 1, 0))


    return{
        count,
        increament,
        decreament
    }
}

