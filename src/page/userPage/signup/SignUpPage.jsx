export default function SignUpPage() {
  return (
    <main class="mx-auto w-full lg:max-w-[980px] px-4 md:px-8 pt-28 pb-16 flex-1">
      <h1 class="font-['Playfair_Display'] text-3xl mb-12">Sign up</h1>

      <form class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {/* <!-- Name --> */}
        <div>
          <label class="block mb-2 font-medium">Name :</label>
          <input
            type="text"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Surname --> */}
        <div>
          <label class="block mb-2 font-medium">Surname :</label>
          <input
            type="text"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Email --> */}
        <div class="md:col-span-2">
          <label class="block mb-2 font-medium">E-mail :</label>
          <input
            type="email"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <label class="block mb-2 font-medium">Password :</label>
          <input
            type="password"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Password Confirm --> */}
        <div>
          <label class="block mb-2 font-medium">Password Confirm :</label>
          <input
            type="password"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>

        {/* <!-- Address --> */}
        <div class="md:col-span-2">
          <label class="block mb-2 font-medium">Address :</label>
          <input
            type="text"
            class="block w-full bg-transparent border-b border-[var(--brown-color)] focus:outline-none focus:border-[var(--matcha-color)] py-2"
          />
        </div>
      </form>

      {/* <!-- BUTTONS --> */}
      <div class="mt-14 flex justify-center gap-4">
        <button class="w-28 py-2 rounded-xl bg-[var(--brown-color)] text-white font-medium shadow-md">
          Login
        </button>

        <button class="w-28 py-2 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-medium shadow-md">
          Sign Up
        </button>
      </div>
    </main>
  );
}
