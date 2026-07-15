"use client"

import { useState } from "react"

import { ProductReviews, Review } from "@/lib/types"

import AddReviewPopup from "./AddReviewPopup"
import AllReviews from "./AllReviews"
import ReviewsRating from "./ReviewsRating"

function buildSummary(reviews: Review[]): ProductReviews {
  const totalReviews = reviews.length
  const avgRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0

  const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }))

  return {
    id: "product-reviews",
    reviews,
    totalReviews,
    avgRating,
    ratingCounts,
  }
}

const ProductReviewsClient = ({
  initialReviews,
  productSlug,
}: {
  initialReviews: ProductReviews
  productSlug: string
}) => {
  const [reviews, setReviews] = useState<ProductReviews>(initialReviews)

  const handleReviewCreated = (review: Review) => {
    setReviews((current) =>
      buildSummary([review, ...current.reviews])
    )
  }

  return (
    <>
      <ReviewsRating rate={reviews} />
      <AddReviewPopup
        productSlug={productSlug}
        onReviewCreated={handleReviewCreated}
      />
      <AllReviews reviews={reviews} />
    </>
  )
}

export default ProductReviewsClient
