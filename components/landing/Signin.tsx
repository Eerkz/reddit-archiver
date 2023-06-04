import React from "react";
import Image from "next/image";
import { generateRandomString } from "../../utils/helpers";
const DURATION = "permanent";
const SCOPE = "identity edit history save read";
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const RESPONSE_TYPE = "code";
const RAND_STRING = generateRandomString(6);
const CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;

const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RAND_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

export default function Signin() {
  return (
    <>
      {" "}
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        Archive all your saved posts and comments <br /> in multiple formats
        with one easy click.{" "}
      </p>
      <a
        href={URL}
        target="_blank"
        rel="noreferrer"
        className="bg-primary-red hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-lg flex gap-x-[7px] px-[17px] py-[10px]"
      >
        <Image
          src={"/reddit-logo.svg"}
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
