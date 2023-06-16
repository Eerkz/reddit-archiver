import React from "react";

export default function DownloadButton({
  type,
  text,
  onClick = () => {},
  icon,
  disabled = false,
}: {
  type: "button" | "submit";
  text: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-primary-red hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-lg flex gap-x-[7px] px-[17px] py-[10px]"
    >
      {icon ? <span>{icon}</span> : <></>}
      {text}
    </button>
  );
}
