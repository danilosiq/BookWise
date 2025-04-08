import { RatingType } from "@/@types/rating-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import { formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

interface ReviewCommentProps {
  reviewData: RatingType;
}

export function ReviewComment({ reviewData }: ReviewCommentProps) {
  
  return (
    <Column className="rounded-xl bg-gray-700 min-h-[134px] gap-5 p-6">
      <Row className="gap-4 items-center">
        <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-[40px] w-[40px]">
          {reviewData.user && (
            <Image
              src={reviewData.user?.avatar_url}
              alt={`${reviewData.user?.name}_image`}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
        </div>
        <Column className="flex-1">
          <Row className="items-center justify-between">
            <p className="font-bold">{reviewData.user?.name}</p>
            <RatingStars value={reviewData.rate} />
          </Row>
          {reviewData.created_at && (
            <p className="text-sm text-gray-400">
              {formatDistance(subDays(reviewData.created_at, 0), new Date(), {
                addSuffix: true,
                locale: ptBR,
              })}
            </p>
          )}
        </Column>
      </Row>
      <p className="text-gray-300 text-sm">{reviewData.description}</p>
    </Column>
  );
}
