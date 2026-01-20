import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MessageForm() {
  return (
    <div className="w-full lg:w-[40%] text-center gap-y-5">
      <h2 className="pb-5 lg:text-4xl lg:pb-8">Send Us a Message</h2>
      <form className="flex flex-col items-center gap-5">
        <div className="w-full text-left">
          <label htmlFor="name" className="lg:text-2xl">Name :</label>
          <Input
            type="text"
            id="name"
            placeholder="your name"
            className="mt-3"
          />
        </div>
        <div className="w-full text-left">
          <label htmlFor="email" className="lg:text-2xl">Email :</label>
          <Input
            type="email"
            id="email"
            placeholder="your email"
            className="mt-3"
          />
        </div>
        <div className="w-full text-left">
          <label htmlFor="message" className="lg:text-2xl">Message :</label>
          <Textarea id="message" placeholder="your message" className="mt-3" />
        </div>
        <Button variant="default" type="sumbit" className="px-10 py-2 rounded-4xl lg:text-xl lg:py-4 lg:px-10 lg:rounded-[30px] hover:bg-(--color-matcha) lg:my-6">
          Send
        </Button>
      </form>
    </div>
  );
}
