import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "../validations/authSchema";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { API_ENDPOINTS } from "../config/endpoints";
import loginBrandImg from "../assets/login-brand-modern.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
      const { success, message, data: userData } = response.data;

      if (success && userData.role === "admin") {
        login(userData, userData.token);
        toast.success("Welcome back, NIVAA Admin!", {
          description: "Login successful. Redirecting to dashboard...",
        });
        navigate("/");
      } else {
        toast.error("Access Denied", {
          description: "You do not have administrative privileges.",
        });
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Something went wrong during login.";
      toast.error("Login Failed", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden">
      {/* Left Side: Brand Image */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden">
        <img
          src={loginBrandImg}
          alt="NIVAA Brand"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white z-10 space-y-4">
          <div className="space-y-1">
            <h1 className="text-6xl xl:text-7xl font-serif font-bold tracking-tighter uppercase leading-none">
              NIVAA
            </h1>
            <div className="h-1 w-20 bg-accent" />
          </div>
          <p className="text-lg xl:text-xl font-light tracking-[0.4em] uppercase opacity-90">
            Administrative Portal
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white overflow-y-auto">
        <div className="w-full max-w-sm py-8 space-y-10 lg:space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-center lg:text-left">
              Login
            </h2>
            <p className="text-muted text-sm font-medium text-center lg:text-left">
              Enter your admin credentials to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 lg:space-y-8"
          >
            <div className="space-y-5 lg:space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="admin@nivaa.com"
                    className={`w-full bg-secondary/30 border ${
                      errors.email ? "border-red-500/50" : "border-transparent"
                    } rounded-xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold uppercase ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full bg-secondary/30 border ${
                      errors.password
                        ? "border-red-500/50"
                        : "border-transparent"
                    } rounded-xl pl-12 pr-12 py-4 outline-none focus:bg-white focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 font-bold uppercase ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 md:py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/95 transition-all shadow-2xl shadow-primary/20 active:scale-[0.98] text-xs flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Access Portal"
              )}
            </button>
          </form>

          <footer className="pt-8 border-t border-border/50 flex flex-col gap-1 items-start text-[9px] font-bold uppercase tracking-[0.3em] text-muted/60">
            <span>© 2026 NIVAA LIGHTING</span>
            <span>Secure Admin Env</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
