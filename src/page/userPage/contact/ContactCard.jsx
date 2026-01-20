import MemberCard from "./MemberCard";
import { memberdata } from "../../../mock-data/memberMockData.js";

export default function ContactCard() {
    const  members  = memberdata;
    return (
        <div className="bg-(--color-matcha) w-full flex flex-wrap gap-7 justify-center px-10 py-10 lg:px-37.5 lg:py-15">
            {members.map((member) => <MemberCard key={member.id} member={member}/>)}
        </div>
    )
}