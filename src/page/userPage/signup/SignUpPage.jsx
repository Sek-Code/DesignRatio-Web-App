export default function SignUpPage() {
  return (
    <main className="mx-auto min-h-auto lg:max-w-237.5 px-12 md:px-8 pt-20 pb-16 flex-1">
      <h1 className="mb-12 lg:text-6xl">Sign up</h1>

      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-y-10 gap-x-0 md:gap-x-16">
        {/* <!-- Name --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Name :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Surname --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Surname :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">E-mail :</label>
          <input
            type="email"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Password :</label>
          <input
            type="password"
            className="block w-full bg-transparent border-b border-(--color-brown) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Password Confirm --> */}
        <div>
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Password Confirm :</label>
          <input
            type="password"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

                {/* <!-- tel-number --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Tel :</label>
          <input
            type="tel"
            className="block w-full bg-transparent border-b border-(--color-brown) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>

        {/* <!-- Address --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium h3-style lg:text-2xl">Address :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-(--brown-color) focus:outline-none focus:border-(--matcha-color) py-2"
          />
        </div>
      </form>

      {/* <!-- BUTTONS --> */}
      <div className="mt-14 flex justify-center gap-4">
        <input
         className="cursor-pointer py-2 px-8 lg:px-12 rounded-3xl lg:text-xl bg-(--color-brown) hover:bg-(--color-matcha) text-white font-medium shadow-md"
         type="submit"
         value="Login"
         onClick={() => (window.location.href = "/signin")} />

        <input
          className="cursor-pointer py-2 px-8 lg:px-12 rounded-3xl lg:text-xl bg-gray-300 hover:bg-(--color-matcha) text-white font-medium shadow-md"
          type="button"
          value="Sign Up"
          onClick={() => (window.location.href = "/account")} />
      </div>
    </main>
  );
}
