import { Button } from "@/components/ui/button";

export default function AboutUs (){
    return (
        <div className="flex flex-col items-center lg:my-20 lg:mx-30 my-10 mx-20 w-auto h-auto lg:gap-y-5">
            <h1 className="text-(--color-matcha) mb-8 lg:text-6xl">About Us</h1>
            <div className="w-full flex flex-col justify-center items-center lg:flex-row lg:justify-center lg:items-center lg:h-100 gap-y-1 lg:gap-x-5">
              <div className="w-full h-auto flex justify-center items-center lg:w-2/5">
                <img src="about us pic.png" alt="about us" className="mb-10 rounded-tl-[35%] rounded-br-[35%] shadow-lg flex justify-center items-center w-[70%]" />
              </div>
              <div className="w-full h-auto flex flex-col justify-center items-center lg:w-3/5 lg:gap-y-5">
                <p className="text-left lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, cumque quis delectus iste molestiae laboriosam pariatur natus doloribus eveniet eum a earum architecto sunt error labore ducimus, iure praesentium. Eum, cum. Natus, corporis! Fugiat quibusdam quia tenetur dicta accusamus veritatis perspiciatis voluptates quaerat dolores. Libero in adipisci dolores totam suscipit.</p>
                <Button className="px-10 py-2 mt-10 hover:bg-(--color-matcha) rounded-4xl lg:text-xl lg:py-7 lg:px-15 lg:rounded-[30px]">Find More</Button>
              </div>
            </div>
        </div>
    );
}