
export default function SizeChoose({
    sizes,
    selectedSize,
    onSelect}){
    return (
        <div className="w-full flex justify-around pb-6 items-center">
            {Object.entries(sizes).map(([size, data],) =>{
                const isActive = selectedSize ===size;

            return(
            <button
            key={size}
            onClick={() => onSelect(selectedSize === size ? null : size)}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border
            ${isActive
            ?"border-[#411D03] bg-[#411D03] text-white"
            :"border-gray-300 text-[#411D03]"}`}
            >
                <p>Size {size}</p>
                <p>{data.price} bath </p>
            </button>
            )
            })}
        </div>
    )
}

