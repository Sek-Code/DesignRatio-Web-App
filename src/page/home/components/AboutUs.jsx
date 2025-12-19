import aboutImage from "@/assets/img/about us pic.png";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  const handleShowMore = () => {};

  return (
    <section className="bg-[#f7f8ec] py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:px-10 lg:flex-row lg:gap-14">
        <div className="w-full lg:w-1/2">
          <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
            <img
              src={aboutImage}
              alt="Loose leaf tea on a white plate"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="w-full space-y-4 text-center lg:w-1/2 lg:text-left">
          <p className="text-lg font-semibold text-[#64893e]">About Us</p>
          <h2 className="text-3xl font-bold text-[#5b3b1a] md:text-4xl">
            Blending tradition with modern craft
          </h2>
          <p className="text-base leading-relaxed text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
            lorem nisl. Praesent pulvinar libero vel eros eleifend aliquet id
            non augue. Morbi mattis mi lacus, vel laoreet tortor feugiat nec.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Aliquam a nibh aliquam, hendrerit leo eu, consectetur nisi. Mauris
            vel enim quis est lobortis sodales eget ut diam. Suspendisse potenti
            nunc volutpat aliquam volutpat.
          </p>
          <div className="pt-2">
            <Button
              className="rounded-full bg-[#79522d] px-7 py-2 text-white hover:bg-[#694624]"
              onClick={handleShowMore}
            >
              Show more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
