import { BookType } from "@/@types/book-type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import listBookReviews from "@/core/actions/list-book-reviews";
import postReview from "@/core/actions/post-review";
import { AccessDialog } from "@/core/components/access-dialog";
import { Column, Row } from "@/core/components/layout";
import { RatingStars } from "@/core/components/rating-stars";
import { TextArea } from "@/core/components/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { BookCardMd } from "./book-card-md";
import { BookPostHeader } from "./book-post-header";
import { ReviewComment } from "./review-comment";

const ReviewSchema = z.object({
  user_id: z.string(),
  rate: z.number(),
  description: z.string().min(1, "adicione pelo menos um comentario"),
  book_id: z.string(),
});

interface BookInfoSheetProps {
  sessionStatus: "loading" | "authenticated" | "unauthenticated";
  book: BookType;
  session: any;
}

type ReviewType = z.infer<typeof ReviewSchema>;

export function BookInfoSheet({
  sessionStatus,
  book,
  session,
}: BookInfoSheetProps) {
  const [reviewBoxVisibility, setReviewBoxVisibility] =
    useState<boolean>(false);
  const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReviewType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      book_id: book.id,
      rate: 0,
      user_id: sessionStatus === 'authenticated' ? session.data.user.id : '',    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      toast.success('Review publicado com sucesso!')
      reset();


      queryClient.refetchQueries({ queryKey: ["listBooks"] });
      queryClient.refetchQueries({ queryKey: ["bookReviews"] });
    },
  });

  const query = useQuery({
    queryKey: ["bookReviews", book.id],
    queryFn: () => listBookReviews(book.id),
    enabled: !!book.id,
  });

  function handleEnableReviewbox() {
    if (sessionStatus === "authenticated") {
      setReviewBoxVisibility(true);
    }
    if (sessionStatus === "unauthenticated") {
      setDialogVisibility(true);
    }
  }

  function handleReviewSubmit(data: ReviewType) {
    setReviewBoxVisibility(false);
    mutation.mutate({
      book_id: data.book_id,
      description: data.description,
      rate: data.rate,
      user_id: data.user_id,
    });
 
  }
  return (
    <Sheet>
      <SheetTrigger>
        <BookCardMd book={book} />
      </SheetTrigger>
      <SheetContent className=" pb-44 max-w-[600px] px-12 overflow-y-auto scrollbar-styled">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <BookPostHeader bookData={book} />

        <Column className="gap-4">
          <Row className="justify-between">
            <p className="text-sm">Avaliações</p>
            <p
              onClick={handleEnableReviewbox}
              className="text-sm font-bold cursor-pointer text-purple-100 border-b border-b-transparent hover:border-b-purple-100 hover:text-purple-50"
            >
              Avaliar
            </p>
          </Row>

          {reviewBoxVisibility && (
            <form action="" onSubmit={handleSubmit(handleReviewSubmit)}>
              <Column className="bg-gray-700 gap-3 rounded-xl p-6">
                <Row className="items-center justify-between">
                  <Row className=" items-center gap-4">
                    <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-[40px] w-[40px]">
                      <Image
                        src={session.data.user.avatar_url}
                        alt={`${session.data.user.name}_image`}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    </div>
                    <p className="font-bold">{session.data.user.name}</p>
                  </Row>
                  <Controller
                    name="rate"
                    control={control}
                    render={({ field }) => (
                      <RatingStars
                        value={field.value}
                        onChange={(newValue) => field.onChange(newValue)}
                      />
                    )}
                  />
                </Row>
                <TextArea
                  {...register("description")}
                  placeholder="Escreva sua avaliação"
                  maxLength={450}
                />
                <Row className="gap-2 justify-end">
                  <button
                    disabled={mutation.isPending}
                    type="button"
                    onClick={() => setReviewBoxVisibility(false)}
                    className={`w-10 bg-gray-600 h-10 hover:bg-gray-500  rounded-sm flex items-center justify-center ${
                      mutation.isPending
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <X color="#8381D9" size={24} />
                  </button>
                  <button
                    disabled={mutation.isPending}
                    type="submit"
                    className={`w-10 bg-gray-600 h-10 hover:bg-gray-500  rounded-sm flex items-center justify-center ${
                      mutation.isPending
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <Check color="#50B2C0" size={24} />
                  </button>
                </Row>
              </Column>
            </form>
          )}

          <AccessDialog
            open={dialogVisibility}
            onClose={() => setDialogVisibility(false)}
          />

          <Column className="gap-3">
            {query.data &&
              query.data.reviews.map((review: ReviewType, i: number) => (
                <ReviewComment reviewData={review} key={i} />
              ))}
          </Column>
        </Column>
      </SheetContent>
    </Sheet>
  );
}
