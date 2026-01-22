import ProfilePic from "@/assets/img/kindpng_223965.jpg" ;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUserStore } from "@/store/userStore";


export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // ดึง functions และ state จาก store (editUser จะเรียก API PATCH /users/:id)
  const { users, editUser, loadUsers, loading, currentUser } = useUserStore();

  // Determine which user ID to use: from URL or from logged-in user
  const userId = id || currentUser?._id;

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

  // API Call #2 (Indirect): ใช้ข้อมูลจาก API เพื่อหา user ตาม ID จาก URL หรือ currentUser
  // ทำงาน: ค้นหา user ในรายการ แล้ว populate form ด้วยข้อมูลเก่า
  useEffect(() => {
    const user = users.find((u) => u._id === userId);
    if (user) {
      setFormData({
        userName: user.userName || "",
        userLast: user.userLast || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      });
    }
  }, [users, userId]);

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
      await editUser(userId, formData);
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
    const user = users.find((u) => u._id === userId);
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

  return (
    <div className="max-w-md mx-auto my-16 bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-center mb-6">
        <img
          src={ProfilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-matcha"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
            Profile updated successfully!
          </div>
        )}

        {/* First Name */}
        <div>
          <label className="block text-sm font-semibold text-(--color-brown)">
            First Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter first name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-matcha focus:border-transparent outline-none"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-(--color-brown)">
            Last Name
          </label>
          <input
            type="text"
            name="userLast"
            value={formData.userLast}
            onChange={handleInputChange}
            placeholder="Enter last name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-matcha focus:border-transparent outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-(--color-brown)">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-matcha focus:border-transparent outline-none"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-(--color-brown)">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-matcha focus:border-transparent outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-(--color-brown)">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            rows="4"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-matcha focus:border-transparent outline-none resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 bg-matcha text-white font-semibold py-2 rounded-3xl hover:bg-opacity-90 disabled:opacity-50 transition"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-gray-300 text-white font-semibold py-2 rounded-3xl hover:bg-(--color-brown) transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
