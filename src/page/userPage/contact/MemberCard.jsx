import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MemberCard(member) {
  const item = member.member;
  return (
    <Card className="rounded-sm w-85 h-70 flex flex-col items-center">
      <div className="">
        <img
          src={item.picture}
          className="w-26 h-26 rounded-full border  object-cover"
        />
      </div>
      <CardTitle>{item.name}</CardTitle>

      <CardContent>
        <p>{item.text}</p>
      </CardContent>
      <CardFooter>
        <p>{item.link}</p>
      </CardFooter>
    </Card>
  );
}
