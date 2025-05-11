import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, User } from "lucide-react";

const cardVariants = cva(
  "border-2 border-border  p-6 shadow-shadow transition-all  bg-main",
  {
    variants: {
      variant: {
        default:
          "bg-main text-main-foreground border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        noShadow: "bg-main text-main-foreground border-border",
        neutral:
          "bg-secondary-background text-foreground border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-main-foreground bg-main border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
      },
      size: {
        default: "w-full",
        sm: "max-w-md",
        lg: "max-w-6xl",
      },
      shadow: {
        normal:
          "shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        none: "shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "normal",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  asChild?: boolean;
  username: string;
  question: string;
  // createAt?: string;
  isViewed: boolean | null;
  onShow?: () => void; // <-- tambahan
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      username,
      question,
      isViewed,
      //     createAt,
      asChild = false,
      onShow, // <-- ambil props

      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <div className={cn("mx-auto   my-5 ",)}>
        <Comp
          ref={ref}
          className={cn(cardVariants({ variant, shadow, size }), className)}
          {...props}
        >
          <div className="flex flex-row justify-between items-center gap-4 mb-2">
            <h1 className="text-xl font-black break-all">{question}</h1>
            <Button variant="neutral" className="cursor-pointer" onClick={onShow}>Tampilkan</Button>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <p className="text-xs">{username}</p>
            </div>
            {/* <div className="flex items-center gap-1"> */}
            {/*   <Clock className="h-3 w-3" /> */}
            {/*   <span className="text-xs">{createAt}</span> */}
            {/* </div> */}
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span className="text-xs">{isViewed ? "Sudah dilihat" : "Belum dilihat"}</span>
            </div>

          </div>
        </Comp>
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
