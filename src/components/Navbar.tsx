import { useEffect } from "react";
import dsaLogo from "../assets/logo.png";

function NavbarSection({ title }: { title: string }) {
  return (
    <a
      href={`#${title.toLowerCase()}`}
      className="font-bold text-2xl group relative inline-flex flex-col items-center text-background hover:text-background secondary transition-colors duration-300 leading-none"
    >
      {title}
      <span className="mt-px h-0.5 w-full bg-current opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );
}
function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 0) {
        navbar?.classList.add("bg-primary", "shadow-md");
        navbar?.classList.remove("bg-transparent", "shadow-none");
      } else {
        navbar?.classList.add("bg-transparent", "shadow-none");
        navbar?.classList.remove("bg-primary", "shadow-md");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-transparent shadow-none"
    >
      <div className="text-background max-w-7xl mx-auto px-32 py-6 flex items-center justify-between">
        <img src={dsaLogo} alt="Drexel YDSA Logo" className="h-32" />
        <div className="space-x-8">
          <NavbarSection title="Home" />
          <NavbarSection title="About" />
          <NavbarSection title="Events" />
          <NavbarSection title="Contact" />
          <a href="https://act.dsausa.org/donate/membership/" target="_blank">
            <button className="uppercase ml-4 px-6 py-4 bg-background text-content font-black text-2xl rounded-full hover:bg-background-secondary transition-colors duration-300">
              Join DSA
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
