import { prisma } from "@/core/lib/prisma";
import { NextResponse } from "next/server";




export async function GET(){


    const book = await prisma.book.findMany({
        include:{
            ratings:true,
            
            categories:{
                include:{category:true}
            }
            
        }
    })
  const books = book.map(book => {
    const totalRatings = book.ratings.length;
    const averageRating =
      totalRatings > 0
        ? book.ratings.reduce((sum, rating) => sum + rating.rate, 0) / totalRatings
        : 0;

    return {
      ...book,
      averageRating,
    };
  });
    return NextResponse.json({books})
    
}

