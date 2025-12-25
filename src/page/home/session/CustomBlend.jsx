import { Button } from "@/components/ui/button"
import bgBlend from "@/assets/img/bg-blend-crop.png"
import { Link } from "react-router-dom"

export default function CustomBlend() {
    return(
        <div className="w-full bg-[#693714] flex flex-col items-center">
            <h1 className="text-white font-display text-6xl font-semibold mt-12 mb-6">Custom Blend</h1>
            <p className="text-white font-body w-[75%] mb-8" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                    quo fugit nobis rerum laborum beatae incidunt cupiditate facilis.
                    Distinctio doloremque nostrum est, blanditiis commodi esse quam
                    voluptatibus. Ullam, molestiae ratione quisquam officia aliquam
                    rerum accusantium exercitationem eum iste voluptates quo iusto dolor
                    necessitatibus? Earum laboriosam quis quaerat esse, voluptas
                    dignissimos.</p>
            <div className="relative w-full">
            <img src={bgBlend} alt="bg blend" className="w-full "/>
                <Link to="/blending" className="absolute top-[7%] left-1/2 -translate-x-1/2">
                <Button variant="secondary"  >
                    Blend Now
                </Button>
                 </Link>
            

            </div>
        </div>
    )
}

