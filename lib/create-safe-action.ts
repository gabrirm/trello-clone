import { handler } from "tailwindcss-animate";
import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validateFields = schema.safeParse(data);
    if (!validateFields.success) {
      return {
        fieldErrors: validateFields.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
        error: "Missing fields",
      };
    }
    return await handler(validateFields.data);
  };
};
