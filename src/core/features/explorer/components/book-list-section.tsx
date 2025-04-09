"use client";
import { BookType } from "@/@types/book-type";
import listBooks from "@/core/actions/list-books";
import { Column, Row } from "@/core/components/layout";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BookInfoSheet } from "./book-info-sheet";

interface BookListSectionProps {
  filterValue?: string;
  session: any;
  searchValue?: string;
}

export function BookListSection({
  filterValue,
  session,
  searchValue,
}: BookListSectionProps) {
  const [filteredBookList, setFilteredBookList] = useState<BookType[]>([]);
  const query = useQuery({
    queryKey: ["listBooks"],
    queryFn: listBooks,
  });

  useEffect(() => {
    if (query.data) {
      let books = query.data.books;

      if (filterValue && filterValue !== "tudo") {
        books = books.filter((book: any) =>
          book.categories.some(
            (categorie: any) => categorie.category.name === filterValue
          )
        );
      }

      if (searchValue && searchValue.trim() !== "") {
        books = books.filter((book: any) =>
          book.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      setFilteredBookList(books);
    }
  }, [filterValue, query.data, searchValue]);

  return (
    <Column className="gap-5 justify-center">
      <Row className="grid grid-cols-4  max-3col:grid-cols-3 gap-5 max-2col:grid-cols-2 max-1col:grid-cols-1">
        {query.data &&
          filteredBookList.map((book: BookType) => (
            <BookInfoSheet
              key={book.id}
              book={book}
              session={session}
              sessionStatus={session.status}
            />
          ))}
      </Row>
    </Column>
  );
}
