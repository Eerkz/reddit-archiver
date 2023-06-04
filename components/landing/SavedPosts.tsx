import React, { useState, useEffect } from "react";
import { getSavedPosts } from "../../utils/getUser";
import { SavedItem } from "../../types/RedditUser";
import Image from "next/image";
import { useAppToast } from "../utilities/ToastContainer";

export default function SavedPosts({
  token,
  username,
}: {
  token: string;
  username: string;
}) {
  const toast = useAppToast();
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    (async function fetchSavedItems() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/saved-items?user=${encodeURIComponent(username)}`
        );
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        const { data } = await response.json();
        if (data?.saved?.children) {
          setSavedItems(data.saved.children);
        }
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [token, username, toast]);

  const handleJSONdowload = async () => {
    try {
      const filename = (
        username +
        "_saved_items" +
        Math.floor(Date.now() / 1000).toString()
      ).toLowerCase();
      const data = JSON.stringify(savedItems);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        We&apos;re fetching your saved items. This might <br /> take a while
        depending on how many furry porn you saved...
      </p>
    );
  }
  return (
    <>
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        {savedItems?.length ? (
          <>
            {" "}
            Hi, {username}! You can now download your saved items <br /> by
            clicking the download button below.
          </>
        ) : (
          <>It seems like you don&apos;t have any saved items.</>
        )}
      </p>
      {savedItems?.length ? (
        <button
          onClick={handleJSONdowload}
          className="bg-primary-red hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-lg flex gap-x-[7px] px-[17px] py-[10px]"
        >
          <Image
            src={"/images/download.svg"}
            alt="download"
            width={21}
            height={20}
            style={{ width: "21px", height: "20px" }}
          />
          <span>Download</span>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
