import Checkbox from "./Checkbox";

const ListBox3 = () => {
    return(
        <div className="w-80 bg-(--color-cream) rounded-xl flex flex-col justify-center items-center px-10 py-5 gap-y-2">
            <h3 className="text-(--color-brown) lg:text-2xl">Fruits</h3>
            <div className="flex justify-center items-center gap-x-5">
            <div className="flex flex-col justify-start items-start">
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <Checkbox />
            </div>
            <div className="text-(--color-brown)">
                <p>Bergamot</p>
                <p>Apple</p>
                <p>Peach</p>
                <p>Lemon Peel</p>
                <p>Orange Peel</p>
                <p>Cranberry</p>
                <p>Raspberry</p>
            </div>
            <div className="text-(--color-brown)">
                <p>+ 30</p>
                <p>+ 10</p>
                <p>+ 30</p>
                <p>+ 20</p>
                <p>+ 10</p>
                <p>+ 40</p>
                <p>+ 40</p>
            </div>
            </div>
        </div>
    );
};

export default ListBox3;