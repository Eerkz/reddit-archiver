import React, { useState } from "react";

export default function Tab({
  titleA,
  titleB,
  slotA,
  slotB,
}: {
  titleA: string;
  titleB: string;
  slotA: React.ReactNode;
  slotB: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"a" | "b">("a");

  const toggleActiveTab = (tab: "a" | "b") => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <span
          onClick={() => toggleActiveTab("a")}
          className="font-bold text-lg text-primary-red cursor-pointer px-[23px] py-[7px]"
        >
          {titleA}
        </span>
        <div className="w-[2px] h-[26px] bg-primary-red"></div>
        <span
          onClick={() => toggleActiveTab("b")}
          className="font-bold text-lg text-primary-red cursor-pointer px-[23px] py-[7px]"
        >
          {titleB}
        </span>
      </div>
      {activeTab === "a" ? slotA : slotB}
    </>
  );
}
