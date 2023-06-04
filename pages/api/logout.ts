import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, deleteCookie } from "cookies-next";
import { authHeader } from "../../utils/getToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = getCookie("rr_user_access_token", { req, res });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const formData = {
      token: token as string,
      token_type_hint: "access_token",
    };
    const response = await fetch("https://www.reddit.com/api/v1/revoke_token", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    deleteCookie("rr_user_access_token", { req, res });
    return res.status(200).json({ message: "User successfully logged out." });
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json({ message: error.message || "Error loging out user." });
  }
}
