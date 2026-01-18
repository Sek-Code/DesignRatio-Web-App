import ListBox1 from "./ListBox1";
import ListBox2 from "./ListBox2";
import ListBox3 from "./ListBox3";
import BlendingIntro from "./BlendingIntro";
import BlendingSteps from "./BlendingSteps";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BlendingPage() {

    const size = 4; // เปลี่ยนเป็น dynamic ได้ทีหลัง

    const [selectedItems, setSelectedItems] = useState([]);

    const toggleItem = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= size) {
        return prev;
      }

      return [...prev, id];
    });
  };

    return (
        <div className="flex flex-col justify-center items-center gap-y-7 px-10 py-10 mb-10 lg:px-37.5">
            <BlendingIntro />
            <BlendingSteps />
            <h3 className="w-full text-left text-2xl font-bold mb-4 lg:text-2xl" style={{ color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}>Step 3: Choose Your Ingredients ({selectedItems.length}/{size})</h3>
            <div className="flex flex-col justify-center items-center gap-y-5 lg:flex-row lg:gap-x-5">
                <div><ListBox1
                    selectedItems={selectedItems}
                    onToggle={toggleItem}
                    max={size} /></div>
                <div><ListBox2
                    selectedItems={selectedItems}
                    onToggle={toggleItem}
                    max={size} /></div>
                <div><ListBox3
                    selectedItems={selectedItems}
                    onToggle={toggleItem}
                    max={size} /></div>
            </div>
            <div className="gap-y-1 text-gray-400 lg:text-xl flex flex-col justify-center items-center pl-5">
            <p>** When it comes to herbs, less is more. Adding too much causes a tea to have a very unpleasant flavor</p>
            </div>
            <Button className="px-10 py-2 mt-3 hover:bg-(--color-matcha) rounded-4xl lg:text-xl lg:py-6 lg:px-15 lg:rounded-[30px] ">Add to Cart</Button>
        </div>
    );
};