import MemberCard from "./MemberCard";
import { memberdata } from "../../../mock-data/memberMockData.js";

export default function ContactCard() {
    const  members  = memberdata;
    return (
        <div className="bg-[#9e9957] w-full py-10 px-[5%] flex flex-wrap gap-7 justify-center">
            {members.map((member) => <MemberCard key={member.id} member={member}/>)}
        </div>
    )
}