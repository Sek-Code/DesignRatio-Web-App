import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GithubLogo from "@/components/ui/GithubLogo"; // Import the GithubLogo component
import FacebookLogo from "@/components/ui/FacebookLogo"; // Import the FacebookLogo component

export default function MemberCard(member) {
  const item = member.member;
  return (
    <Card className="rounded-sm w-85 h-70 flex flex-col items-center">
      <div>
        <img
          src={item.picture}
          className="w-26 h-26 rounded-full border object-cover"
        />
      </div>
      <CardTitle>{item.name}</CardTitle>
      <CardContent>
        <p>{item.text}</p>
      </CardContent>
      <CardFooter className="flex gap-2"> {/* Added flex and gap for spacing */}
        <div className="w-full flex justify-center items-center gap-x-3">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-7 h-7">
               <GithubLogo className="w-5.5 h-5.5" /> {/* Use the GithubLogo component */}
            </a>
            {item.facebookLink && ( // Conditionally render Facebook link if it exists
            <a href={item.facebookLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-7 h-7">
               <FacebookLogo className="w-6 h-6" style={{ fill: "var(--color-brown)" }} /> {/* Use the FacebookLogo component */}
            </a>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
