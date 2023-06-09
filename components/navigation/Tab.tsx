import React from "react";

export default function Tab({
  titleA,
  titleB,
  onClickTabA,
  onClickTabB,
}: {
  titleA: string;
  titleB: string;
  onClickTabA: () => void;
  onClickTabB: () => void;
}) {
  return (
    <div className="flex items-center justify-center">
      <span
        onClick={onClickTabA}
        className="font-bold text-lg text-primary-red cursor-pointer px-[23px] py-[7px]"
      >
        {titleA}
      </span>
      <div className="w-[2px] h-[26px] bg-primary-red"></div>
      <span
        onClick={onClickTabB}
        className="font-bold text-lg text-primary-red cursor-pointer px-[23px] py-[7px]"
      >
        {titleB}
      </span>
    </div>
  );
}
