import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "You're logged in.",
        timer: 1600,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Login failed", text: friendlyError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        timer: 1400,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google sign-in failed", text: friendlyError(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Login" subtitle="Welcome back to WanderLust." />
      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8 max-w-md">
          <form onSubmit={handleSubmit} className="bg-white rounded-box shadow-xl p-8 space-y-4">
            <h2 className="font-display text-2xl font-bold text-primary text-center">Login</h2>

            <label className="input input-bordered flex items-center gap-2">
              <FiMail className="text-base-content/40" />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="grow"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FiLock className="text-base-content/40" />
              <input
                required
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="grow"
              />
            </label>

            <button type="submit" disabled={loading} className="btn-brand w-full">
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider text-xs text-base-content/40">OR</div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="btn btn-outline w-full gap-2"
            >
              <FcGoogle size={18} /> Continue with Google
            </button>

            <p className="text-sm text-center text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-secondary font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export function friendlyError(err) {
  const code = err?.code || "";
  const map = {
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/email-already-in-use": "An account with that email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  };
  return map[code] || err.message || "Something went wrong. Please try again.";
}
