"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { postReview } from "@/lib/data"
import { Review } from "@/lib/types"
import {
  reviewFormSchema,
  type ReviewFormValues,
} from "../validation/review-form-schema"

const defaultValues: ReviewFormValues = {
  name: "",
  rating: 0,
  comment: "",
}

function normalizeReview(
  result: unknown,
  values: ReviewFormValues
): Review {
  if (result && typeof result === "object" && "id" in result) {
    return result as Review
  }

  if (result && typeof result === "object") {
    const payload = (result as { item?: Review; review?: Review; data?: Review }).item ??
      (result as { item?: Review; review?: Review; data?: Review }).review ??
      (result as { item?: Review; review?: Review; data?: Review }).data

    if (payload && typeof payload === "object" && "id" in payload) {
      return payload as Review
    }
  }

  return {
    id: crypto.randomUUID(),
    name: values.name,
    rating: values.rating,
    comment: values.comment,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

type UseReviewFormParams = {
  productSlug: string
  onSuccess: (review: Review) => void
}

export function useReviewForm({
  productSlug,
  onSuccess,
}: UseReviewFormParams) {
  const [open, setOpen] = useState(false)

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
  })

  const submitReview = form.handleSubmit(async (values) => {
    try {
      const response = await postReview(productSlug, values)
      const review = normalizeReview(response, values)

      onSuccess(review)
      toast.success("Your review has been posted.")

      form.reset(defaultValues)
      setOpen(false)
    } catch {
      toast.error("We could not post your review right now.")
    }
  })

  return {
    form,
    open,
    setOpen,
    submitReview,
    isSubmitting: form.formState.isSubmitting,
  }
}
