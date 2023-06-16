import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ActionsList({
  variant,
  wrapperStyles,
}: {
  variant: "large" | "small";
  wrapperStyles?: string;
}) {
  const { asPath } = useRouter();
  return (
    <ul
      className={`border-2 font-bold text-primary-red max-w-[370px] ${
        variant === "large" ? "text-lg" : "text-base"
      } rounded-[9px] ${variant === "large" ? "py-[31px]" : "py-[12px]"} ${
        variant === "large" ? "px-[23px]" : "px-[12px]"
      } border-primary-red h-auto flex flex-col ${
        variant === "large" ? "gap-y-[18px]" : "gap-y-[12px]"
      } ${variant === "large" ? "text-center" : "text-start"} ${wrapperStyles}`}
    >
      <li className={`hover:underline ${asPath.includes("/subreddits") ? "text-primary-dark" : ""}`}>
        <Link href={"/subreddits"}>Join or Download (your) Subreddits</Link>
      </li>
      <li className={`hover:underline ${asPath.includes("/saved-items") ? "text-primary-dark" : ""}`}>
        <Link href={"/saved-items"}>
          Mass Save or Download (your) saved-items
        </Link>
      </li>
    </ul>
  );
}
