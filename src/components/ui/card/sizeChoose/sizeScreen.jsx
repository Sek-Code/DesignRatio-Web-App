
export default function SizeChoose({ sizes }) {
    return (
        <div className="w-full flex justify-around pb-6 items-center">
            {Object.entries(sizes).map(([size, data],) =>(
            <div key={size} className="flex flex-col items-center">
                <p>Size {size}</p>
                <p>{data.price} bath </p>
            </div>
            ))}
        </div>
    )
}

