import { BookType } from "@/@types/book-type";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import { BookmarkSimple } from "@phosphor-icons/react";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface BookPostHeaderProps {
  bookData: BookType;
}

export function BookPostHeader({ bookData }: BookPostHeaderProps) {

  
  
  return (
    <Column className="px-8 rounded-xl justify-between  pt-6  bg-gray-700 gap-10">
      <Row className="gap-8">
        <Image
          src={bookData.cover_url}
          alt={`${bookData.name}_image`}
          width={171}
          height={242}
          className="rounded-md w-[171px] h-[242px]"
        />
        <Column className="justify-between">
          <Column>
            <p className="font-bold text-lg">{bookData.name}</p>
            <p className="text-sm text-gray-400">{bookData.author}</p>
          </Column>
          <Column>
            <RatingStars value={bookData.averageRating} />
            <p className="text-sm text-gray-400">
              {bookData.ratings.length} Avaliações
            </p>
          </Column>
        </Column>
      </Row>

      <Row className="border-t py-6 border-gray-600 gap-14">
        <Row className="items-center gap-4">
          <BookmarkSimple color="#50B2C0" size={24} />
          <Column>
            <p className="text-sm text-gray-400">Categoria</p>
            <Column>
              {bookData.categories.map((categorie) => (
                <p className="font-bold" key={categorie.category.id}>
                  {categorie.category.name}
                </p>
              ))}
            </Column>
          </Column>
        </Row>

        <Row className="items-center gap-4">
          <BookOpen color="#50B2C0" size={24} />
          <Column>
            <p className="text-sm text-gray-400">paginas</p>
            <p className="font-bold">{bookData.total_pages}</p>
          </Column>
        </Row>
      </Row>
    </Column>
  );
}
