import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Informe o nome da categoria"),
  slug: z.string().min(2, "Informe o slug"),
  description: z.string().optional().nullable(),
  heroImage: z.string().url().optional().nullable(),
});

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  highlights: z.array(z.string()).optional().default([]),
  image: z.string().url().optional().or(z.literal("")).nullable(),
  gallery: z.array(z.string().url()).optional().default([]),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().optional().nullable(),
  stock: z.coerce.number().int().nonnegative(),
  isFeatured: z.coerce.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  categoryId: z.string().optional().nullable(),
});

export const priceListSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  description: z.string().optional().nullable(),
  isDefault: z.boolean().default(false),
  currency: z.string().min(3).default("BRL"),
});

export const siteSettingsSchema = z.object({
  heroTitle: z.string().min(3),
  heroSubtitle: z.string().min(3),
  heroHighlight: z.string().optional().nullable(),
  aboutHeading: z.string().optional().nullable(),
  aboutBody: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(8),
  addressLine: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(5),
  storeHours: z.string().optional().nullable(),
  shippingInfo: z.string().optional().nullable(),
  returnPolicy: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  bannerCta: z.string().optional().nullable(),
});

export const integrationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  provider: z.string().min(2),
  type: z.enum(["SHIPPING", "PAYMENTS", "ERP", "CRM", "OTHER"]),
  apiKey: z.string().optional().nullable(),
  baseUrl: z.string().optional().nullable(),
  active: z.boolean().optional(),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(3),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(8),
  addressLine: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(5),
  notes: z.string().optional().nullable(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().int(),
    }),
  ),
  total: z.number().positive(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type IntegrationInput = z.infer<typeof integrationSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type PriceListInput = z.infer<typeof priceListSchema>;
