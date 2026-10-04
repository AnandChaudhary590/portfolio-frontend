import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  Code2,
  Folder,
  Briefcase,
  FileText,
  Star,
  Grid2X2,
  Mail,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Skills", path: "/skills", icon: Code2 },
    { name: "Projects", path: "/projects", icon: Folder },
    { name: "Experience", path: "/experience", icon: Briefcase },
    { name: "Blog", path: "/blog", icon: FileText },
    { name: "Testimonials", path: "/testimonials", icon: Star },
    { name: "Services", path: "/services", icon: Grid2X2 },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Navbar */}
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-white"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop Let's Talk */}
            <Link
              to="/contact"
              className="hidden rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200 md:block"
            >
              Let's Talk
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>

        {/* Stylish Creative Mobile Menu */}
        {mobileMenuOpen && (
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-white/10 pb-5 pt-4 md:hidden">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl">

              {/* Welcome Card */}
              <div className="mb-3 rounded-xl border border-white/10 bg-gray-900/80 p-4">
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-lg font-bold text-white">
                    &lt;/&gt;
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      Welcome
                    </p>

                    <p className="text-xs text-gray-400">
                      Let's build something great
                    </p>
                  </div>

                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5">

                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Icon size={18} />

                      <span>{item.name}</span>
                    </Link>
                  );
                })}

              </nav>

              {/* Let's Talk */}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Let's Talk →
              </Link>

            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;