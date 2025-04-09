"use client";
import { CategoryType } from "@/@types/category-type";
import listCategories from "@/core/actions/list-categories";
import { Column, Row } from "@/core/components/layout";
import { Menu } from "@/core/components/menu";
import { SearchInputText } from "@/core/components/search-input-text";
import { Sidebar } from "@/core/components/sidebar";
import { Binoculars } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BookListSection } from "./components/book-list-section";

export function ExplorerScreen() {
  const [category, setCategory] = useState<string>("tudo");
  const [searchValue, setSearchValue] = useState<string>("");
  const session = useSession();

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });

  return (
    <>
      {session.status != "loading" && (
        <Row className=" gap-3.5 pr-5 max-sm:pl-5">
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

          <section className="flex flex-1  mb-[200px]  justify-center ">
            <Menu
              avatar_url={session.data?.user.avatar_url}
              username={session.data?.user.name}
              isLoading={session.status}
            />
            <Column className=" max-w-[1330px] w-full">
              <Column className="gap-10 mb-11 mt-[72px] ">
                <div className="justify-between flex max-sm:flex-col gap-5 items-center">
                  <Row className="gap-3 ">
                    <Binoculars size={32} color="#50B2C0" />
                    <p className="font-bold text-2xl">Explorar</p>
                  </Row>
                  <div className="max-w-[433px] w-full">
                    <SearchInputText
                      placeholder="Busque por algum livro"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>

                <Row className="gap-3 overflow-x-auto h-14 w-full relative scrollbar-styled">
                  <Row className="flex-row gap-3 absolute w-full h-10">
                    <div
                      className={`px-4 py-1 flex w-full items-center justify-center border cursor-pointer border-purple-200 hover:bg-purple-200 hover:border-purple-100 rounded-full ${
                        category === "tudo"
                          ? "bg-purple-200 text-gray-100"
                          : "bg-transparent text-purple-100"
                      }`}
                      onClick={() => setCategory("tudo")}
                    >
                      <p className="whitespace-nowrap truncate">Tudo</p>
                    </div>
                    {query.data &&
                      query.data.categories.map((categorie: CategoryType) => (
                        <div
                          className={`px-4 py-1 flex w-full items-center justify-center border cursor-pointer border-purple-200 hover:bg-purple-200 hover:border-purple-100 rounded-full ${
                            category === categorie.name
                              ? "bg-purple-200 text-gray-100"
                              : "bg-transparent text-purple-100"
                          }`}
                          onClick={() => setCategory(categorie.name)}
                          key={categorie.id}
                        >
                          <p className="whitespace-nowrap truncate">
                            {categorie.name}
                          </p>
                        </div>
                      ))}
                  </Row>
                </Row>
              </Column>

              <BookListSection
                filterValue={category}
                session={session}
                searchValue={searchValue}
              />
            </Column>
          </section>
        </Row>
      )}
    </>
  );
}
