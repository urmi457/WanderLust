import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Package from "./pages/Package";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ProtectedRoute, AdminRoute } from "./components/RouteGuards";

// Every page already renders its own header (Hero on Home, PageHeader on the
// rest), so the shared layout here only needs to add the Footer after each page.
function Page({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page><Home /></Page>} />
      <Route path="/about" element={<Page><About /></Page>} />
      <Route path="/services" element={<Page><Services /></Page>} />
      <Route path="/package" element={<Page><Package /></Page>} />
      <Route path="/packages" element={<Page><Packages /></Page>} />
      <Route path="/packages/:id" element={<Page><PackageDetail /></Page>} />
      <Route path="/blog" element={<Page><Blog /></Page>} />
      <Route path="/contact" element={<Page><Contact /></Page>} />
      <Route path="/login" element={<Page><Login /></Page>} />
      <Route path="/signup" element={<Page><Signup /></Page>} />
      <Route
        path="/my-bookings"
        element={
          <Page>
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          </Page>
        }
      />
      <Route
        path="/admin"
        element={
          <Page>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </Page>
        }
      />
    </Routes>
  );
}
