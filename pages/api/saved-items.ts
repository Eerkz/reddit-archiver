import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getSavedPosts } from "../../lib/reddit/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = getCookie("rr_user_access_token", { req, res });
  const { user } = req.query;
  if (!access_token || !user) {
    return res.status(409).json({ message: "Not authorized." });
  }

  try {
    const data = await getSavedPosts(access_token as string, user as string);
    return res.status(200).json({ data: { saved: data } });
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json({ message: error.message || "Error fetching user saved posts. " });
  }
}
