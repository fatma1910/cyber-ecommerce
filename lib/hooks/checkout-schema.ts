import { z } from "zod";

export const paymentMethodValues = ["cash", "card", "instapay"] as const;

export type PaymentMethodValue = (typeof paymentMethodValues)[number];

export type CheckoutFormValues = {
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  shipping: {
    country: string;
    city: string;
    streetAddress: string;
    buildingNumber: string;
    floor?: string;
    apartment?: string;
    postalCode?: string;
    additionalNotes?: string;
  };
  paymentMethod: PaymentMethodValue;
};

type CheckoutValidationMessages = {
  fullNameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  cityRequired: string;
  cityInvalid: string;
  streetAddressRequired: string;
  buildingNumberRequired: string;
};

export function buildCheckoutSchema(
  cityValues: string[],
  messages: CheckoutValidationMessages
) {
  return z.object({
    contact: z.object({
      fullName: z
        .string()
        .trim()
        .min(1, messages.fullNameRequired),
      email: z
        .string()
        .trim()
        .min(1, messages.emailRequired)
        .email(messages.emailInvalid),
      phone: z
        .string()
        .trim()
        .min(1, messages.phoneRequired),
    }),
    shipping: z.object({
      country: z.string().optional(),
      city: z
        .string()
        .trim()
        .min(1, messages.cityRequired)
        .refine((value) => cityValues.includes(value), {
          message: messages.cityInvalid,
        }),
      streetAddress: z
        .string()
        .trim()
        .min(1, messages.streetAddressRequired),
      buildingNumber: z
        .string()
        .trim()
        .min(1, messages.buildingNumberRequired),
      floor: z.string().optional(),
      apartment: z.string().optional(),
      postalCode: z.string().optional(),
      additionalNotes: z.string().optional(),
    }),
    paymentMethod: z.enum(paymentMethodValues),
  });
}
