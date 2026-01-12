import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MessageForm() {
    return (
        <div className="w-full md:w-[40%] text-center">
            <h2 className="pb-5">Send us a message</h2>
            <form className="flex flex-col items-center gap-5">
                <div className="w-full text-left" > 
            <label htmlFor="name" >Name:</label>
            <Input type="text" id="name" placeholder="your name" className="mt-3"/>
            </div><div className="w-full text-left">
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" placeholder="your email" className="mt-3" />
            </div><div className="w-full text-left">
            <label htmlFor="message">Message:</label>
            <Textarea id="message" placeholder="your message" className="mt-3"/>
                </div>
            <Button variant="default" type="sumbit" >Send</Button>
            </form>
            
        </div>
    )
}