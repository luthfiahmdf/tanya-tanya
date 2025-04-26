"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { MessageCircle, Eye, EyeOff } from "lucide-react";

type FormData = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah");
        return;
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col">
      <header className="border-b-4 border-black bg-[#FFD166] p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <MessageCircle className="h-8 w-8" />
            <h1 className="text-2xl font-black">TANYA-TANYA</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#06D6A0] border-4 border-black"></div>
            <div className="relative bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black">MASUK</h1>
                <p className="mt-2">Masuk ke akun Tanya-Tanya Anda</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block font-bold">
                    Username
                  </label>
                  <input
                    id="username"
                    {...register("username", {
                      required: "Username harus diisi",
                    })}
                    className={`w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#118AB2] ${
                      errors.username ? "border-red-500" : ""
                    }`}
                    placeholder="Masukkan username Anda"
                    disabled={isLoading}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block font-bold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password harus diisi",
                      })}
                      className={`w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#118AB2] ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="Masukkan password Anda"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("remember")}
                      className="w-4 h-4 border-2 border-black"
                    />
                    <span>Ingat saya</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[#118AB2] font-bold hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#EF476F] border-4 border-black font-bold text-lg hover:bg-[#ff5a7e] transition-colors transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                </button>

                <div className="text-center mt-6">
                  <p>
                    Belum punya akun?{" "}
                    <Link
                      href="/register"
                      className="text-[#118AB2] font-bold hover:underline"
                    >
                      Daftar sekarang
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t-4 border-black py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Tanya-Tanya. Semua hak dilindungi.
        </p>
      </footer>
    </div>
  );
}
