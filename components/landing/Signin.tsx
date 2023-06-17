import React, { useEffect, useState } from "react";
import Image from "next/image";
import { generateRandomString } from "../../utils/helpers";

export default function Signin() {
  const [randomSeed, setRandomSeed] = useState("");
  const params = {
    duration: "permanent",
    scope: "identity edit history save read mysubreddits subscribe save submit",
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID!,
    state: randomSeed,
  };

  const AUTHORIZATION_URL = `https://www.reddit.com/api/v1/authorize?${new URLSearchParams(
    params
  ).toString()}`;

  useEffect(() => {
    const randString = generateRandomString(6);
    setRandomSeed(randString);
  }, []);

  return (
    <>
      {" "}
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        Archive all your saved posts and comments <br /> in multiple formats
        with one easy click.{" "}
      </p>
      <a
        href={AUTHORIZATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary-red hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-lg flex gap-x-[7px] px-[17px] py-[10px]"
      >
        <Image
          src={"/images/reddit-logo.svg"}
          alt="reddit-alien-logo"
          width={21}
          height={20}
          style={{ width: "21px", height: "20px" }}
        />
        <span>Sign in using your reddit account</span>
      </a>
    </>
  );
}
