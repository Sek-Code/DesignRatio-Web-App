import Checkbox from "./Checkbox";

const ListBox1 = () => {
    return(
        <div className="w-80 bg-(--color-matcha) rounded-xl flex flex-col justify-center items-center px-10 py-5 gap-y-2">
            <h3 className="text-white lg:text-2xl">Herbs</h3>
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
            </div>
        </div>
    );
};

export default ListBox1;