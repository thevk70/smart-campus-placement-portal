import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white sticky top-0 z-50">
      <nav className="px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h3 className="font-semibold text-lg">
          🎓 Smart Campus
        </h3>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks role={user?.role} />

          <div className="flex items-center gap-2">
            <User size={16} />
            <span className="text-sm">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md flex items-center gap-1 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-800 px-4 pb-4 space-y-3">
          <NavLinks role={user?.role} onClick={() => setOpen(false)} />

          <div className="flex items-center gap-2 pt-2 border-t border-blue-600">
            <User size={16} />
            <span className="text-sm">{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md flex justify-center items-center gap-1 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------- Role Based Links ---------- */
function NavLinks({ role, onClick }) {
  const baseClass =
    "block md:inline text-white hover:text-gray-200 font-medium";

  return (
    <>
      {role === "student" && (
        <>
          <Link to="/jobs" onClick={onClick} className={baseClass}>
            Jobs
          </Link>
          <Link to="/applications" onClick={onClick} className={baseClass}>
            My Applications
          </Link>
          <Link to="/profile" onClick={onClick} className={baseClass}>
            Profile
          </Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/admin" onClick={onClick} className={baseClass}>
            Dashboard
          </Link>
          <Link to="/admin/create-job" onClick={onClick} className={baseClass}>
            Create Job
          </Link>
        </>
      )}
    </>
  );
}
