import { useEffect } from "react";
import { TrashIcon, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

export default function MemberTable() {
  const navigate = useNavigate();
  // ดึง functions และ state จาก store (loadUsers เรียก GET, removeUser เรียก DELETE)
  const { users, loading, loadUsers, removeUser } = useUserStore();

  // API Call #1: ดึงข้อมูลผู้ใช้ทั้งหมด (GET /api/v2/users/)
  // ทำงาน: เมื่อ component mount แรกครั้ง เรียก loadUsers() เพื่อดึงรายชื่อสมาชิก
  useEffect(() => {
    loadUsers();
  }, []);

  // API Call #2: ลบผู้ใช้ (DELETE /api/v2/users/:id)
  // ทำงาน: กดปุ่มลบ → แสดง confirm dialog → เรียก removeUser(id) เพื่อลบสมาชิก
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      // ← API DELETE ถูกเรียกที่นี่ผ่าน removeUser() function
      await removeUser(id);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-3">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="text-[#9e9957]">
          <tr className="text-center font-bold">
            <th className="p-2">Date Added</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* แสดงรายการสมาชิกจากข้อมูล API ที่ดึงมา */}
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="bg-[#f3ece3] text-center">
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="h-14 flex items-center justify-center">
                  <span className="inline-block text-left w-40 break-all">
                    {user.userName} {user.userLast}
                  </span>
                </td>
                <td className="text-left">{user.email}</td>
                <td className="pr-3">{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td className="gap-1 flex justify-center">
                  {/* ปุ่มแก้ไข - ไปหน้า EditMember (ไม่เรียก API ตรงนี้) */}
                  <button
                    onClick={() => navigate(`/admin/members/${user._id}`)}
                    className="hover:text-orange-600 transition"
                  >
                    <Edit />
                  </button>
                  {/* ปุ่มลบ - เรียก DELETE API */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="hover:text-red-600 transition"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
