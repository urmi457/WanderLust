import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { friendlyError } from "./Login";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Welcome to WanderLust.",
        timer: 1600,
        showConfirmButton: false,
      });
      navigate("/", { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Sign up failed", text: friendlyError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await loginWithGoogle();
      Swal.fire({ icon: "success", title: "Welcome!", timer: 1400, showConfirmButton: false });
      navigate("/", { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google sign-in failed", text: friendlyError(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Sign Up" subtitle="Create your WanderLust account." />
      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8 max-w-md">
          <form onSubmit={handleSubmit} className="bg-white rounded-box shadow-xl p-8 space-y-4">
            <h2 className="font-display text-2xl font-bold text-primary text-center">Sign Up</h2>

            <label className="input input-bordered flex items-center gap-2">
              <FiUser className="text-base-content/40" />
              <input
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="grow"
              />
            </label>

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
                minLength={6}
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="grow"
              />
            </label>

            <button type="submit" disabled={loading} className="btn-brand w-full">
              {loading ? "Creating account..." : "Sign Up"}
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
              Already have an account?{" "}
              <Link to="/login" className="text-secondary font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
