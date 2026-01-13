export default function SignUpPage() {
  return (
    <main className="mx-auto w-full lg:max-w-[980px] px-4 md:px-8 pt-20 pb-16 flex-1">
      <h1 className="font-['Playfair_Display'] mb-12">Sign up</h1>

      <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {/* <!-- Name --> */}
        <div>
          <label className="block mb-2 font-medium">Name :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Surname --> */}
        <div>
          <label className="block mb-2 font-medium">Surname :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">E-mail :</label>
          <input
            type="email"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <label className="block mb-2 font-medium">Password :</label>
          <input
            type="password"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Password Confirm --> */}
        <div>
          <label className="block mb-2 font-medium">Password Confirm :</label>
          <input
            type="password"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Address --> */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">Address :</label>
          <input
            type="text"
            className="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>
      </form>

      {/* <!-- BUTTONS --> */}
      <div className="mt-14 flex justify-center gap-4">
        <input
         className="w-28 py-2 rounded-xl bg-[var(--color-brown)] hover:bg-[var(--color-matcha)] text-white font-medium shadow-md"
         type="submit"
         value="Login"
         onClick={() => (window.location.href = "/signin")} />

        <input
          className="w-28 py-2 rounded-xl bg-gray-400 hover:bg-gray-600 text-white font-medium shadow-md"
          type="button"
          value="Sign UP"
          onClick={() => (window.location.href = "/account")} />
      </div>
    </main>
  );
}
