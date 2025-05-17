"use client";

import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageCircle, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "./hook";
import { useToast } from "@/components/ui/toast";


export default function ModuleRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast()
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
          addToast(`Berhasil Daftar niih..`, "success")

          window.location.href = "/login";
        },
      });
    } catch (error) {
      throw new Error(error as string);
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
                <h1 className="text-3xl font-black">DAFTAR</h1>
                <p className="mt-2">Buat akun Tanya-Tanya baru</p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                            disabled={form.formState.isSubmitting}
                            className={`w-full p-3 border-4 border-black  focus:outline-none focus:ring-2 focus:ring-[#118AB2] h-16 rounded-[0px] ${form.formState.errors.username
                              ? "border-red-500"
                              : ""
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
                              disabled={form.formState.isSubmitting}
                              className={`w-full p-3 border-4 border-black focus:outline-2 focus:outline-offset-2 focus:outline-violet-500   h-16 rounded-[0px] ${form.formState.errors.password
                                ? "border-red-500"
                                : ""
                                }`}
                              {...field}
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="noShadow"
                              className="absolute right-2 top-2/4 bg-background -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
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
                    disabled={form.formState.isSubmitting}
                    className="w-full py-3 border-4 text-black border-black bg-background font-bold text-lg h-16 rounded-[0px]  disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {form.formState.isSubmitting ? "Memproses..." : "Daftar"}
                  </Button>

                  {/* Register link */}
                  <div className="text-center mt-6">
                    <p>
                      Sudah punya akun?{" "}
                      <Link
                        href="/login"
                        className="text-[#118AB2] font-bold hover:underline"
                      >
                        Masuk sekarang
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
          &copy; {new Date().getFullYear()} Tanya-Tanya. Semua hak dilindungi.
        </p>
      </footer>
    </div>
  );
}
