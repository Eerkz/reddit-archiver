import React, { useEffect, useState } from "react";
import { useAppToast } from "../utilities/ToastContainer";
import DownloadButton from "../buttons/DownloadButton";
import { useCurrentUser } from "../../store/userContext";
import Image from "next/image";

export default function SavedSubreddits() {
  const toast = useAppToast();
  const { user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [subreddits, setSubreddits] = useState<string[]>([]);

  useEffect(() => {
    (async function fetchSubreddits() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/subreddits", {
          method: "GET",
        });
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        const { data } = await response.json();
        if (data.subreddits) {
          setSubreddits(data.subreddits);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [toast]);

  const downloadSubreddits = () => {
    if (!user) {
      return;
    }
    try {
      const filename = (
        user.name +
        "_subreddits" +
        Math.floor(Date.now() / 1000).toString()
      ).toLowerCase();

      const blob = new Blob([subreddits.join(",")], { type: "text/plain" });
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

  const copySubreddits = async () => {
    const text = subreddits.join(",");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Successfully copied subreddits.");
    } catch (error: any) {
      toast.success("Failed to copy subreddits.");
    }
  };

  if (isLoading) {
    return (
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        We&apos;re fetching your subreddits. This might <br /> take a while
        depending on how many hentai subreddits you subscribed to...
      </p>
    );
  }

  return (
    <>
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        Download or copy your subreddits below.
      </p>
      <p
        className="text-primary-red font-semibold text-lg text-center mb-[38px] w-full break-words max-w-[400px] cursor-pointer"
        onClick={copySubreddits}
      >
        {subreddits.join(", ")}
      </p>
      <DownloadButton
        type="button"
        text="Download Subreddits"
        onClick={downloadSubreddits}
        icon={
          <Image
            src={"/images/download.svg"}
            alt="download"
            width={21}
            height={20}
            style={{ width: "21px", height: "20px" }}
          />
        }
      />
    </>
  );
}
