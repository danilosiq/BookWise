"use client";
import { RatingType } from "@/@types/rating-type";
import getUser from "@/core/actions/get-user";
import { Column, Row } from "@/core/components/layout";
import { SearchInputText } from "@/core/components/search-input-text";
import { Sidebar } from "@/core/components/sidebar";
import { Skeleton } from "@/core/components/skeleton";
import {
  BookmarkSimple,
  BookOpen,
  Books,
  CaretLeft,
  UserList,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BookCardReviewLg } from "../../profile/components/book-card-review-lg";

export function UserScreen() {
  const session = useSession();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const params = useParams();
  const userId = params?.id as string;

  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });


  const [filteredBookList, setFilteredBooklist] = useState<RatingType[]>(
    query.data?.user.ratings || []
  );

  useEffect(() => {
    if (!query.data) return;
    const filteredList = query.data?.user.ratings.filter((rating) =>
      rating.book?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (query.data) {
      setFilteredBooklist(query.data.user.ratings);
    }
    setFilteredBooklist(filteredList);
  }, [searchQuery, query.data]);

  return (
    <Row className=" gap-3.5">
      <section className=" w-[252px] pl-5  pt-5 relative">
      <p className="invisible w-[252px]">.</p>

        <div className=" h-[calc(100vh-36px)] fixed">
          <Sidebar
            avatar_url={session.data?.user.avatar_url}
            username={session.data?.user.name}
            isLoading={session.status}
          />
        </div>
      </section>
      <section className="  m-auto pr-3 flex flex-col w-[896px]">
        <Row className="  text-gray-100 mb-10 mt-[72px] ">
          <Row className="cursor-pointer gap-3 items-center border-b-2 border-transparent hover:border-purple-100">
            <CaretLeft size={20} />
            <p className="font-bold ">Voltar</p>
          </Row>
        </Row>
        <Row className="gap-16">
          <Column className="max-w-[624px] gap-8">
            <SearchInputText
              value={searchQuery}
              placeholder="Buscar livro avaliado"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Column className="gap-6">
              {filteredBookList &&
                filteredBookList.map((review: any) => (
                  <BookCardReviewLg reviewData={review} key={review.id} />
                ))}
            </Column>
          </Column>
          <Column className=" h-[555px] border-l border-gray-700 items-center w-[308px] max-mediaWith-930:hidden">
            <Column className="items-center">
              <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-[72px] w-[72px]">
                {query.data ? (
                  <Image
                    src={query.data?.user.avatar_url}
                    alt={`${query.data.user.name}_image`}
                    width={68}
                    height={68}
                    className="h-[68px] w-[68px] rounded-full"
                  />
                ) : (
                  <Skeleton height={68} shape="circle" width={68} />
                )}
              </div>
              {query.data ? (
                <>
                  <p>Danilo Dante</p>
                  <p className="text-gray-400">membro desde 2020</p>
                </>
              ) : (
                <Skeleton width={"full"} height={20} shape="square" />
              )}
            </Column>
            <div className="my-8 w-8 h-1 rounded-xl bg-gradient-to-r from-[#7FD1CC] to-[#9694F5]" />
            <Column className="gap-10">
              <Row className="gap-5 items-center">
                <BookOpen color="#50B2C0" size={32} />
                <Column>
                  {query.data ? (
                    <>
                      <p className="text-[16px] font-bold">
                        {query.data.totalPagesReaded}
                      </p>
                      <p className="text-sm text-gray-400">Páginas lidas</p>
                    </>
                  ) : (
                    <Skeleton width={"full"} height={20} shape="square" />
                  )}
                </Column>
              </Row>
              <Row className="gap-5 items-center">
                <Books color="#50B2C0" size={32} />
                <Column>
                  {query.data ? (
                    <>
                      <p className="text-[16px] font-bold">
                        {query.data.user.ratings.length}
                      </p>
                      <p className="text-sm text-gray-400">avaliações</p>
                    </>
                  ) : (
                    <Skeleton width={"full"} height={20} shape="square" />
                  )}
                </Column>
              </Row>
              <Row className="gap-5 items-center">
                <UserList color="#50B2C0" size={32} />
                <Column>
                  {query.data ? (
                    <>
                      <p className="text-[16px] font-bold">
                        {query.data.totalAuthorReaded}
                      </p>
                      <p className="text-sm text-gray-400">Autores lidos</p>
                    </>
                  ) : (
                    <Skeleton width={"full"} height={20} shape="square" />
                  )}
                </Column>
              </Row>
              <Row className="gap-5 items-center">
                <BookmarkSimple color="#50B2C0" size={32} />
                <Column>
                  {query.data ? (
                    <>
                      <p className="text-[16px] font-bold">
                        {query.data.mostReadCategory}
                      </p>
                      <p className="text-sm text-gray-400">
                        Categoria mais lida
                      </p>
                    </>
                  ) : (
                    <Skeleton width={"full"} height={20} shape="square" />
                  )}
                </Column>
              </Row>
            </Column>
          </Column>
        </Row>
      </section>
    </Row>
  );
}
