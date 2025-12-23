import Checkbox from "./Checkbox";

const ListBox2 = () => {
    return(
        <div className="w-80 bg-(--color-brown) rounded-xl flex flex-col justify-center items-center px-10 py-5 gap-y-2">
            <h3 className="text-white lg:text-2xl">Spices</h3>
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
                <p>Cinnamon</p>
                <p>Cloves</p>
                <p>Cardamon</p>
                <p>Ginger</p>
                <p>Star Anise</p>
                <p>Nutmeg</p>
                <p>Black Pepper</p>
            </div>
            <div className="text-white">
                <p>+ 30</p>
                <p>+ 20</p>
                <p>+ 30</p>
                <p>+ 10</p>
                <p>+ 20</p>
                <p>+ 40</p>
                <p>+ 20</p>
            </div>
            </div>
        </div>
    );
};

export default ListBox2;