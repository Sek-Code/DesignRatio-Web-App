// import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditMember() {
  // const { id } = useParams();
  const navigate = useNavigate();


  return (
    <div className="max-w-5xl mx-auto py-12">
      <button onClick={() => navigate(`/admin/members`)}><ArrowLeft/></button>
      <div className="relative w-32 mx-auto">
        <div className="mt-10 w-full rounded-full border"></div>
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

        <div className="grid grid-cols-2 gap-15">
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
            Save
          </button>
          <button
            className="flex justify-center button-style mt-4 hover:bg-amber-800
       hover:text-white px-16 py-1.5 bg-[#d8d8d8] rounded-4xl"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
