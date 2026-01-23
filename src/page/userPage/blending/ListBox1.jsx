import Checkbox from "./Checkbox";

const ListBox1 = ({ title = "Herbs", items = [], selectedItems, onToggle, max }) => {
  return (
    <div className="w-80 bg-(--color-matcha) rounded-xl flex flex-col justify-center items-center px-10 py-5">
      <h3 className="text-white lg:text-2xl pb-2">{title}</h3>

      {items.length === 0 ? (
        <div className="w-full text-white/80 text-sm text-center py-4">No items</div>
      ) : (
        items.map((item) => {
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
              <div className="w-1/5 text-white">+ {item.price}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListBox1;
