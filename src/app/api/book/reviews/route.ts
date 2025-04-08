import { prisma } from "@/core/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get("bookId")

  if(bookId){
    const reviews = await prisma.rating.findMany({
    where: { book_id: bookId },
    include:{user:true}
  });

  return NextResponse.json({ reviews });
  }
  

}
