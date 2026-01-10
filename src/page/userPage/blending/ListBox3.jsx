import Checkbox from "./Checkbox";

const itemsFruits = [
  { id: "fruits-bergamot", name: "Bergamot", price: "+ 30" },
  { id: "fruits-apple", name: "Apple", price: "+ 10" },
  { id: "fruits-peach", name: "Peach", price: "+ 30" },
  { id: "fruits-lemon peel", name: "Lemon Peel", price: "+ 20" },
  { id: "fruits-orange peel", name: "Orange Peel", price: "+ 10" },
  { id: "fruits-cranberry", name: "Cranberry", price: "+ 40" },
  { id: "fruits-raspberry", name: "Raspberry", price: "+ 40" },
];

const ListBox3 = ({ selectedItems, onToggle, max }) => {
    return(
        <div className="w-80 bg-(--color-cream) rounded-xl flex flex-col justify-center items-center px-10 py-5">
            <h3 className="text-(--color-brown) lg:text-2xl pb-2">Fruits</h3>

        {itemsFruits.map((item) => {
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
                <div className="text-(--color-brown)">{item.name}</div>
            </div>
            <div className="w-1/5 text-(--color-brown)">{item.price}</div>
          </div>
        );
        })}
        </div>
    )
};


export default ListBox3;