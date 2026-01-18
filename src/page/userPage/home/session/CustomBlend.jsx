import { Button } from "@/components/ui/Button"
import bgBlend from "@/assets/img/bg-blend-crop.png"
import { Link } from "react-router-dom"

export default function CustomBlend() {
    return(
        <div className="w-full bg-(--color-brown) flex flex-col items-center">
            <h1 className="text-white lg:text-6xl mt-12 mb-10">Custom Blend</h1>
            <p className="text-white w-[75%] mb-8 lg:text-xl" >
                Tea blending is the art of combining different types of teas—or even herbs, flowers, and spices—to craft a unique, balanced flavor profile. Rather than being a “cheap shortcut” blending allows tea makers to highlight strengths of one leaf while smoothing over the weaknesses of another. And the best part? Crafting your own blend lets you shape a tea that's truly personal—your mood, your story, your flavor. It's a chance to sip something no one else in the world has but you.</p>
            <div className="relative w-full">
            <img src={bgBlend} alt="bg blend" className="lg:w-full h-auto"/>
            <Link to="/blending" className="absolute top-[7%] left-1/2 -translate-x-1/2">
            <Button className="bg-(--color-matcha) hover:bg-(--color-cream) hover:text-(--color-brown) px-10 py-2 rounded-4xl lg:text-xl lg:py-6 lg:px-15 lg:rounded-[30px]"  >
                Blend Now
            </Button>
            </Link>
            </div>
        </div>
    )
}

