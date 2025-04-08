import { BookType } from "@/@types/book-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import Image from "next/image";
import { useState } from "react";

interface BookCardMdProps{
  book:BookType

}

export function BookCardMd({book}:BookCardMdProps) {

  const [isReaded, setIsReaded] = useState<boolean>(false);
  return (
    <Row className="min-w-[318px]  hover:bg-gray-600 cursor-pointer w-full gap-5 relative h-[184px] bg-gray-700 rounded-lg px-5 py-4">
      <Image
        src={book.cover_url}
        alt="mockImage"
        width={108}
        height={152}
        className="w-[108px] h-[152px] rounded-sm"
      />
      <Column className="justify-between  text-start">
        <Column>
          <p className=" font-bold first-letter:uppercase">{book.name}</p>
          <p className="text-gray-400 text-sm first-letter:uppercase">{book.author}</p>
        </Column>
        <RatingStars value={book.averageRating} />
      </Column>
      {isReaded && (
        <div className="bg-green-200 w-[53px] right-0 flex items-center justify-center h-[24px] absolute top-0 rounded-tr-sm rounded-bl-sm">
          <p className="text-green-100 text-xs font-bold">LIDO</p>
        </div>
      )}
    </Row>
  );
}
