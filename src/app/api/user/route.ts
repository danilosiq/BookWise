import { prisma } from "@/core/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userID = req.nextUrl.searchParams.get("userID");

  if (!userID) {
    return NextResponse.json(
      { error: "userID is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      ratings: { include: { book: true } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const rating = await prisma.rating.findMany({
    where: { user_id: user.id },
    include: {
      book: { include: { categories: { include: { category: true } } } },
    },
  });

  const totalPagesReaded = rating.reduce(
    (acc, pages) => acc + pages.book.total_pages,
    0
  );

  const uniqueAuthors = new Set(rating.map((item) => item.book.author));

  const totalAuthorReaded = uniqueAuthors.size;

  const allCategoryNames = rating.flatMap((r) =>
    r.book.categories.map((c) => c.category.name)
  );

  const categoryCount = allCategoryNames.reduce((acc, name) => {
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostReadCategory = Object.entries(categoryCount).reduce(
    (most, current) => (current[1] > most[1] ? current : most)
  )[0];

  return NextResponse.json({
    user,
    totalAuthorReaded,
    mostReadCategory,
    totalPagesReaded,
  });
}
