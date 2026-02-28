import React, { useEffect } from "react";

function NavbarSection({ title }: { title: string }) {
  return (
    <a
      href={`#${title.toLowerCase()}`}
      className="uppercase group relative inline-flex flex-col items-center text-background hover:text-background secondary transition-colors duration-300 leading-none"
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
        navbar?.classList.add("bg-white", "shadow-md");
        navbar?.classList.remove("bg-transparent", "shadow-none");
      } else {
        navbar?.classList.add("bg-transparent", "shadow-none");
        navbar?.classList.remove("bg-white", "shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-primary shadow-none"
    >
      <div className="text-backgroundmax-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-background">Drexel YDSA</div>
        <div className="space-x-4">
          <NavbarSection title="Home" />
          <NavbarSection title="About" />
          <NavbarSection title="Events" />
          <NavbarSection title="Contact" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
