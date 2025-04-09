import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import LogoBookWise from "@/core/assets/icons/logo-bookWise.svg";
import {
    Binoculars,
    ChartLineUp,
    SignIn,
    SignOut,
    User,
} from "@phosphor-icons/react";
import { MenuIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccessDialog } from "./access-dialog";
import { Column } from "./layout";
import { Skeleton } from "./skeleton";

interface MenuProps {
  username?: string | null;
  avatar_url?: string | null;
  isLoading: "loading" | "authenticated" | "unauthenticated";
}

export function Menu({ isLoading, avatar_url, username }: MenuProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const pathname = usePathname();
  const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);

  function handleLogout() {
    signOut();
    router.push("/access");
  }

  useEffect(() => {
    if (username) {
      setIsLogged(true);
    }
  }, [username]);
  const router = useRouter();
  const sidebarOptions = [
    {
      value: "home",
      label: "inicio",
      onSelect: () => router.push("/home"),
      icon: <ChartLineUp size={24} />,
      enabled: true,
    },
    {
      value: "explorer",
      label: "Explorar",
      onSelect: () => router.push("/explorer"),
      icon: <Binoculars size={24} />,
      enabled: true,
    },
    {
      value: "profile",
      label: "Perfil",
      onSelect: () => router.push("/profile"),
      icon: <User size={24} />,
      enabled: isLogged,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden fixed z-30 right-5 bottom-10">
        <div className="bg-gradient-to-b cursor-pointer from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-12 w-12">
          <MenuIcon size={25} />
        </div>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <Column className=" h-full items-center relative rounded-xl">
          <Image src={LogoBookWise} alt="BookWise Logo" />
          <AccessDialog
            open={dialogVisibility}
            onClose={() => setDialogVisibility(false)}
          />
          <Column className="z-10 my-10 items-center ">
            <Column className=" gap-4 mt-3 mb-10 relative">
              {sidebarOptions.map((option) => {
                const isSelected = pathname.includes(option.value);
                if (option.enabled) {
                  return (
                    <div
                      className={`flex items-start gap-3 cursor-pointer  ${
                        isSelected
                          ? "text-gray-100 font-bold"
                          : "font-normal text-gray-400"
                      }`}
                      key={option.value}
                      onClick={option.onSelect}
                    >
                      <div
                        className={`w-1 h-6  rounded-3xl ${
                          isSelected &&
                          "bg-gradient-to-b from-[#7FD1CC] to-[#9694F5]"
                        } `}
                      />
                      {option.icon}
                      <p>{option.label}</p>
                    </div>
                  );
                }
              })}
            </Column>

            {isLoading !== "loading" ? (
              <>
                {isLogged ? (
                  <div className="  px-2.5 bottom-8 flex gap-3 items-center">
                    <div className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-full  flex justify-center items-center h-7 w-7">
                      {avatar_url ? (
                        <Image
                          src={avatar_url}
                          alt="profile"
                          width={30}
                          height={30}
                          className="rounded-full object-cover h-6 w-6"
                        />
                      ) : (
                        <User />
                      )}
                    </div>
                    <p>{username}</p>
                    <div
                      onClick={() => handleLogout()}
                      className="hover:border-b-red-400 border-b border-transparent cursor-pointer"
                    >
                      <SignOut color="#F75A68" />
                    </div>
                  </div>
                ) : (
                  <div onClick={()=>setDialogVisibility(true)} className="flex gap-3 items-center bottom-8">
                    <p className="font-bold">Fazer login</p>
                    <SignIn color="#50B2C0" />
                  </div>
                )}
              </>
            ) : (
              <div className=" gap-3 px-2.5 flex items-center justify-center bottom-6 w-full h-7 ">
                <Skeleton height={30} width={30} shape="circle" />
                <Skeleton height={30} width={100} shape="square" />
                <Skeleton height={30} width={20} shape="square" />
              </div>
            )}
          </Column>
        </Column>
      </SheetContent>
    </Sheet>
  );
}
