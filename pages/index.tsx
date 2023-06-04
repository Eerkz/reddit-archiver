import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import Signin from "../components/landing/Signin";
import { getToken } from "../utils/getToken";
import SavedPosts from "../components/landing/SavedPosts";
import { getUser } from "../utils/getUser";
import { RedditIdentity } from "../types/RedditUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppToast } from "../components/utilities/ToastContainer";

export default function Home({
  user,
  access_token,
  error,
}: {
  access_token?: string;
  user: RedditIdentity;
  error?: string;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    user && access_token ? true : false
  );
  const toast = useAppToast();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout");
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      setIsAuthenticated(false);
      toast.success("Successfully logged you out.");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);

  return (
    <main className="justify-center flex flex-col items-center w-full h-[100vh] py-[20px]">
      {isAuthenticated ? (
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
        {!isAuthenticated ? (
          <Signin />
        ) : (
          <SavedPosts token={access_token!} username={user?.name} />
        )}
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
  const { code } = query;

  try {
    const storedToken = getCookie("rr_user_access_token", { req, res });

    if (storedToken) {
      const user = await getUser(storedToken as string);
      return {
        props: {
          user,
          access_token: storedToken,
        },
      };
    }

    if (!code) {
      return {
        props: {},
      };
    }

    const response = await getToken({
      code: code as string,
      grant_type: "authorization_code",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    });

    if (!response?.access_token) {
      return {
        props: {},
      };
    }

    const { access_token, expires_in } = response;
    setCookie("rr_user_access_token", access_token, {
      req,
      res,
      maxAge: expires_in,
      secure: true,
      sameSite: "none",
    });
    const user = await getUser(access_token);
    return {
      props: {
        user,
        access_token,
      },
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      props: {
        error: error.message,
      },
    };
  }
}
