import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getSavedPosts } from "../../lib/reddit/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = getCookie("rr_user_access_token", { req, res });
  const { user } = req.query;
  if (!access_token || (!user && req.method === "GET")) {
    return res.status(409).json({ message: "Not authorized." });
  }

  try {
    if (req.method === "GET") {
      const data = await getSavedPosts(access_token as string, user as string);
      return res.status(200).json({ data: { saved: data } });
    } else if (req.method === "POST") {
      const items = req.body.items;
      const allPromises = items.map((el: string) => {
        return fetch(
          `https://oauth.reddit.com/api/save?id=${encodeURIComponent(el)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "User-Agent": `archive-vault:v0.0.1 by(u/Minute-Usual8483)`,
            },
          }
        );
      });

      const responses = await Promise.all(allPromises);
      let amountOfErrors = 0;
      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) {
          amountOfErrors++;
        }
      }
      if (amountOfErrors > 0) {
        return res
          .status(200)
          .json({ message: "Some didn't save properly dunno." });
      } else {
        return res.status(200).json({ message: "Everything saved properly." });
      }
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json({ message: error.message || "Error fetching user saved posts. " });
  }
}
