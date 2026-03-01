import heroJpg from "../assets/hero.jpg";

function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <img
          src={heroJpg}
          alt="Drexel YDSA Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center text-center">
          <div className="w-full">
            <h1 className="w-full uppercase font-black leading-[0.75] tracking-[-0.02em] text-background text-[120px]">
              <span className="block w-full">Welcome to</span>
              <span className="block w-full text-primary">Drexel YDSA</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="h-screen bg-background-secondary">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-content mb-4">About Us</h2>
          <p className="text-lg text-content mb-8">
            Drexel YDSA is the Drexel University chapter of the Democratic
            Socialists of America. We are a student organization dedicated to
            promoting democratic socialism and social justice on campus and in
            our community. We organize events, campaigns, and educational
            programs to raise awareness about issues such as economic
            inequality, climate change, racial justice, and workers' rights.
            Join us in building a more just and equitable world!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
