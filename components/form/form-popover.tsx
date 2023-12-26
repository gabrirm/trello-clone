"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: () => {
      console.log("success");
      toast.success("Board created");
    },
    onError: () => {
      console.log("error");
      toast.error("Error creating board");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 outline-none"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              errors={fieldErrors}
              id="title"
              label="Board title"
              type="text"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
