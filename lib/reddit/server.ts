import { RedditIdentity, SavedItem, Subreddit } from "../../types/RedditUser";

const clientId = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_SECRET;

const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
)}`;

interface PaginatedListingResponse<T> {
  after: string | null;
  before: string | null;
  dist: number;
  geo_filter: string;
  modhash: string | null;
  children: T[];
}

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

const getUser = async (
  access_token: string
): Promise<undefined | RedditIdentity> => {
  const response = await fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};

const fetchData = async <T>(
  token: string,
  url: string
): Promise<undefined | PaginatedListingResponse<T>> => {
  let allData: PaginatedListingResponse<T> = {
    after: null,
    before: null,
    dist: 0,
    geo_filter: "",
    modhash: null,
    children: [],
  };

  let count = 0;
  let after: string | null = null;

  while (true) {
    const params = new URLSearchParams({
      after: after || "",
      limit: "100", // Adjust the limit as per your needs
      count: count.toString(),
      show: "all",
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const { data } = await response.json();

    allData.children.push(...(data.children || []));
    allData.after = data.after;
    allData.before = data.before;
    allData.dist = data.dist;
    allData.geo_filter = data.geo_filter;
    allData.modhash = data.modhash;

    count += data.dist;
    after = data.after;

    if (!after) {
      break;
    }
  }

  return allData;
};

const getSavedPosts = async (
  token: string,
  username: string
): Promise<undefined | PaginatedListingResponse<SavedItem>> => {
  const url = `https://oauth.reddit.com/user/${encodeURIComponent(
    username
  )}/saved`;
  return fetchData<SavedItem>(token, url);
};

const getSubreddits = async (
  token: string
): Promise<undefined | PaginatedListingResponse<Subreddit>> => {
  const url = "https://oauth.reddit.com/subreddits/mine/subscriber";
  return fetchData<Subreddit>(token, url);
};

const getToken = async (
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

export { getUser, getSavedPosts, getSubreddits, getToken, authHeader };
