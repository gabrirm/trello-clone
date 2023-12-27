import { z } from "zod";

export const DeleteBoard = z.object({
  id: z.string({
    required_error: "Please enter an id",
    invalid_type_error: "Please enter a valid id",
  }),
});
