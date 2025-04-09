"use client";
import { RatingType } from "@/@types/rating-type";
import getProfile from "@/core/actions/get-profile";
import { Column, Row } from "@/core/components/layout";
import { Menu } from "@/core/components/menu";
import { SearchInputText } from "@/core/components/search-input-text";
import { Sidebar } from "@/core/components/sidebar";
import { Skeleton } from "@/core/components/skeleton";
import {
  BookmarkSimple,
  BookOpen,
  Books,
  User,
  UserList,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookCardReviewLg } from "./components/book-card-review-lg";

export function ProfileScreen() {
  const session = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const query = useQuery({
    queryKey: ["getProfile", session.data?.user.id],
    queryFn: () => getProfile(session.data?.user.id),
    enabled: !!session.data?.user.id,
  });
  const [filteredBookList, setFilteredBooklist] = useState<RatingType[]>(query.data?.profile.ratings || []);


  useEffect(() => {
    if (!query.data) return;
    const filteredList = query.data?.profile.ratings.filter((rating) =>
      rating.book?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if(query.data){
      setFilteredBooklist(query.data.profile.ratings)
    }
    setFilteredBooklist(filteredList);
  }, [searchQuery, query.data]);

  if (session.status == "unauthenticated") {
    router.push("/access");
  }
  return (
    <Row className=" gap-3.5">
      <section className=" w-[252px]  pl-5  relative max-sm:hidden">
            <p className="invisible w-[252px]">.</p>
            <div className=" h-[calc(100vh-36px)] fixed">
              <Sidebar
                avatar_url={session.data?.user.avatar_url}
                username={session.data?.user.name}
                isLoading={session.status}
              />
            </div>
          </section>
          <section className=" pb-[300px] m-auto pr-3 max-sm:pl-3 flex flex-col w-[896px]">
            <Menu
              avatar_url={session.data?.user.avatar_url}
              username={session.data?.user.name}
              isLoading={session.status}
            />
        <Row className="gap-3 mb-10 mt-[72px] w-full flex-1 ">
          <User size={32} color="#50B2C0" />
          <p className="font-bold text-2xl">Perfil</p>
        </Row>

        <Row className="gap-16 w-full  flex-1">
          <Column className="  w-full gap-8">
            <SearchInputText
              value={searchQuery}
              placeholder="Buscar livro avaliado"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Column className="gap-6  h-1 w-full">
              {filteredBookList &&
                filteredBookList.map((review: any) => (
                  <BookCardReviewLg reviewData={review} key={review.id} />
                ))}
            </Column>
          </Column>

          {session.status == "loading" ? (
            <div className="h-[555px w-[308px] rounded-md bg-gray-700 animate-pulse" />
          ) : (
            <Column className=" h-[555px] border-l border-gray-700 pl-3 items-center w-[308px] max-mediaWith-930:hidden">
              <Column className="items-center">
                <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-[72px] w-[72px]">
                  {session.data && (
                    <Image
                      src={session.data?.user.avatar_url}
                      alt="mockImage"
                      width={68}
                      height={68}
                      className="h-[68px] w-[68px] rounded-full"
                    />
                  )}
                </div>
                <p>{session.data && session.data.user.name}</p>
                <p className="text-gray-400">
                  membro desde{" "}
                  {query.data &&
                    new Date(query.data.profile.created_at).getFullYear()}
                </p>
              </Column>
              <div className="my-8 w-8 h-1 rounded-xl bg-gradient-to-r from-[#7FD1CC] to-[#9694F5]" />
              <Column className="gap-10">
                <Row className="gap-5 items-center">
                  <BookOpen color="#50B2C0" size={32} />
                  <Column>
                    {!query.isLoading && query.data ? (
                      <p className="text-[16px] font-bold">
                        {query.data.totalPagesReaded}
                      </p>
                    ) : (
                      <Skeleton height={16} width={150} shape="square" />
                    )}
                    <p className="text-sm text-gray-400">Páginas lidas</p>
                  </Column>
                </Row>
                <Row className="gap-5 items-center">
                  <Books color="#50B2C0" size={32} />
                  <Column>
                    <p className="text-[16px] font-bold">
                      {query.data && query.data.profile.ratings.length}
                    </p>
                    <p className="text-sm text-gray-400">Livros avaliados</p>
                  </Column>
                </Row>
                <Row className="gap-5 items-center">
                  <UserList color="#50B2C0" size={32} />
                  <Column>
                    <p className="text-[16px] font-bold">
                      {query.data && query.data.totalAuthorReaded}
                    </p>
                    <p className="text-sm text-gray-400">Autores lidos</p>
                  </Column>
                </Row>
                <Row className="gap-5 items-center">
                  <BookmarkSimple color="#50B2C0" size={32} />
                  <Column>
                    <p className="text-[16px] font-bold">
                      {query.data && query.data.mostReadCategory}
                    </p>
                    <p className="text-sm text-gray-400">Categoria mais lida</p>
                  </Column>
                </Row>
              </Column>
            </Column>
          )}
        </Row>
      </section>
    </Row>
  );
}
