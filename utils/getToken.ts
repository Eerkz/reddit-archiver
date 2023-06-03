export type RedditAuthQueryParams = {
  code: string;
  grant_type: string;
  redirect_uri: string;
};

export type RedditAuthResponse =
  | {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      scoe: string;
    }
  | undefined;

const clientId = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_SECRET;

const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
)}`;

export const getToken = async (
  formData: RedditAuthQueryParams
): Promise<RedditAuthResponse | undefined> => {
  const response = await fetch(`https://www.reddit.com/api/v1/access_token`, {
    method: "POST",
    body: new URLSearchParams(formData),
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || "Error authenticating user");
  }
  const data = await response.json();
  return data;
};
