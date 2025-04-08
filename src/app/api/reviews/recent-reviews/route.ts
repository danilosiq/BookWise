import { prisma } from "@/core/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const reviews = await prisma.rating.findMany({
    include: { user: true, book: true },
  });

  const dailyReviews = reviews.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return NextResponse.json(dailyReviews);
}
