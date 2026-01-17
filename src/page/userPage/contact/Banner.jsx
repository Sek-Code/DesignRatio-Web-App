export default function Banner() {
  return (
    <div className="relative w-full px-12 py-12  bg-[url('/img/banner.jpg')] bg-cover ">
      <div className="absolute bg-white/50  w-full inset-0"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className=" h1-style text-brown mb-6">Contact US</h1>
        <p className=" text-lg text-amber-900 w-[75%] text-center leading-relaxed drop-shadow-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed
          lobortis sem. Quisque tempus tortor et sapien gravida aliquam. Quisque
          sit amet tincidunt sem. Cras fermentum tortor vitae interdum tempor.
          Duis mattis ullamcorper enim sed tempor. Quisque scelerisque sit amet
          tellus et placerat. Quisque sed suscipit neque. Quisque quis erat.
        </p>
      </div>
    </div>
  );
}
