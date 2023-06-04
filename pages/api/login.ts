import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "../../utils/getToken";
import { setCookie } from "cookies-next";
import { getUser } from "../../utils/getUser";
import { RedditIdentity } from "../../types/RedditUser";

export const loginUser = async (
  code: string,
  req: any,
  res: any
): Promise<RedditIdentity | undefined> => {
  const response = await getToken({
    code: code as string,
    grant_type: "authorization_code",
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  });

  if (!response?.access_token) {
    return res.status(404).json({ message: "Not Found." });
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
  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(500).json({ message: "Bad request." });
    }
    const data = await loginUser(code as string, req, res);
    return res
      .status(200)
      .json({ message: "User logged in", data: { user: data } });
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json({ message: error.message || "Error loggin in user. " });
  }
}
