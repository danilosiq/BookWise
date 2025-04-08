import { BookType } from "@/@types/book-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import Image from "next/image";

interface BookCardSmProps{
  book:BookType
}

export function BookCardSm({book}:BookCardSmProps) {
  return (
    <Row className="bg-gray-700 rounded-lg items-center px-4 gap-5 py-4 w-[324px] h-[130px] ">
      <Image
        src={book.cover_url}
        alt={`${book.name}_image`}
        height={94}
        width={64}
        className="rounded-sm w-[64px] h-[94px]"
      />
      <Column className="justify-between h-full">
        <div>
          <p className="text-md font-bold">{book.name}</p>
          <p className="text-gray-400 text-sm">{book.author}</p>
        </div>
        <RatingStars value={book.averageRating} />
      </Column>
    </Row>
  );
}
