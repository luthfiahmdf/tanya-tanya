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
import { MessageCircle, Send } from "lucide-react";
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
  const [send, onSend] = useState(false);
  const { addToast } = useToast();
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
  const question = form.watch("question");
  const textLength = question?.length;

  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    try {
      mutate(values, {
        onSuccess: () => {
          onSend(false);
          form.reset();
          addToast(`Pesannya udah dikirim yaa..`, "success");
        },
        onError: () => {
          onSend(false);
          addToast(`Yaaaah kamu gagal kirim pesannya`, "error");
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
              <h1 className="text-2xl font-black uppercase">
                Tanyain {params.username}
              </h1>
              <p className="mt-1 text-foreground/60 font-medium text-sm">
                Kirim pertanyaan atau pesan anonim
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase">
                        Nama <span className="text-foreground/40 normal-case font-medium">(opsional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama kamu"
                          disabled={form.formState.isSubmitting}
                          className={`w-full p-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-foreground h-12 rounded-[0px] font-medium ${
                            form.formState.errors.name ? "border-red-500" : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Question */}
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase">Pesan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tulis pertanyaan atau pesan kamu..."
                          disabled={form.formState.isSubmitting}
                          maxLength={250}
                          className={`w-full p-3 border-2 border-border focus:outline-none focus:ring-2 focus:ring-foreground h-40 rounded-[0px] font-medium resize-none ${
                            form.formState.errors.question ? "border-red-500" : ""
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        <FormMessage />
                        <span className={`text-xs font-bold ${(textLength || 0) >= 230 ? "text-red-500" : "text-foreground/40"}`}>
                          {textLength || 0}/250
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Dialog open={send} onOpenChange={onSend}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="w-full py-3 bg-foreground text-secondary-background border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Kirim Pesan
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Kirim Pesan</DialogTitle>
                      <DialogDescription>
                        Yakin nih mau dikirim pesannya?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row">
                      <DialogClose asChild>
                        <Button variant="neutral" className="w-full">Gajadi</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="w-full"
                        onClick={() => {
                          onSend(false);
                          form.handleSubmit(onSubmit)();
                        }}
                      >
                        Kirim
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
