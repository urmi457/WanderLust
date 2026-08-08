import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiMapPin, FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

// Top navigation bar, reused on every page (transparent-over-hero style on Home,
// solid on inner pages via the `solid` prop).
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ transparent = false }) {
  const { currentUser, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    Swal.fire({ icon: "success", title: "Logged out", timer: 1200, showConfirmButton: false });
    navigate("/");
  }

  return (
    <div
      className={
        transparent
          ? "absolute top-0 left-0 right-0 z-30 bg-transparent"
          : "sticky top-0 z-30 bg-primary shadow-md"
      }
    >
      <div className="navbar container mx-auto px-4 md:px-8 py-3">
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-1 text-white font-display text-xl font-bold">
            <FiMapPin className="text-secondary" />
            WanderLust
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 text-white/90 font-medium">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 ${isActive ? "bg-secondary text-white" : "hover:bg-white/10"}`
                  }
                  end={l.to === "/"}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `rounded-full px-4 ${isActive ? "bg-secondary text-white" : "hover:bg-white/10"}`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost text-white gap-2">
                <FiUser /> <span className="hidden md:inline">{profile?.name || "Account"}</span>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 z-40 p-3 shadow bg-base-100 rounded-box w-52 text-base-content"
              >
                <li>
                  <NavLink to="/my-bookings">My Bookings</NavLink>
                </li>
                {isAdmin && (
                  <li>
                    <NavLink to="/admin">Admin Dashboard</NavLink>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="text-error flex items-center gap-2">
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn-brand hidden md:inline-flex btn-sm">
              Login
            </NavLink>
          )}

          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <FiMenu size={22} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-40 p-3 shadow bg-base-100 rounded-box w-52 text-base-content"
            >
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.to === "/"}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}
              {currentUser ? (
                <>
                  <li>
                    <NavLink to="/my-bookings">My Bookings</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login" className="text-secondary font-semibold">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
