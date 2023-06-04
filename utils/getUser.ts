import { RedditIdentity, SavedItems } from "../types/RedditUser";

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

const getSavedPosts = async (
  token: string,
  username: string
): Promise<undefined | SavedItems> => {
  let allData: SavedItems = {
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

    const url = `https://oauth.reddit.com/user/${encodeURIComponent(
      username
    )}/saved?${params.toString()}`;

    const response = await fetch(url, {
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

export { getUser, getSavedPosts };
