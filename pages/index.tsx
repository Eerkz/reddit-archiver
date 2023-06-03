import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import Signin from "../components/landing/Signin";
import { getToken } from "../utils/getToken";

export default function Home({
  authenticated,
  error,
}: {
  authenticated: boolean;
  error?: string;
}) {
  if (!authenticated) {
    return <Signin />;
  }
  return <div>Authenticated, bro.</div>;
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
      return {
        props: {
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
  } catch (error: any) {
    console.error(error.message);
    return {
      props: {
        authentication: false,
        error: error.message,
      },
    };
  }
  return {
    props: {},
  };
}
