"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuestion } from "./hook";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function QnaModule() {
  const params = useParams<{ username: string }>();
  const { mutate } = useCreateQuestion(params.username);
  const [send, onSend] = useState(false)
  const { addToast } = useToast()
  const questionSchema = z.object({
    name: z.string().max(20, { message: "Maksimal 20 karakter" }).optional(),
    question: z
      .string()
      .min(3, "pertanyaan harus memiliki minimal 3 karakter")
      .max(250, {
        message: "jumlah karakter maksimal 250 karakter",
      }),
  });

  type LoginSchema = z.infer<typeof questionSchema>;
  const form = useForm<LoginSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: "",
      question: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    // console.log(values);
    // Proses login
    try {
      mutate(values, {
        onSuccess: () => {
          onSend(false)
          form.reset();
          addToast(`Pesannya udah dikirim yaa..`, "success")

        },
        onError: () => {
          onSend(false)
          addToast(
            `Yaaaah kamu gagal kirim pesannya`, "error"
          );
        },
      });
    } catch (error) {
      throw new Error(error as string);
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
                <h1 className="text-3xl font-black">
                  Tanyain {params.username} Yuk
                </h1>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Nama</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama Anda (opsional)"
                            disabled={form.formState.isSubmitting}
                            className={`w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#118AB2] h-16 rounded-[0px] ${form.formState.errors.name ? "border-red-500" : ""
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
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Pesan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan pertanyaan Anda (maksimal 160 karakter)"
                            disabled={form.formState.isSubmitting}
                            className={`w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-[#118AB2] h-56 rounded-[0px] ${form.formState.errors.question
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

                  {/* Submit Button */}


                  <Dialog open={send} onOpenChange={onSend} >
                    <DialogTrigger asChild>
                      <Button className="w-full h-16 text-black font-bold text-lg">Kirim Pesan</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Kirim Pesan</DialogTitle>
                        <DialogDescription>
                          Yakin nih mau dikirim pesannya ?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="flex flex-row">
                        <DialogClose asChild>
                          <Button variant="neutral" className="w-full">Gajadi</Button>
                        </DialogClose>
                        <Button type="submit" className="w-full" onClick={() => {
                          onSend(false)
                          form.handleSubmit(onSubmit)()
                        }}>Kirim</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>


                  {/* Register link */}
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
