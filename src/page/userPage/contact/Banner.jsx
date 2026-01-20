export default function Banner() {
  return (
    <div className="relative w-full bg-[url('/img/banner.png')] bg-cover px-10 py-10 lg:px-37.5">
      {/* <div className="absolute bg-white/50  w-full inset-0"></div> */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-(--color-cream) mb-6 lg:text-6xl">Contact US</h1>
        <p className="lg:text-xl text-(--color-cream) max-w-3xl text-center leading-relaxed drop-shadow-lg mb-6">
          We'd love to hear from you—whether you have a question about our teas, need help choosing a blend, or simply want to share your tea moment with us. Our team is always happy to help and will get back to you as soon as possible. Reach out anytime, and let's stay connected over a great cup of tea.
        </p>
      </div>
    </div>
  );
}
