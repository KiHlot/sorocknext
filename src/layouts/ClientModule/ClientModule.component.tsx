"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { DefaultProps } from "@/layouts/ClientModule/ClientModule.types";
import { ReactNotifications } from "react-notifications-component";

const ClientModule: FC<DefaultProps> = ({
  setIsShowConventicle,
  isShowConventicle,
}) => {
  useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { status: loginStatus } = useSession();

  useEffect(() => {
    if (loginStatus === "loading") return;

    switch (true) {
      case pathname.startsWith("/auth"):
        if (loginStatus === "authenticated") {
          router.push("/profile");
        } else {
          setIsShowConventicle(false);
          if (typeof window !== "undefined") {
            const body = document.getElementsByTagName("body")[0];
            body && body.classList.add("clean");
          }
        }
        break;
      default:
        if (!isShowConventicle) {
          setIsShowConventicle(true);
          if (typeof window !== "undefined") {
            const body = document.getElementsByTagName("body")[0];
            body && body.classList.remove("clean");
          }
        }
        break;
    }
  }, [pathname, loginStatus]);

  return (
    <>
      <ReactNotifications />
    </>
  );
};

export default ClientModule;
