import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

/**
 * Itemの名前で曖昧検索する.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  // nameが空なら空の配列を返す
  if (!name || name === "") return NextResponse.json([]);

  const items = await prisma.item.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    orderBy: {
      addedOn: "desc",
    },
  });
  return NextResponse.json(items);
}
