import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button"

export default function AccountScreen () {
    return (
      <div>
        <form class="mt-20 space-y-6 ">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-15">
            <div>
              <label class="h3-style text-sm">First Name:</label>
              <input
                type="text"
                class="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
              />
            </div>
            <div>
              <label class="h3-style text-sm">Last Name:</label>
              <input
                type="text"
                class="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 grid-cols-2 gap-15">
            <div>
              <label class="h3-style text-sm">Email:</label>
              <input
                type="email"
                class="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
              />
            </div>
            <div>
              <label class="h3-style text-sm">Mobile Number:</label>
              <input
                type="tel"
                class="w-full mt-2 p-2 rounded-4xl bg-[#F2EDE4]"
              />
            </div>
          </div>

          <div>
            <label class="h3-style text-sm">Address:</label>
            <textarea
              type="address"
              class="w-full mt-2 p-3 rounded-4xl bg-[#F2EDE4]"
            ></textarea>
          </div>

          <div class="flex gap-4 justify-center pt-4">
            <button
              class="flex justify-center button-style mt-10 hover:bg-amber-800
        hover:text-white px-15 py-4 bg-[#d8d8d8] rounded-4xl"
            >
              Save change
            </button>
          </div>
        </form>
      </div>
    );
}