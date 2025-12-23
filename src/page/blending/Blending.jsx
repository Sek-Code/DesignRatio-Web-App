import Checkbox from "./Checkbox";
import ListBox1 from "./ListBox1";
import ListBox2 from "./ListBox2";
import ListBox3 from "./ListBox3";
import { Button } from "@/components/ui/button";

export default function Blending() {
    return (
        <div className="flex flex-col justify-center items-center gap-y-7 px-5 py-10 mb-16">
            <h3 className="w-full flex justify-center items-center text-center lg:text-2xl">Step 3: Choose Your Ingredients</h3>
            <div className="flex flex-col justify-center items-center gap-y-5 lg:flex-row lg:gap-x-5">
                <div><ListBox1 /></div>
                <div><ListBox2 /></div>
                <div><ListBox3 /></div>
            </div>
            <div className="gap-y-1 text-gray-400 lg:text-xl flex flex-col justify-center items-center pl-5">
            <p>** When it comes to herbs, less is more. Adding too much causes a tea to have a very unpleasant flavor</p>
            <p>** For size S, you have only 4 blending options, M: 5 blending options, L: 6 blending options</p>
            </div>
            <Button className="px-10 py-2 mt-3 hover:bg-(--color-matcha) rounded-4xl lg:text-xl lg:py-6 lg:px-15 lg:rounded-[30px] ">Add to Cart</Button>
        </div>
    );
};