import CloudinaryImage from "@/components/CloudinaryImage";

export default function AccountPage() {
  const handleProfileImageUpload = (url) => {
    // Save image URL to server or state management
    console.log('Uploaded image URL:', url);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-10">
      <h1 className="font-semibold mb-8 mt-2">Account</h1>
      
      <CloudinaryImage 
        publicId="cld-sample-5"
        width={300}
        height={300}
        alt="Profile Picture"
        isProfile={true}
        onUpload={handleProfileImageUpload}
      />

      <form className="mt-20 space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <div>
          <div>
            <h2 className="text-sm">Email:</h2>
            <input
              type="email"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
            />
          </div>
        </div>

        <div>
            <h2 className="text-sm">Mobile Number:</h2>
            <input
              type="tel"
              className="w-full mt-2 p-2 rounded-4xl bg-[#F2EDE4]"
            />
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
