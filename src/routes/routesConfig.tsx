import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

// Lazy loaded page components
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/Products"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const Categories = lazy(() => import("../pages/Categories"));
const Revenue = lazy(() => import("../pages/Revenue"));
const Orders = lazy(() => import("../pages/Orders"));
const SpecificOrderDetail = lazy(() => import("../pages/SpecificOrderDetail"));
const CustomerDetail = lazy(() => import("../pages/CustomerDetail"));
const Customers = lazy(() => import("../pages/Customers"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Coupons = lazy(() => import("../pages/Coupons"));
const CouponDetail = lazy(() => import("../pages/CouponDetail"));
const Reviews = lazy(() => import("../pages/Reviews"));
const SEOAuditor = lazy(() => import("../pages/SEOAuditor"));
const Blogs = lazy(() => import("../pages/Blogs"));
const CreateBlog = lazy(() => import("../pages/CreateBlog"));
const BlogAnalytics = lazy(() => import("../pages/BlogAnalytics"));
const HeroSlider = lazy(() => import("../pages/HeroSlider"));
const CreateHeroSlide = lazy(() => import("../pages/CreateHeroSlide"));
const Promos = lazy(() => import("../pages/Promos"));
const CreatePromo = lazy(() => import("../pages/CreatePromo"));
const Shipping = lazy(() => import("../pages/Shipping"));
const Inquiries = lazy(() => import("../pages/Inquiries"));
const SystemHealth = lazy(() => import("../pages/SystemHealth"));
const Profile = lazy(() => import("../pages/Profile"));
const SettingsPage = lazy(() => import("../pages/Settings"));
const Documentation = lazy(() => import("../pages/Documentation"));

const UsersComingSoon = () => (
  <div className="p-8">Users Board (Coming Soon)</div>
);

export const adminRoutes: RouteObject[] = [
  {
    path: "",
    element: <Dashboard />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "products/create",
    element: <CreateProduct />,
  },
  {
    path: "products/edit/:slug",
    element: <CreateProduct />,
  },
  {
    path: "revenue",
    element: <Revenue />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "orders/:orderId",
    element: <SpecificOrderDetail />,
  },
  {
    path: "orders/user/:id",
    element: <CustomerDetail />,
  },
  {
    path: "users/:id",
    element: <CustomerDetail />,
  },
  {
    path: "customers/:id",
    element: <CustomerDetail />,
  },
  {
    path: "customers",
    element: <Customers />,
  },
  {
    path: "analytics",
    element: <Analytics />,
  },
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "users",
    element: <UsersComingSoon />,
  },
  {
    path: "marketing/coupons",
    element: <Coupons />,
  },
  {
    path: "marketing/coupons/:id",
    element: <CouponDetail />,
  },
  {
    path: "marketing/reviews",
    element: <Reviews />,
  },
  {
    path: "marketing/seo",
    element: <SEOAuditor />,
  },
  {
    path: "content/blogs",
    element: <Blogs />,
  },
  {
    path: "content/blogs/create",
    element: <CreateBlog />,
  },
  {
    path: "content/blogs/:id/analytics",
    element: <BlogAnalytics />,
  },
  {
    path: "storefront/hero",
    element: <HeroSlider />,
  },
  {
    path: "storefront/hero/create",
    element: <CreateHeroSlide />,
  },
  {
    path: "storefront/hero/edit/:id",
    element: <CreateHeroSlide />,
  },
  {
    path: "storefront/promos",
    element: <Promos />,
  },
  {
    path: "storefront/promos/create",
    element: <CreatePromo />,
  },
  {
    path: "operations/shipping",
    element: <Shipping />,
  },
  {
    path: "operations/inquiries",
    element: <Inquiries />,
  },
  {
    path: "operations/health",
    element: <SystemHealth />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
  {
    path: "docs",
    element: <Documentation />,
  },
];
