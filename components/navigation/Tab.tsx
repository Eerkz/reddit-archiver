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
          className={`text-lg  cursor-pointer px-[23px] py-[7px] ${
            activeTab === "a" ? "text-primary-dark font-semibold" : "text-primary-red font-bold"
          }`}
        >
          {titleA}
        </span>
        <div className="w-[2px] h-[26px] bg-primary-red"></div>
        <span
          onClick={() => toggleActiveTab("b")}
          className={`text-lg  cursor-pointer px-[23px] py-[7px] ${
            activeTab === "b" ? "text-primary-dark font-semibold" : "text-primary-red font-bold"
          }`}
        >
          {titleB}
        </span>
      </div>
      {activeTab === "a" ? slotA : slotB}
    </>
  );
}
