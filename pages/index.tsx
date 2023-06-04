import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import Signin from "../components/landing/Signin";
import { getToken } from "../utils/getToken";
import SavedPosts from "../components/landing/SavedPosts";
import { getUser } from "../utils/getUser";
import { RedditIdentity } from "../types/RedditUser";
import Image from "next/image";

export default function Home({
  authenticated,
  user,
  access_token,
  error,
}: {
  authenticated: boolean;
  access_token?: string;
  user: RedditIdentity;
  error?: string;
}) {
  const showSignin = !authenticated || !user || !access_token;
  return (
    <main className="justify-center flex flex-col items-center w-full h-[100vh] py-[20px]">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={"/logo.svg"} alt="archiver-logo" width={58} height={78} />
        <h1 className="text-primary-red font-extrabold text-[48px] mb-[14px]">
          reddit-archiver
        </h1>
        {showSignin ? (
          <Signin />
        ) : (
          <SavedPosts token={access_token} username={user.name} />
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
            src={"/github-logo.svg"}
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
  if (!code) {
    return {
      props: {},
    };
  }
  try {
    const storedToken = getCookie("rr_user_access_token", { req, res });

    if (storedToken) {
      const user = await getUser(storedToken as string);
      return {
        props: {
          user,
          access_token: storedToken,
          authenticated: true,
        },
      };
    }
    const response = await getToken({
      code: code as string,
      grant_type: "authorization_code",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    });
    if (!response) {
      return {
        props: {
          authenticated: false,
        },
      };
    }

    const { access_token, expires_in } = response;
    setCookie("rr_user_access_token", access_token, {
      req,
      res,
      maxAge: expires_in,
      secure: true,
    });
    const user = await getUser(storedToken || access_token);
    return {
      props: {
        user,
        authenticated: true,
        access_token,
      },
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      props: {
        authenticated: false,
        error: error.message,
      },
    };
  }
}
