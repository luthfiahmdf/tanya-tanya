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
import { MessageCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
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
        redirect: false,
        callbackUrl: `/dashboard/${data.username}`,
      });

      if (result?.error) {
        addToast("Username atau password salah", "error");
        form.setError("password", {
          type: "manual",
          message: "Username atau password salah",
        });
        return;
      }

      if (result?.ok && result.url) {
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-border bg-secondary-background p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-foreground p-1.5 border-2 border-border">
              <MessageCircle className="h-5 w-5 text-secondary-background" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tight">Tanya-Tanya</h1>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="bg-secondary-background border-2 border-border p-8 md:p-10 shadow-[6px_6px_0px_var(--border)]">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-black uppercase">Masuk</h1>
              <p className="mt-1 text-foreground/60 font-medium text-sm">
                Masuk ke akun Tanya-Tanya kamu
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan username"
                          disabled={isLoading}
                          className={`w-full p-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-foreground h-12 rounded-[0px] font-medium ${
                            form.formState.errors.username ? "border-red-500" : ""
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
                      <FormLabel className="text-sm font-bold uppercase">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            disabled={isLoading}
                            className={`w-full p-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-foreground h-12 rounded-[0px] font-medium ${
                              form.formState.errors.password ? "border-red-500" : ""
                            }`}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-foreground text-secondary-background border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>

                {/* Register link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-foreground/60">
                    Belum punya akun?{" "}
                    <Link
                      href="/register"
                      className="text-foreground font-bold underline underline-offset-2 hover:no-underline"
                    >
                      Daftar sekarang
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-border bg-foreground py-4 text-center">
        <p className="text-secondary-background/70 text-sm">
          &copy; {new Date().getFullYear()} made with ❤️ by luthfiahmdf.
        </p>
      </footer>
    </div>
  );
}
