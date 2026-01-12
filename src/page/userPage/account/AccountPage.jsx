import ProfilePic from "@/assets/img/kindpng_223965.png" ;

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="font-semibold mb-8 mt-2">Account</h1>
      <div className="relative w-32 mx-auto">
        <img
          src={ProfilePic}
          alt="ProfilePicture"
          className="mt-10 w-full rounded-full border"
        />
        <button
          className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800
       hover:text-white"
        >
          📷
        </button>
      </div>

      <form className="mt-20 space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
          <div>
            <h2 className="h2-style text-sm">First Name:</h2>
            <input
              type="text"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
            />
          </div>
          <div>
            <h2 className="text-sm">Last Name:</h2>
            <input
              type="text"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 grid-cols-2 gap-15">
          <div>
            <h2 className="text-sm">Email:</h2>
            <input
              type="email"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
            />
          </div>
          <div>
            <h2 className="text-sm">Mobile Number:</h2>
            <input
              type="tel"
              className="w-full mt-2 p-2 rounded-4xl bg-[#F2EDE4]"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm">Address:</h2>
          <textarea
            type="address"
            className="w-full mt-2 p-3 rounded-4xl bg-[#F2EDE4]"
          ></textarea>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            className="flex justify-center button-style mt-4 hover:bg-amber-800
       hover:text-white px-16 py-1.5 bg-[#d8d8d8] rounded-4xl"
          >
            <h3>
            Save change
            </h3>
          </button>
        </div>
      </form>
    </div>
  );
}
