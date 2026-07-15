import { z } from "zod"

export const reviewFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(50, "Name must be 50 characters or less."),
  rating: z.number().int("Rating must be a whole number.").min(1, "Please choose a rating.").max(5, "Rating must be between 1 and 5."),
  comment: z
    .string()
    .trim()
    .min(10, "Please add at least 10 characters.")
    .max(500, "Comment must be 500 characters or less."),
})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
