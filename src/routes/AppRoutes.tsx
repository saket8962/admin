import React, { Suspense } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import { adminRoutes } from "./routesConfig";

const RouteFallback = () => (
  <div className="h-[60vh] w-full flex flex-col items-center justify-center bg-background gap-4">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
      Loading Section...
    </span>
  </div>
);

export default function AppRoutes() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  const element = useRoutes([
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/",
      element: isAuthenticated ? (
        <AdminLayout onLogout={logout}>
          {/* Centralized suspense boundary around nested pages */}
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </AdminLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        ...adminRoutes,
        // Fallback inside layout to redirect to Dashboard
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
    // Top-level fallback redirects to Dashboard (which triggers auth redirect if needed)
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return element;
}
