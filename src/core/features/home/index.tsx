"use client";
import getLastBookReaded from "@/core/actions/get-last-review";
import listPopularBooks from "@/core/actions/list-popular-books";
import listRecentReviews from "@/core/actions/list-recent-reviews";
import { Column, Row } from "@/core/components/layout";
import { Sidebar } from "@/core/components/sidebar";
import { Skeleton } from "@/core/components/skeleton";
import { BookReviewCard } from "@/core/features/home/components/book-review-card";
import { CaretRight, ChartLineUp } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookCardSm } from "./components/book-card-sm";
import { LastPostCard } from "./components/last-post-card";

export function HomeScreen() {
  const router = useRouter();
  const session = useSession();

  const queryBooks = useQuery({
    queryKey: ["listPopularBooks"],
    queryFn: listPopularBooks,
  });

  const queryLastReview = useQuery({
    queryKey: ["getLastReview"],
    queryFn: () => getLastBookReaded(session.data?.user.id),
    enabled: !!session.data?.user.id,
  });

  const queryRecentReviews = useQuery({
    queryKey: ["listRecentReviews"],
    queryFn: listRecentReviews,
  });

  return (
    <>
      {session.status != "loading" && (
        <Row className=" gap-3.5 pr-1">
          <section className=" w-[252px] pl-5  pt-5 relative  bg-blue">
            <div className=" h-[calc(100vh-36px)] fixed">
              <Sidebar
                avatar_url={session.data?.user.avatar_url}
                username={session.data?.user.name}
                isLoading={session.status}
              />
            </div>
          </section>
          <section className="flex flex-1 justify-center ">
            <Column>
              <Row className="gap-3 mb-10 mt-[72px] ">
                <ChartLineUp size={32} color="#50B2C0" />
                <p className="font-bold text-2xl">Início</p>
              </Row>
              <Row className="gap-6">
                <Column className="gap-3">
                  {session.status === "authenticated" && (
                    <Column className="gap-4">
                      <Row className="justify-between">
                        <p className="text-sm">Sua última leitura</p>
                        <p
                          className="text-purple-100 flex items-center"
                          onClick={() => router.push("/profile")}
                        >
                          Ver todos <CaretRight size={16} />
                        </p>
                      </Row>
                      <LastPostCard bookData={queryLastReview.data} />
                    </Column>
                  )}

                  <p className="text-sm">Avaliações mais recentes</p>
                  {queryRecentReviews.data
                    ? queryRecentReviews.data
                        .slice(0, 20)
                        .map((review) => (
                          <BookReviewCard reviewData={review} key={review.id} />
                        ))
                    : Array.from({ length: 20 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          height={150}
                          width={600}
                          shape="square"
                        />
                      ))}
                </Column>
                <Column className="h-[602px] w-[324px] hidden lg:block">
                  <Row className="w-full justify-between">
                    <p className="">Livros populares</p>
                    <p className="text-purple-100 flex items-center">
                      Ver todos <CaretRight size={16} />
                    </p>
                  </Row>
                  <Column className="gap-3">
                    {queryBooks.data?.topFivePopularBooks
                      ?.slice(0, 5)
                      .map((book) => (
                        <BookCardSm book={book} key={book.id} />
                      ))}
                  </Column>
                </Column>
              </Row>
            </Column>
          </section>
        </Row>
      )}
    </>
  );
}
