"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "./hook";
import { useToast } from "@/components/ui/toast";

export default function ModuleRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();
  const registerSchema = z.object({
    username: z.string().nonempty("Username harus diisi"),
    password: z.string().nonempty("Password harus diisi"),
  });

  type registerSchema = z.infer<typeof registerSchema>;
  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { mutate } = useRegister();
  const onSubmit = async (values: registerSchema) => {
    try {
      mutate(values, {
        onSuccess: () => {
          form.reset();
          addToast(`Berhasil Daftar niih..`, "success");
          window.location.href = "/login";
        },
      });
    } catch (error) {
      throw new Error(error as string);
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
              <h1 className="text-2xl font-black uppercase">Daftar</h1>
              <p className="mt-1 text-foreground/60 font-medium text-sm">
                Buat akun Tanya-Tanya baru
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
                          disabled={form.formState.isSubmitting}
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
                            disabled={form.formState.isSubmitting}
                            className={`w-full p-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-foreground h-12 rounded-[0px] font-medium ${
                              form.formState.errors.password ? "border-red-500" : ""
                            }`}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
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
                  disabled={form.formState.isSubmitting}
                  className="w-full py-3 bg-foreground text-secondary-background border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {form.formState.isSubmitting ? "Memproses..." : "Daftar"}
                  {!form.formState.isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>

                {/* Login link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-foreground/60">
                    Sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="text-foreground font-bold underline underline-offset-2 hover:no-underline"
                    >
                      Masuk sekarang
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
