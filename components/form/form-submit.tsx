"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  label?: string;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "link"
    | "ghost"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={disabled} className={cn(className)} variant={variant}>
      {children}
    </Button>
  );
};
