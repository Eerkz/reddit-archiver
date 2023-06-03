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
    <main className="justify-center flex flex-col items-center w-full h-[100vh] py-[20px]">
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src={"/logo.svg"} alt="archiver-logo" width={58} height={78} />
        <h1 className="text-primary-red font-extrabold text-[48px] mb-[14px]">
          reddit-archiver
        </h1>
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
          />
          <span>Sign in using your reddit account</span>
        </a>
      </div>
      <div className="flex flex-grow w-full"></div>
      <a
        href="https://github.com/Eerkz/reddit-vault"
        target="_blank"
        rel="noreferrer"
        className="flex gap-x-[8px] items-center justify-center"
      >
        <span>
          <Image
            src={"/github-logo.svg"}
            alt={"github-logo"}
            width={25}
            height={25}
          />
        </span>
        Created by naarkz
      </a>
    </main>
  );
}
