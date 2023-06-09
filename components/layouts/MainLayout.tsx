import React from "react";
import Image from "next/image";
import TopMenu from "../navigation/TopMenu";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="justify-center flex flex-col items-center w-full h-[100vh] py-[20px]">
      <TopMenu />
      <div className="flex flex-col justify-center items-center h-full ">
        <Link href={"/"}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={"/images/logo.svg"}
              alt="archiver-logo"
              width={58}
              height={78}
              style={{ width: "58px", height: "78px" }}
            />
            <h1 className="text-primary-red font-extrabold text-[48px] mb-[14px]">
              reddit-archiver
            </h1>
          </div>
        </Link>
        {children}
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
            src={"/images/github-logo.svg"}
            alt={"github-logo"}
            width={25}
            height={25}
            style={{ width: "25px", height: "25px" }}
          />
        </span>
        Created by naarkz
      </a>
    </main>
  );
}
