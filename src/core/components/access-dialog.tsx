import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import GitHubLogo from "@/core/assets/icons/logo-github.svg";
import GoogleLogo from "@/core/assets/icons/logos_google-icon.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Column, Row } from "./layout";

interface AccessDialogProps {
  open: boolean;
  onClose:()=>void
}

export function AccessDialog({ open,onClose }: AccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="px-[72px] py-[56px]">
        <DialogTitle className="text-center">
          Faça login para deixar sua avaliação
        </DialogTitle>
        <DialogDescription></DialogDescription>

        <Column className="gap-4">
          <div
            onClick={() => signIn("google")}
            className="bg-gray-600 py-5 px-6 cursor-pointer rounded-lg border border-gray-600 hover:border-gray-500"
          >
            <Row className="items-center gap-5">
              <Image
                src={GoogleLogo}
                alt="GitHub Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <p className="text-lg font-bold">Entrar com Google</p>
            </Row>
          </div>
          <div
            onClick={() => signIn("github")}
            className="bg-gray-600 py-5 px-6 cursor-pointer rounded-lg border border-gray-600 hover:border-gray-500"
          >
            <Row className="items-center gap-5">
              <Image
                src={GitHubLogo}
                alt="GitHub Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <p className="text-lg font-bold">Entrar com Github</p>
            </Row>
          </div>
        </Column>
      </DialogContent>
    </Dialog>
  );
}
