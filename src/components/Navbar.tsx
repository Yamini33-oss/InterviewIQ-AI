import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "#features" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (to: string) =>
    to === "/"
      ? location.pathname === "/"
      : location.pathname === to.replace("/#", "/");

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="mt-3 flex items-center justify-between rounded-2xl glass px-4 py-3">

          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow"
            >
              <Brain className="h-5 w-5 text-white" />
            </motion.div>

            <span className="font-display text-lg font-bold tracking-tight text-white">
              InterviewIQ <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
          {links.map((l) =>
  l.to.startsWith("#") ? (
    <button
      key={l.label}
      onClick={() => {
  if (location.pathname !== "/") {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("features")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  }
}}
      className="relative rounded-lg px-4 py-2 text-sm font-medium text-slate-400 hover:text-white"
    >
      {l.label}
    </button>
  ) : (
    <Link
      key={l.label}
      to={l.to}
      className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        isActive(l.to)
          ? "text-white"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {isActive(l.to) && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 -z-10 rounded-lg bg-white/10 border border-white/10"
        />
      )}
      {l.label}
    </Link>
  )
)}

            {user ? (
  <>
    <div
  title={user.email}
  className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg cursor-default"
>
  {(user.user_metadata?.full_name || user.email || "U")
    .charAt(0)
    .toUpperCase()}
</div>

    <button
      onClick={async () => {
        await supabase.auth.signOut();
      }}
      className="btn-primary ml-3 px-5 py-2 text-sm"
    >
      Logout
    </button>
  </>
) : (
  <Link
    to="/login"
    className="btn-primary ml-3 px-5 py-2 text-sm"
  >
    Login
  </Link>
)}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-lg glass glass-hover"
          >
            {open ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 rounded-2xl glass p-3"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <div className="mt-3 flex justify-center">
                <Link
                  to="/profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg"
                >
                  {(user.user_metadata?.full_name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
}