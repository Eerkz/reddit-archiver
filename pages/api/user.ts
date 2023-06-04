import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../utils/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storedToken = getCookie("rr_user_access_token", { req, res });
  if (!storedToken) {
    return res.status(404).json({ message: "Bad request." });
  }

  try {
    const user = await getUser(storedToken as string);
    return res.status(200).json({ data: { user } });
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json({ message: error.message || "Error fetching user. " });
  }
}
