import { prisma } from "@/core/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    

    const profileID = req.nextUrl.searchParams.get("profileID");

    if (!profileID) {
      return NextResponse.json(
        { error: "profileID is required" },
        { status: 400 }
      );
    }
  
    const profile = await prisma.user.findUnique({
      where: {
        id: profileID,
      },
      include: {
        ratings: { include: { book: true } },
      },
    });

    if (!profile) {
        return NextResponse.json(
          { error: "profile not fonded" },
          { status: 404 }
        );
      }

const sortedRatings = profile?.ratings.sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

const lastBookReaded = sortedRatings[0].book

return NextResponse.json(lastBookReaded)
}