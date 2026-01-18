import GenerationMap from "./GenerationMap";
import MessageForm from "./MessageForm";

export default function SendMessage(){
    return (
        <div className="w-full px-[5%] py-15 flex justify-center gap-10 flex-wrap">
            <GenerationMap/>
            <MessageForm/>
        </div>
    )
}