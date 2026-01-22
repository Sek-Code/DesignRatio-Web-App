import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ArrowLeft } from "lucide-react";

export default function AddAdmin() {
  const navigate = useNavigate();
  const { addUser, loading } = useUserStore();

  const [formData, setFormData] = useState({
    userName: "",
    userLast: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "admin",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

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

    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      // ← API PATCH ถูกเรียกที่นี่ผ่าน editUser() function
      const { confirmPassword: _, ...data } = formData;

      await addUser(data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/members");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create admin");
    }
  };

  const handleClear = () => {
    setFormData({
      userName: "",
      userLast: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      address: "",
    });

    setError(null);
    setSuccess(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <button
        onClick={() => navigate(`/admin/members`)}
        className="flex items-center gap-2 hover:text-(--color-brown) transition mb-6"
      >
        <ArrowLeft size={20} />
        Back to Members
      </button>

      <div className="relative w-32 mx-auto">
        <div className="mt-10 w-32 h-32 rounded-full border-2 border-(--color-brown) bg-gray-100 flex items-center justify-center overflow-hidden">
          <span className="text-gray-400">No Image</span>
        </div>
        <button
          type="button"
          className="absolute bottom-0.5 left-10 bg-white border rounded-full shadow hover:bg-(--color-brown) hover:text-white px-6 py-1"
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
          Admin created successfully! Redirecting...
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
            <label className="text-sm font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              minLength={6}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password Confirm:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              minLength={6}
              onChange={handleInputChange}
              placeholder="Enter phone number"
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
              pattern="[0-9]{10}"
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

        <div className="w-full flex gap-4 justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="button-style px-16 py-1.5 bg-amber-800 text-white rounded-3xl hover:bg-amber-900 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
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
