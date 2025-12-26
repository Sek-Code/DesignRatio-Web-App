import Checkbox from "./Checkbox";

const itemsHerbs = [
  { id: "herb-jasmine", name: "Jasmine", price: "+ 20" },
  { id: "herb-rose", name: "Rose Petals", price: "+ 20" },
  { id: "herb-mint", name: "Mint", price: "+ 10" },
  { id: "herb-chamomile", name: "Charmomile", price: "+ 30" },
  { id: "herb-chrysanthemum", name: "Chrysanthemum", price: "+ 10" },
  { id: "herb-lavender", name: "Lavender", price: "+ 40" },
  { id: "herb-lemongrass", name: "Lemon Grass", price: "+ 20" },
];

const ListBox1 = ({ selectedItems, onToggle, max }) => {
    return(
        <div className="w-80 bg-(--color-matcha) rounded-xl flex flex-col justify-center items-center px-10 py-5">
            <h3 className="text-white lg:text-2xl pb-2">Herbs</h3>

        {itemsHerbs.map((item) => {
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

            {/* <div className="flex justify-center items-center gap-x-5">
            <div className="flex flex-col justify-start items-start">
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
            </div>
            <div className="text-white">
                <p>Jasmine</p>
                <p>Rose Petals</p>
                <p>Mint</p>
                <p>Charmomile</p>
                <p>Chrysanthemum</p>
                <p>Lavender</p>
                <p>Lemon Grass</p>
            </div>
            <div className="text-white">
                <p>+ 20</p>
                <p>+ 20</p>
                <p>+ 10</p>
                <p>+ 30</p>
                <p>+ 10</p>
                <p>+ 40</p>
                <p>+ 20</p>
            </div>
            </div> */}
        </div>
    );
};

export default ListBox1;