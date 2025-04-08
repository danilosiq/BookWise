import { RatingType } from "@/@types/rating-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import { formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

interface BookCardReviewProps {
  reviewData: RatingType;
}

export function BookCardReviewLg({ reviewData }: BookCardReviewProps) {
  return (
    <Column className="w-full">
      <p className="text-sm ">
        {formatDistance(subDays(reviewData.created_at!, 0), new Date(), {
          addSuffix: true,
          locale: ptBR,
        })}
      </p>
      <Column className="p-6 gap-6 rounded-lg bg-gray-700">
        <Row className="gap-6">
          <Image
            src={reviewData.book?.cover_url!}
            alt={`${reviewData.book?.name}_image`}
            width={98}
            height={134}
            className="h-[134px] w-[98px] rounded-sm"
          />
          <Column className="justify-between">
            <Column>
              <p className="text-md font-bold">{reviewData.book?.name}</p>
              <p className="text-xs text-gray-400">{reviewData.book?.author}</p>
            </Column>
            <RatingStars value={reviewData.rate} />
          </Column>
        </Row>
        <Column>
          <p>{reviewData.description}</p>
        </Column>
      </Column>
    </Column>
  );
}
