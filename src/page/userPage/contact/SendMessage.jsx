import GenerationMap from "./GenerationMap";
import MessageForm from "./MessageForm";

export default function SendMessage(){
    return (
        <div className="w-full flex justify-center lg:gap-10 flex-wrap px-10 py-10 lg:my-10 lg:px-37.5">
            <GenerationMap/>
            <MessageForm/>
        </div>
    )
}