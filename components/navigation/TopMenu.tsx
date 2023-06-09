import React, { useState } from "react";
import Image from "next/image";
import { logout } from "../../lib/reddit/client";
import { useAppToast } from "../utilities/ToastContainer";
import { useRouter } from "next/router";
import ActionsList from "./ActionsList";

export default function TopMenu() {
  const [showActions, setShowActions] = useState(false);
  const toast = useAppToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged you out.");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <nav className="w-full flex justify-between items-center list-none px-[20px] relative">
      <li className="w-full flex items-center" onClick={toggleActions}>
        <p className="text-primary-red font-bold text-lg">
          More Shit You Can Do
        </p>
        <svg
          viewBox="0 0 9 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-2 w-[14px] h-[11px] mb-1 transform fill-primary-red transition-transform duration-300 ${
            showActions ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            d="M0.605575 0H8.39442C8.93326 0 9.20267 0.650837 8.82125 1.03226L4.92834 4.9282C4.69222 5.16431 4.30778 5.16431 4.07166 4.9282L0.178747 1.03226C-0.202673 0.650837 0.0667427 0 0.605575 0Z"
            fill="#FF4242"
          />
        </svg>
      </li>
      {showActions && (
        <ActionsList variant="small" wrapperStyles="absolute top-[40px]" />
      )}
      <li className="flex w-full justify-end">
        <button
          className="flex justify-center items-center gap-x-2"
          onClick={handleLogout}
        >
          <Image
            src={"/images/logout.svg"}
            alt={"logout"}
            width={23}
            height={20}
            style={{ width: "23px", height: "20px" }}
          />
          <p className="text-primary-red font-bold text-lg">Logout</p>
        </button>
      </li>
    </nav>
  );
}
