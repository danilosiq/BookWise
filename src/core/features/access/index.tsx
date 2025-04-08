"use client";
import GitHubLogo from "@/core/assets/icons/logo-github.svg";
import GoogleLogo from "@/core/assets/icons/logos_google-icon.svg";
import Rocket from "@/core/assets/icons/rocket.svg";
import SignInImage from "@/core/assets/images/sign-in-image.svg";
import { Column, Row } from "@/core/components/layout";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AccessPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/home");}
  }, [session]);

  const AccessnMethods = [
    {
      label: "Entrar com Google",
      icon: GoogleLogo,
      methodFunction: () => signIn("google"),
    },
    {
      label: "Entrar com GitHub",
      icon: GitHubLogo,
      methodFunction: () => signIn("github"),
    },
    {
      label: "Acessar como convidado",
      icon: Rocket,
      methodFunction: () => router.push("/home"),
    },
  ];
  return (
    <Row>
      <Image
        src={SignInImage}
        alt="SignInImage"
        className=" object-cover p-1 rounded-xl h-screen"
      />

      <div className="flex-1 pt-[7%] justify-center flex">
        <Column className="max-w-[372px] w-full p-1 gap-10">
          <Column className="">
            <h1 className="font-bold text-2xl">Boas Vindas</h1>
            <p className="text-gray-300 text-md">
              Faça seu login ou acesse como visitante.
            </p>
          </Column>

          <Column className="gap-4">
            {AccessnMethods.map((method, i) => (
              <div
                key={i}
                onClick={method.methodFunction}
                className="h-[72px] flex gap-5 pl-6 items-center rounded-md hover:bg-gray-500 cursor-pointer bg-gray-600"
              >
                <Image
                  src={method.icon}
                  alt="Google Logo"
                  width={32}
                  height={32}
                />
                {method.label}
              </div>
            ))}
          </Column>
        </Column>
      </div>
    </Row>
  );
}
