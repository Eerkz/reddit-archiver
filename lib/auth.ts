import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { getUser, getToken } from "./reddit/server";
import { RedditIdentity } from "../types/RedditUser";

export type GSSPReturn = {
  access_token?: string;
  user: RedditIdentity;
  error?: string;
};

const handleAuth = async (
  context: GetServerSidePropsContext
): Promise<{ props: Partial<GSSPReturn> } | any> => {
  const { query, req, res, resolvedUrl } = context;
  const { code } = query;
  const storedToken = getCookie("rr_user_access_token", { req, res });

  try {
    if (storedToken) {
      const user = await getUser(storedToken as string);
      return {
        props: {
          user,
          access_token: storedToken as string,
        },
      };
    }

    if (!code) {
      if (resolvedUrl !== "/") {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      } else {
        return {
          props: {},
        };
      }
    }

    const response = await getToken({
      code: code as string,
      grant_type: "authorization_code",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    });

    if (!response?.access_token) {
      if (resolvedUrl !== "/") {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      } else {
        return {
          props: {},
        };
      }
    }

    const { access_token, expires_in } = response;
    setCookie("rr_user_access_token", access_token, {
      req,
      res,
      maxAge: expires_in,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/",
    });
    const user = await getUser(access_token);
    return {
      props: {
        user,
        access_token,
      },
    };
  } catch (error: any) {
    deleteCookie("rr_user_access_token", { req, res });
    return {
      props: {
        error: error.message,
      },
    };
  }
};

export { handleAuth };
