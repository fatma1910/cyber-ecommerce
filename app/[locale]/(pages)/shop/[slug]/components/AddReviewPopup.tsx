"use client"

import { FaRegStar, FaStar } from "react-icons/fa"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useReviewForm } from "../hooks/use-review-form"

type AddReviewPopupProps = {
  productSlug: string
  onReviewCreated: (review: {
    id: string
    name: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
  }) => void
}

export default function AddReviewPopup({
  productSlug,
  onReviewCreated,
}: AddReviewPopupProps) {
  const t = useTranslations("products.detail.reviewForm")
  const detail = useTranslations("products.detail")
  const { form, open, setOpen, submitReview, isSubmitting } = useReviewForm({
    productSlug,
    onSuccess: onReviewCreated,
  })

  const rating = form.watch("rating")
  const errors = form.formState.errors

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-start rounded-[7px] border border-[#CECECE] py-6 text-start text-muted-foreground"
          >
            {t("trigger")}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={submitReview}>
          <FieldSet className="gap-5">
            <Field>
              <FieldContent className="gap-2">
                <FieldTitle>{t("nameLabel")}</FieldTitle>
                <Input
                  autoComplete="name"
                  placeholder={t("namePlaceholder")}
                  aria-invalid={!!errors.name}
                  {...form.register("name")}
                />
                <FieldError errors={[errors.name]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldContent className="gap-3">
                <FieldTitle>{t("ratingLabel")}</FieldTitle>
                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = value <= rating

                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={`Set rating to ${value}`}
                        onClick={() =>
                          form.setValue("rating", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-[#FFB547] transition hover:scale-105 hover:border-[#FFB547] cursor-pointer"
                      >
                        {active ? <FaStar size={18} /> : <FaRegStar size={18} />}
                      </button>
                    )
                  })}
                </div>
                <FieldDescription>
                  {rating > 0
                    ? detail(`ratingLabels.${["poor", "belowAverage", "average", "good", "excellent"][rating - 1]}`)
                    : t("ratingDescription")}
                </FieldDescription>
                <FieldError errors={[errors.rating]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldContent className="gap-2">
                <FieldTitle>{t("commentLabel")}</FieldTitle>
                <Textarea
                  placeholder={t("commentPlaceholder")}
                  aria-invalid={!!errors.comment}
                  {...form.register("comment")}
                />
                <FieldError errors={[errors.comment]} />
              </FieldContent>
            </Field>
          </FieldSet>

          <DialogFooter className="pt-2">
            <DialogClose variant="outline" size="lg" className="px-6">
              {t("cancel")}
            </DialogClose>
            <Button type="submit" size="lg" disabled={isSubmitting} className="cursor-pointer px-6">
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
