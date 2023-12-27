import { z } from "zod";

export const UpdateBoard = z.object({
  title: z
    .string({
      required_error: "Please enter a title",
      invalid_type_error: "Please enter a valid title",
    })
    .min(3, "Title must be at least 3 characters long"),
    id: z.string({
        required_error: "Please enter an id",
        invalid_type_error: "Please enter a valid id",
    })
});
