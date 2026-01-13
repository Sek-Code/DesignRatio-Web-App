import Checkbox from "./Checkbox";

const itemsSpices = [
  { id: "spices-cinnamon", name: "Cinnamon", price: "+ 30" },
  { id: "spices-cloves", name: "Cloves", price: "+ 20" },
  { id: "spices-cardamon", name: "Cardamon", price: "+ 30" },
  { id: "spices-ginger", name: "Ginger", price: "+ 10" },
  { id: "spices-star anise", name: "Star Anise", price: "+ 20" },
  { id: "spices-nutmeg", name: "Nutmeg", price: "+ 40" },
  { id: "spices-black pepper", name: "Black Pepper", price: "+ 20" },
];

const ListBox2 = ({ selectedItems, onToggle, max }) => {
    return(
        <div className="w-80 bg-(--color-brown) rounded-xl flex flex-col justify-center items-center px-10 py-5">
            <h3 className="text-white lg:text-2xl pb-2">Spices</h3>

        {itemsSpices.map((item) => {
        const checked = selectedItems.includes(item.id);
        const disabled = !checked && selectedItems.length >= max;

        return (
          <div key={item.id} className="w-full flex justify-between gap-x-5">
            <div className="w-4/5 flex justify-start gap-x-5">
                <Checkbox
                checked={checked}
                disabled={disabled}
                onChange={() => onToggle(item.id)}
                />
                <div className="text-white">{item.name}</div>
            </div>
            <div className="w-1/5 text-white">{item.price}</div>
          </div>
        );
        })}
        </div>
    )
};


export default ListBox2;