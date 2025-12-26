import { useState } from "react";

export function Counter(){
    const [count, setCount] = useState(1)

    const increament = () => setCount(count => count + 1)
    const decreament = () => setCount(count => Math.max(count - 1, 1))


    return{
        count,
        increament,
        decreament
    }
}

