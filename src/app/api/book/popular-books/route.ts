




import { prisma } from "@/core/lib/prisma";
import { NextResponse } from "next/server";




export async function GET(){

    const book = await prisma.book.findMany({
        include:{ratings:true}
    })

    const booksWithAverageRating = book.map(book => {
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

      const popularBooks = booksWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

    const topFivePopularBooks = popularBooks.slice(0,5)
    return NextResponse.json({topFivePopularBooks})
}