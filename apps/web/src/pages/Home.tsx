import heroJpg from "../assets/hero.jpg";
import About from "./About";

function Home() {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-black pt-16">
        {/* Layer 1: The Image */}
        <img
          src={heroJpg}
          alt="Drexel YDSA Hero"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
        />

        {/* Layer 2: The Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

        {/* Layer 3: The Content (Z-20 ensures it's above the image and gradient) */}
        <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-full overflow-visible">
          {/* The Text Block */}
          <h1 className="flex flex-col items-center font-black uppercase tracking-tighter leading-[0.9] w-full max-w-7xl mb-6 md:mb-12">
            <span className="text-background text-[16vw] md:text-[11rem]">
              Welcome
            </span>
            <span className="text-background text-[13vw] md:text-[9rem]">
              To
            </span>
            <span className="text-primary text-[12vw] md:text-[10rem] whitespace-nowrap">
              Drexel YDSA
            </span>
          </h1>

          {/* The Button (Now inside the flex flow) */}
          <a
            href="https://forms.gle/fmdK5MUeJHJ1YXDRA"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <button className="px-6 py-3 bg-primary text-background font-black text-base md:text-3xl rounded-full uppercase transition-all duration-300 transform group-hover:scale-105 group-hover:bg-red-700 active:scale-95 shadow-xl">
              Get Involved
            </button>
          </a>
        </div>
      </div>
      <About />
    </>
  );
}

export default Home;
