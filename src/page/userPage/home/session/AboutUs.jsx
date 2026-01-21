import { Button } from "@/components/ui/Button";

export default function AboutUs (){
    return (
        <div className="flex flex-col items-center lg:my-20 lg:mx-30 my-10 mx-20 w-auto h-auto lg:gap-y-5">
            <h1 className="text-(--color-matcha) mb-8 lg:text-6xl text-center">About Us</h1>
            <div className="w-full flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-center lg:h-100 gap-y-1 lg:gap-x-5">
              <div className="w-full h-auto flex justify-center items-center lg:w-2/5">
                <img src="about us pic.png" alt="about us" className="mb-10 rounded-tl-[35%] rounded-br-[35%] shadow-lg flex justify-center items-center w-[70%]" />
              </div>
              <div className="w-full h-auto flex flex-col justify-center items-center lg:w-3/5 lg:gap-y-5">
                <p className="text-left lg:text-xl">We curate thoughtfully crafted teas made from high-quality leaves, herbs, spices, and fruits sourced from trusted origins. Each blend is designed to deliver balance, depth, and a memorable sensory experience in every cup. Whether you’re seeking comfort, clarity, or a moment of calm, our teas invite you to slow down and savor something truly special.</p>
                <Button className="cursor-pointer px-10 py-2 mt-10 hover:bg-(--color-matcha) rounded-4xl lg:text-xl lg:py-6 lg:px-15 lg:rounded-[30px]">Find More</Button>
              </div>
            </div>
        </div>
    );
}