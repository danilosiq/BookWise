import { prisma } from "@/core/lib/prisma";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req:NextRequest){
    const body = await req.json()
    const {data} = body

    const newReview = await prisma.rating.create({
        data:{
            rate:data.rate,
            description:data.description,
            book_id: data.book_id,
            user_id:data.user_id
        }
    })


    return NextResponse.json({newReview})
}