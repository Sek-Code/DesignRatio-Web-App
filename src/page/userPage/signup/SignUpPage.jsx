import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {

  

  const navigate = useNavigate();
  const { addUser, loading, currentUser } = useUserStore();



useEffect(() => {
  if (currentUser) {
    navigate(`/account/${currentUser._id}`);
  }
}, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    userName: "",
    userLast: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "user",

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
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create user");
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
    <main className="mx-auto min-h-auto lg:max-w-237.5 px-12 md:px-8 pt-20 pb-16 flex-1">
      <h1 className="mb-12 lg:text-6xl">Sign up</h1>

      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-y-10 gap-x-0 md:gap-x-16" onSubmit={handleSave}>
        {/* <!-- Name --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Name :</label>
          <input
            type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Surname --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Surname :</label>
          <input
          type="text"
              name="userLast"
              value={formData.userLast}
              onChange={handleInputChange}
            required
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">E-mail :</label>
          <input
             type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Password :</label>
          <input
             type="password"
              name="password"
              value={formData.password}
              minLength={6}
              onChange={handleInputChange}
              required
            className="block w-full bg-transparent border-b border-(--color-brown) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Password Confirm --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Password Confirm :</label>
          <input
            type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              minLength={6}
              onChange={handleInputChange}
              required
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

                {/* <!-- tel-number --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Tel :</label>
          <input
            type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
            className="block w-full bg-transparent border-b border-(--color-brown) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Address --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Address :</label>
          <input
           name="address"
            value={formData.address}
            onChange={handleInputChange}
            type="text"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>
      

      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          User created successfully! Redirecting...
        </div>
      )}

      {/* <!-- BUTTONS --> */}
      <div className="mt-14 flex justify-center gap-4 col-span-1 md:col-span-2">
        {/* <input
         className="cursor-pointer py-2 px-8 lg:px-12 rounded-3xl lg:text-xl bg-(--color-brown) hover:bg-(--color-matcha) text-white font-medium shadow-md"
         type="submit"
         value="Login"
         onClick={() => (window.location.href = "/signin")} />

        <input
          className="cursor-pointer py-2 px-8 lg:px-12 rounded-3xl lg:text-xl bg-gray-300 hover:bg-(--color-matcha) text-white font-medium shadow-md"
          type="button"
          value="Sign UP"
          onClick={() => (window.location.href = "/account")} /> */}

        <button
            type="submit"
            disabled={loading}
            className="w-28 py-2 rounded-xl bg-(--color-brown) hover:bg-(--color-matcha) text-white font-medium shadow-md"
          >
            {loading ? "loading..." : "Sign up"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="w-28 py-2 rounded-xl bg-gray-400 hover:bg-gray-600 text-white font-medium shadow-md"
          >
            Clear
          </button>

      </div>
      </form>
    </main>
  );
}
