import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "border-2 border-border p-6 shadow-shadow transition-all text-main-foreground bg-main",
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
        default: "max-w-xl",
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
  createAt?: string;
}

const OverlayCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      shadow,
      username,
      question,
      createAt,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <div className={cn("mx-auto m-5", size && cardVariants({ size }))}>
        <Comp
          ref={ref}
          className={cn(cardVariants({ variant, shadow }), className)}
          {...props}
        >
          <div className="flex flex-row items-center gap-4 mb-2">
            <h1 className="text-xl font-black">{username}</h1>
          </div>
          <p className="mb-2">{question}</p>
          {createAt && <p className="text-sm">{createAt}</p>}
        </Comp>
      </div>
    );
  }
);

OverlayCard.displayName = "Card";

export { OverlayCard, cardVariants };
