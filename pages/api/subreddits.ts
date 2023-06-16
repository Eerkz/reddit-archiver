import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getSubreddits } from "../../lib/reddit/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = getCookie("rr_user_access_token", { req, res });
  if (!access_token) {
    return res.status(409).json({ message: "Not authorized." });
  }
  try {
    if (req.method === "GET") {
      const data = await getSubreddits(access_token as string);
      let subreddits: string[] = [];
      if (data?.children) {
        subreddits = data.children.map((el) => {
          return el.data.display_name;
        });
      }
      return res.status(200).json({ data: { subreddits } });
    } else if (req.method === "POST") {
      const subreddits = req.body.subreddits;
      const response = await fetch(
        `https://oauth.reddit.com/api/subscribe?action=sub&sr_name=${encodeURIComponent(
          subreddits
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "User-Agent": `archive-vault:v0.0.1 by(u/Minute-Usual8483)`,
          },
        }
      );
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      return res.status(200).end();
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error: any) {
    return res.status(error.code || 500).json({ message: error.message });
  }
}
