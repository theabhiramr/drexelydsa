import heroJpg from "../assets/hero.jpg";

function Home() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {/* Layer 1: The Image */}
        <img
          src={heroJpg}
          alt="Drexel YDSA Hero"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
        />

        {/* Layer 2: The Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

        {/* Layer 3: The Content (Z-20 ensures it's above the image and gradient) */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* The Text Block */}
          <h1 className="flex flex-col items-center font-black uppercase tracking-tighter leading-[0.8] w-full max-w-7xl mb-12">
            <span className="text-background text-[18vw] md:text-[11rem]">
              Welcome
            </span>
            <span className="text-background text-[15vw] md:text-[9rem]">
              To
            </span>
            <span className="text-primary text-[14vw] md:text-[10rem] whitespace-nowrap">
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
            <button className="px-10 py-5 bg-primary text-background font-black text-xl md:text-3xl rounded-full uppercase transition-all duration-300 transform group-hover:scale-105 group-hover:bg-red-700 active:scale-95 shadow-xl">
              Get Involved
            </button>
          </a>
        </div>
      </div>
      <div id="about" className="h-screen bg-background-secondary">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-3xl font-bold text-content mb-4">About Us</h1>
          <p className="text-3xl font-semibold text-primary mb-2">
            We believe a better world is possible.
          </p>
          <p className="text-lg text-content mb-8">
            Drexel YDSA is the (not yet official!) Drexel University chapter of
            the Young Democratic Socialists of America. We are a student
            organization dedicated to promoting democratic socialism and social
            justice on campus and in our community. We organize events,
            campaigns, canvasses and political education to raise awareness
            about issues such as economic inequality, climate change, racial
            justice, and workers' rights.
          </p>
          <p className="text-3xl font-semibold text-primary mb-2">
            Capitalism is a broken system.
          </p>
          <p className="text-lg text-content mb-8"></p>
          <p className="text-lg text-content mb-8">
            We believe that capitalism is a system that prioritizes profit over
            people and the planet. It creates and perpetuates inequality,
            exploitation, and environmental destruction. Socialism is an
            ideology that puts the power in the hands of the people rather than
            the ruling class. The people own and control the means of
            production, distribution, and exchange, and the wealth is
            distributed based on need rather than profit. We believe that
            socialism is the only way to create a just and equitable society
            where everyone has access to the resources they need to thrive.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
