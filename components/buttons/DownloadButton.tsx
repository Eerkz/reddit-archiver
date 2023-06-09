import React from "react";

export default function DownloadButton({
  text,
  onClick = () => {},
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => Promise<void> | void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-red hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-lg flex gap-x-[7px] px-[17px] py-[10px]"
    >
      {icon ? <span>{icon}</span> : <></>}
      {text}
    </button>
  );
}
