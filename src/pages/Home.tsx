import heroJpg from "../assets/hero.jpg";

function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <img
          src={heroJpg}
          alt="Drexel YDSA Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative flex min-h-screen items-center justify-center">
          <h1 className="text-5xl font-bold text-white bg-primary bg-opacity-75 px-8 py-4 rounded-lg">
            Welcome to Drexel YDSA
          </h1>
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
