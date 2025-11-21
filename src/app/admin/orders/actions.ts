"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = formData.get("orderId");
  const status = formData.get("status");

  if (!orderId || typeof orderId !== "string") {
    return;
  }

  if (!status || typeof status !== "string") {
    return;
  }

  const nextStatus = status as OrderStatus;
  if (!Object.values(OrderStatus).includes(nextStatus)) {
    return;
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: nextStatus },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin/logistics");
}
