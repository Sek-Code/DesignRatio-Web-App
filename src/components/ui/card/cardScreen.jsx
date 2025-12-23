import { useState } from "react";


export default function CardScreen() {

    const [count, setCount] = useState(0);



    return (
        <div>
            <div className="flex flex-col items-center w-64 h-114">
                <div >
                    <img src="public/img/tea.jpg" className="w-60 h-60 rounded-tl-[35%] rounded-br-[35%] shadow-lg object-cover" />
                </div>
                <h3 className="h3-style pt-5 pb-4 text-[#411D03]">Tea</h3>
                <p className="p-style text-[#411D03] pb-5">Size S │ Size L</p>
                <div className="flex flex-row gap-5 h3-style text-[#411D03] pb-5">
                    <button
                        className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8"
                        onClick={() => {
                            setCount(prev => Math.max(prev-1,0))
                        }}>
                        <p>-</p>
                    </button>
                    <p>{count}</p>
                    <button
                        className="flex items-center justify-center border border-[#411D03] rounded-full w-8 h-8"
                        onClick={() => {
                            setCount(count + 1)
                        }}>
                        <p>+</p>
                    </button>
                </div>
                <button className="button-style bg-[#411D03] text-[#f3ece3] w-35 h-8 rounded-2xl">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}