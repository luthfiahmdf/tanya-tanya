"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { MessageCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/toast";

export default function ModuleLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginSchema = z.object({
    username: z.string().nonempty("Username harus diisi"),
    password: z.string().nonempty("Password harus diisi"),
    remember: z.boolean().optional(),
  });

  type LoginSchema = z.infer<typeof loginSchema>;
  const { addToast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const result = await signIn("login", {
        username: data.username,
        password: data.password,
        redirect: false, // Jangan langsung redirect
        callbackUrl: `/dashboard/${data.username}`,
      });

      if (result?.error) {
        // Handle error
        addToast("Username atau password salah", "error");
        form.setError("password", {
          type: "manual",
          message: "Username atau password salah",
        });
        return;
      }

      if (result?.ok && result.url) {
        // Redirect ke dashboard jika sukses
        router.push(result.url);
        router.refresh();
      }
    } catch (error) {
      addToast("Terjadi kesalahan saat login", "error");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col">
      <header className="border-b-4 border-black bg-background p-4">
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
            <div className="absolute -top-4 -left-4 w-full h-full bg-background border-4 border-black"></div>
            <div className="relative bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black">MASUK</h1>
                <p className="mt-2">Masuk ke akun Tanya-Tanya</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan username Anda"
                            disabled={isLoading}
                            className={`w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#118AB2] h-16 rounded-[0px] ${form.formState.errors.username ? "border-red-500" : ""
                              }`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Masukkan password Anda"
                              disabled={isLoading}
                              className={`w-full p-3 border-4 border-black focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 h-16 rounded-[0px] ${form.formState.errors.password ? "border-red-500" : ""
                                }`}
                              {...field}
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="noShadow"
                              className="absolute right-2 top-2/4 -translate-y-1/2 bg-background"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 border-4 text-black border-black font-bold text-lg h-16 rounded-[0px] disabled:opacity-70 disabled:cursor-not-allowed bg-background"
                  >
                    {isLoading ? "Memproses..." : "Masuk"}
                  </Button>

                  {/* Register link */}
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
              </Form>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t-4 border-black py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} made with ❤️ by luthfiahmdf.
        </p>
      </footer>
    </div>
  );
}
