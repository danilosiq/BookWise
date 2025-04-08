import { BookType } from "@/@types/book-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import { formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

interface LasPostCardProps {
  bookData?: BookType;
}

export function LastPostCard({ bookData }: LasPostCardProps) {

  return (
    <>
      {bookData && (
        <Row className="max-w-[608px] h-[192px] bg-gray-600 rounded-lg gap-6 py-5 px-6">
          <Image
            src={bookData.cover_url}
            alt={`${bookData.name}_image`}
            width={108}
            height={152}
            className="h-[152px] w-[108px] rounded-sm"
          />
          <Column>
            <Row className="justify-between mb-3">
              <p className="text-gray-300 text-sm">
                {formatDistance(subDays(bookData.created_at!, 0), new Date(), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </p>
              <RatingStars value={bookData.averageRating} />
            </Row>
            <Column className="mb-6">
              <p className="text-md font-bold">{bookData.name}</p>
              <p className="text-sm text-gray-400">{bookData.author}</p>
            </Column>
            <p className="line-clamp-2 text-sm text-gray-300">
              {bookData.summary}
            </p>
          </Column>
        </Row>
      )}
    </>
  );
}
