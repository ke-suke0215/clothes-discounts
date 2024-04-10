import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

/**
 * ItemをIDから検索する.
 */
export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  const itemId = params.itemId;
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(itemId),
    },
  });

  return NextResponse.json(item);
}
