export default function SizeChoose({
    sizes = {},
    selectedSize,
    onSelect
}) {
    return (
        <div className="w-full flex justify-around items-center">
            {Object.entries(sizes).map(([size, data],) =>{
                const isActive = selectedSize ===size;

            return(
            <button
            key={size}
            onClick={() => onSelect(selectedSize === size ? null : size)}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border
            ${isActive
            ?"border-(--color-brown) bg-(--color-brown) text-white"
            :"border-gray-300 text-(--color-brown)"}`}
            >
                <p>Size {size}</p>
                <p>{data.price} baht </p>
            </button>
            )
            })}
        </div>
    );
}
