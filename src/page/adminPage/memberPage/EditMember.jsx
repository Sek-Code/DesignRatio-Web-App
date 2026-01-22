import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  // ดึง functions และ state จาก store (editUser จะเรียก API PATCH /users/:id)
  const { users, editUser, loadUsers, loading } = useUserStore();

  const [formData, setFormData] = useState({
    userName: "",
    userLast: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // API Call #1: ดึงข้อมูลผู้ใช้ทั้งหมด (GET /api/v2/users/)
  // ทำงาน: เรียก loadUsers() ถ้า users array ยังว่าง
  useEffect(() => {
    if (!users.length) {
      loadUsers();
    }
  }, []);

  // API Call #2 (Indirect): ใช้ข้อมูลจาก API เพื่อหา user ตาม ID จาก URL
  // ทำงาน: ค้นหา user ในรายการ แล้ว populate form ด้วยข้อมูลเก่า
  useEffect(() => {
    const user = users.find((u) => u._id === id);
    if (user) {
      setFormData({
        userName: user.userName || "",
        userLast: user.userLast || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [users, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

  // API Call #3: ส่งข้อมูลแก้ไขไปยัง server (PATCH /api/v2/users/:id)
  // ทำงาน: เรียก editUser(id, formData) เมื่อกดปุ่ม Save
  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userName.trim() || !formData.userLast.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSaving(true);
    try {
      // ← API PATCH ถูกเรียกที่นี่ผ่าน editUser() function
      await editUser(id, formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/members");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to update member");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    const user = users.find((u) => u._id === id);
    if (user) {
      setFormData({
        userName: user.userName || "",
        userLast: user.userLast || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
    setError(null);
    setSuccess(false);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <div>Loading member data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <button
        onClick={() => navigate(`/admin/members`)}
        className="flex items-center gap-2 hover:text-amber-800 transition mb-6"
      >
        <ArrowLeft size={20} />
        Back to Members
      </button>

      <div className="relative w-32 mx-auto">
        <div className="mt-10 w-32 h-32 rounded-full border-4 border-amber-800 bg-gray-100 flex items-center justify-center overflow-hidden">
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <button
          type="button"
          className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white"
        >
          Upload
        </button>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Member updated successfully! Redirecting...
        </div>
      )}

      <form className="mt-20 space-y-6" onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">First Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last Name:</label>
            <input
              type="text"
              name="userLast"
              value={formData.userLast}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mobile Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="w-full mt-2 p-3 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800 resize-none"
            rows="4"
          ></textarea>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="button-style px-16 py-1.5 bg-amber-800 text-white rounded-3xl hover:bg-amber-900 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="button-style px-16 py-1.5 bg-gray-400 text-white rounded-3xl hover:bg-gray-500 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
