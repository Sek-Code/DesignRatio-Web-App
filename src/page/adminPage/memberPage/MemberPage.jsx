import { Button } from "@/components/ui/button";
import MemberTable from "./MemberTable";
import { Link } from "react-router-dom";

export default function MemberPage() {
    return (
        <div className="w-full px-[7%] py-12">
            <div className="w-full flex justify-between items-center">
            <h1>Members</h1>
            <Link to="/admin/members/add-admin">
            <Button variant="default"> Add Admin</Button>
            </Link>
            </div>
            <MemberTable/>
        </div>
    )
}
