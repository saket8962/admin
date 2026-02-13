import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import Revenue from "./pages/Revenue";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import CustomerDetail from "./pages/CustomerDetail";
import CouponDetail from "./pages/CouponDetail";
import SpecificOrderDetail from "./pages/SpecificOrderDetail";
import Reviews from "./pages/Reviews";
import SEOAuditor from "./pages/SEOAuditor";
import Coupons from "./pages/Coupons";
import Shipping from "./pages/Shipping";
import SystemHealth from "./pages/SystemHealth";
import Blogs from "./pages/Blogs";
import Inquiries from "./pages/Inquiries";
import CreateBlog from "./pages/CreateBlog";
import BlogAnalytics from "./pages/BlogAnalytics";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/Profile";

function AppContent() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <AdminLayout onLogout={logout}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/create" element={<CreateProduct />} />
                <Route
                  path="/products/edit/:slug"
                  element={<CreateProduct />}
                />

                <Route path="/revenue" element={<Revenue />} />
                <Route path="/orders" element={<Orders />} />
                <Route
                  path="/orders/:orderId"
                  element={<SpecificOrderDetail />}
                />
                <Route path="/orders/user/:id" element={<CustomerDetail />} />
                <Route path="/users/:id" element={<CustomerDetail />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/users"
                  element={<div className="p-8">Users Board (Coming Soon)</div>}
                />
                <Route path="/marketing/coupons" element={<Coupons />} />
                <Route
                  path="/marketing/coupons/:id"
                  element={<CouponDetail />}
                />
                <Route path="/marketing/reviews" element={<Reviews />} />
                <Route path="/marketing/seo" element={<SEOAuditor />} />
                <Route path="/content/blogs" element={<Blogs />} />
                <Route path="/content/blogs/create" element={<CreateBlog />} />
                <Route
                  path="/content/blogs/:id/analytics"
                  element={<BlogAnalytics />}
                />
                <Route path="/operations/shipping" element={<Shipping />} />
                <Route path="/operations/inquiries" element={<Inquiries />} />
                <Route path="/operations/health" element={<SystemHealth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* Fallback to dashboard if route not found */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AdminLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster position="top-right" richColors closeButton />
      </Router>
    </AuthProvider>
  );
}

export default App;
