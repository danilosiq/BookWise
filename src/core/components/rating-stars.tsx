import { Star } from "@phosphor-icons/react";
import { useState } from "react";
import { Row } from "./layout";

interface RatingStarsProps {
  value?: number;
  onChange?: (ratingValue: number) => void;
}

export function RatingStars({ value = 0, onChange }: RatingStarsProps) {
  const [ratingValue, setRatingValue] = useState<number>(value);
  function handleSetValue(num: number) {
    setRatingValue(num);
    if (onChange) {
      onChange(num);
    }
  }
  return (
    <Row className="w-[96px] h-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight={i < ratingValue ? "fill" : "regular"}
          color="#8381D9"
          onClick={() => onChange && handleSetValue(i+1)}
          className={`${onChange && 'cursor-pointer'}`}
        />
      ))}
    </Row>
  );
}
