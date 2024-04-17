import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

/**
 * 割引日付をItemIdから検索する.
 */
export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;
  const limitedDiscounts = await prisma.limitedDiscount.findMany({
    where: {
      itemId: parseInt(itemId),
    },
  });

  return NextResponse.json(limitedDiscounts);
}
