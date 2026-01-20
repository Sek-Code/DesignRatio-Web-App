export default function signInPage() {
     return (
    <div className="max-w-xl mx-auto my-25">
      <form className="gap-4 px-9">
        <h1 className="text-6xl my-7 text-center h1-style">Log-in</h1>

        <div>
          {/* Email */}
          <div className="flex flex-col gap-2 text-lg">
            <label
              className="text-gray-600 font-bold inline-block pb-2 h3-style"
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
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-lg my-4">
            <label
              className="text-gray-600 font-bold inline-block pb-2 h3-style"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex my-6">
            <div className="w-1/2">
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe" className="ml-2">
                Remember me
              </label>
            </div>

            <div className="w-1/2 text-right">
              <a href="#">Forgot password</a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <input
              className="my-4 bg-[#989898] w-32 py-2 rounded-3xl text-white font-bold cursor-pointer hover:bg-yellow-950"
              type="submit"
              value="Login"
              onClick={() => (window.location.href = "/account")}
            />

            <input
              className="my-4 bg-[#411D03] w-32 py-2 rounded-3xl text-white font-bold cursor-pointer hover:bg-gray-600"
              type="button"
              value="Sign Up"
              onClick={() => (window.location.href = "/signup")}
            />
          </div>

          {/* Google */}
          <button
            type="button"
            className="bg-white w-full py-2 rounded-md text-[#411D03] font-bold flex items-center justify-center gap-3 border border-[#411D03] my-4"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
              className="w-4 h-4"
              alt="Google"
            />
            Log In with Google
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="bg-[#411D03] w-full py-2 rounded-md text-white font-bold flex items-center justify-center gap-3 my-4"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
              className="w-4 h-4"
              alt="Facebook"
            />
            Log In with Facebook
          </button>
        </div>
      </form>
    </div>
    )
}