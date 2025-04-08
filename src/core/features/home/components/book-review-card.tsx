import { formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RatingType } from "../../../../@types/rating-type";
import { Column, Row } from "../../../components/layout";
import { RatingStars } from "../../../components/rating-stars";

interface BookReviewCardProps {
  reviewData: RatingType;
}

export function BookReviewCard({ reviewData }: BookReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const router = useRouter();
  return (
    <div onClick={() => router.push(`user/${reviewData.user_id}`)}>
      <Column className="max-w-[608px] w-full gap-9 hover:bg-gray-600 cursor-pointer justify-between p-6 rounded-sm bg-gray-700">
        <Row className="justify-between">
          <Row className="gap-4">
            <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-10 w-10">
              {reviewData.user?.avatar_url && (
                <Image
                  src={reviewData.user?.avatar_url}
                  alt={`${reviewData.user?.name}_Profile_Image`}
                  width={36}
                  height={36}
                  className="rounded-full object-cover h-9 w-9"
                />
              )}
            </div>
            <Column>
              <p className="text-md">{reviewData.user?.name}</p>
              <p className="text-sm text-gray-400">
                {" "}
                {formatDistance(
                  subDays(reviewData.created_at!, 0),
                  new Date(),
                  {
                    addSuffix: true,
                    locale: ptBR,
                  }
                )}
              </p>
            </Column>
          </Row>
          <RatingStars value={reviewData.rate} />
        </Row>

        <Row className="gap-5">
          <Image
            src={reviewData.book?.cover_url!}
            alt={`${reviewData.book?.name}_Image`}
            width={108}
            height={152}
            className="h-[152px] w-[108px]"
          />
          <Column className="justify-between">
            <Column>
              <p className="text-md font-bold">{reviewData.book?.name}</p>
              <p className="text-sm text-gray-400">{reviewData.book?.author}</p>
            </Column>

            <Column>
              <p
                className={`${isExpanded ? "line-clamp-4" : ""} text-gray-300`}
              >
                {reviewData.description}
              </p>
              <p
                className="text-purple-100 font-bold cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "ver mais" : "ver menos"}
              </p>
            </Column>
          </Column>
        </Row>
      </Column>
    </div>
  );
}
