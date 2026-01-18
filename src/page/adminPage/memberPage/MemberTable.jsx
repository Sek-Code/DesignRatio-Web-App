import { members } from "@/mock-data/userMockData";
import { TrashIcon, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MemberTable() {
  const navigate = useNavigate();
  const users = members;
  return (
    <div className="py-3 ">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="text-[#9e9957]">
          <tr className="text-center font-bold ">
            <th className=" p-2">Date Added</th>
            <th className=" p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className=" p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="bg-[#f3ece3] text-center ">
              <td>{user.createdAt}</td>
              <td className="h-14 flex items-center justify-center">
                <span className="inline-block text-left w-40 break-all">
                  {user.userName} {user.userLast}
                </span>
              </td>
              <td className="text-left">{user.email} </td>
              <td className="pr-3">{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td className="gap-1">
                <button key={user.userId}
                  onClick={() => navigate(`/admin/members/${user.userId}`)}
                >
                  <Edit />
                </button>
                <button>
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
