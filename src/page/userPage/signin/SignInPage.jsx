import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignInPage() {

  const navigate = useNavigate();
  const {  loginUser, loading, currentUser, } = useUserStore();
  //  const [authLoading, setAuthLoading] = useState(true);
  // const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      navigate(`/account/${currentUser._id}`);
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
      email: "",
      password: "",
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

      const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
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

    try {
      // ← API PATCH ถูกเรียกที่นี่ผ่าน editUser() function

      await loginUser(formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 1500);

    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };


     return (
    <div className="max-w-xl mx-auto my-25">
      <form className="px-9" onSubmit={handleLogin}>
        <h1 className="lg:text-6xl my-7 text-center h1-style">Log-in</h1>

        <div className="gap-4">
          {/* Email */}
          <div className="flex flex-col gap-4 text-lg">
            <label
              className="text-(--color-brown) font-bold inline-block h3-style lg:text-2xl"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2 placeholder-h3-style"
              type="email"
              name="email"
              id="email"
              placeholder="Example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-lg my-4 gap-4">
            <label
              className="text-(--color-brown) font-bold inline-block h3-style lg:text-2xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              minLength={6}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Remember + Forgot
          <div className="flex my-6">
            <div className="w-1/2">
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe" className="ml-2">
                Remember me
              </label>
            </div>

            <div className="w-1/2 text-right">
              <a href="#" className="hover:underline cursor-pointer">Forgot password</a>
            </div>
          </div> */}

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              className="my-4 w-32 py-2 rounded-3xl text-white font-bold cursor-pointer bg-(--color-matcha)"
              type="submit"

              disabled={loading}

            >{loading ? "loading..." : "Login"}</button>

            <input
              className="my-4 bg-(--color-brown) w-32 py-2 rounded-3xl text-white font-bold cursor-pointer hover:bg-(--color-matcha)"
              type="button"
              value="Sign Up"
              onClick={() => navigate("/signup")}
            />
          </div>

          {/* Google */}
          {/* <button
            type="button"
            className="cursor-pointer bg-white w-full py-2 rounded-md text-(--color-brown) font-bold flex items-center justify-center gap-3 border border-(--color-brown) my-4 hover:bg-(--color-brown) hover:text-white"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
              className="w-4 h-4"
              alt="Google"
            />
            Log In with Google
          </button> */}

          {/* Facebook */}
          {/* <button
            type="button"
            className="cursor-pointer bg-(--color-brown) w-full py-2 rounded-md text-white font-bold flex items-center justify-center gap-3 my-4 hover:bg-(--color-matcha)"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              className="w-4 h-4"
              alt="Facebook"
            />
            Log In with Facebook
          </button> */}

        </div>
      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Login successfully! Redirecting...
        </div>
      )}


      </form>
    </div>
    )
}