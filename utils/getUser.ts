import { RedditIdentity, SavedItem, SavedItems, Subreddit, Subreddits } from "../types/RedditUser";

interface PaginatedListingResponse<T> {
  after: string | null;
  before: string | null;
  dist: number;
  geo_filter: string;
  modhash: string | null;
  children: T[];
}

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

export { getUser, getSavedPosts, getSubreddits };
