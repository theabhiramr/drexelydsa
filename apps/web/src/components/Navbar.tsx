import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 8 && currentScrollY > 50) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 50) {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setIsHidden(false);
    }
  }, [menuOpen]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 bg-primary shadow-md transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative text-background max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <img src={dsaLogo} alt="Drexel YDSA Logo" className="h-32" />
        <div className="hidden items-center space-x-8 md:flex">
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
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-50 md:hidden inline-flex h-12 w-12 items-center justify-center rounded-full border border-background/40 text-background transition-colors duration-300 hover:bg-background/10"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative h-6 w-6">
            {/* Top Bar */}
            <span
              className={`absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-2"
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 bg-current transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>
        <div
          className={`fixed inset-0 z-40 bg-primary text-background transform transition-transform duration-300 md:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center">
            <NavbarSection title="Home" />
            <NavbarSection title="About" />
            <NavbarSection title="Events" />
            <NavbarSection title="Contact" />
            <a
              href="https://act.dsausa.org/donate/membership/"
              target="_blank"
              className="w-full"
            >
              <button className="w-full uppercase px-6 py-4 bg-background text-content font-black text-xl rounded-full hover:bg-background-secondary transition-colors duration-300">
                Join DSA
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
