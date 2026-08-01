import { z } from "zod"

export type ReviewFormMessages = {
  nameMin: string
  nameMax: string
  ratingWhole: string
  ratingMin: string
  ratingMax: string
  commentMin: string
  commentMax: string
}

export function createReviewFormSchema(messages: ReviewFormMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, messages.nameMin)
      .max(50, messages.nameMax),
    rating: z
      .number()
      .int(messages.ratingWhole)
      .min(1, messages.ratingMin)
      .max(5, messages.ratingMax),
    comment: z
      .string()
      .trim()
      .min(10, messages.commentMin)
      .max(500, messages.commentMax),
  })
}

export type ReviewFormValues = z.infer<ReturnType<typeof createReviewFormSchema>>
