import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import Signin from "../components/landing/Signin";
import SavedPosts from "../components/landing/SavedPosts";
import { RedditIdentity } from "../types/RedditUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppToast } from "../components/utilities/ToastContainer";

export default function Home({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [user, setUser] = useState<RedditIdentity | undefined>();
  const toast = useAppToast();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout");
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      setUser(undefined);
      toast.success("Successfully logged you out.");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    (async function fetchUser() {
      try {
        if (isAuthenticated) {
          const response = await fetch(`/api/user`);

          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
          }
          const { data } = await response.json();
          setUser(data.user);
        } else {
          if (!router.query.code) {
            return;
          }
          const { code } = router.query;
          const response = await fetch(`/api/login?code=${code}`);

          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message);
          }
          const { data } = await response.json();
          setUser(data.user);
          router.replace("/");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, [router, toast, isAuthenticated]);

  return (
    <main className="justify-center flex flex-col items-center w-full h-[100vh] py-[20px]">
      {user ? (
        <div className="flex w-full justify-end px-[20px]">
          <button
            className="flex justify-center items-center gap-x-2"
            onClick={logout}
          >
            <Image
              src={"/images/logout.svg"}
              alt={"logout"}
              width={23}
              height={20}
              style={{ width: "23px", height: "20px" }}
            />
            <p className="text-primary-red font-bold text-lg">Logout</p>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col justify-center items-center h-full ">
        <Image
          src={"/images/logo.svg"}
          alt="archiver-logo"
          width={58}
          height={78}
          style={{ width: "58px", height: "78px" }}
        />
        <h1 className="text-primary-red font-extrabold text-[48px] mb-[14px]">
          reddit-archiver
        </h1>
        {!user ? <Signin /> : <SavedPosts username={user?.name} />}
      </div>
      <div className="flex flex-grow w-full"></div>
      <a
        href="https://github.com/Eerkz/reddit-vault"
        target="_blank"
        rel="noreferrer"
        className="flex gap-x-[8px] items-center justify-center"
      >
        <span>
          <Image
            src={"/images/github-logo.svg"}
            alt={"github-logo"}
            width={25}
            height={25}
            style={{ width: "25px", height: "25px" }}
          />
        </span>
        Created by naarkz
      </a>
    </main>
  );
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const storedToken = getCookie("rr_user_access_token", { req, res });

  return {
    props: {
      isAuthenticated: storedToken ? true : false,
    },
  };
}
