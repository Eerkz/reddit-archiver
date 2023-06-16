import React, { useState } from "react";
import DownloadButton from "../buttons/DownloadButton";
import Loading from "../utilities/Loading";
import { useAppToast } from "../utilities/ToastContainer";
import { useCurrentUser } from "../../store/userContext";

export default function AddSubreddits() {
  const toast = useAppToast();
  const { user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [newSubreddits, setNewSubreddits] = useState<string>("");

  const handleChange = (value: string) => {
    const pattern = /^(\w+,)*\w*$/;
    const isValidInput = value.trim() === "" || pattern.test(value);
    setIsValid(isValidInput);
    setNewSubreddits(value);
  };

  const submitSubreddits = async () => {
    if (!isValid || !user) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/subreddits?user=${encodeURIComponent(user.name)}`,
        {
          method: "POST",
          body: JSON.stringify({
            subreddits: newSubreddits,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      toast.success("Successfully subbed you in all of em.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="text-primary-dark font-semibold text-lg text-center mb-[38px]">
        Mass join subreddits by entering a <br /> comma separated valid
        subreddit names.
      </p>
      <textarea
        name="newSubreddits"
        value={newSubreddits}
        className="w-full mb:max-w-[405px] mb-4 px-6 py-4 h-[165px] bg-[#F2F2F2] rounded-[7px] text-primary-dark placeholder-opacity-50 focus:outline-none"
        placeholder="AskReddit, PinoyProgrammer"
        onChange={(e) => handleChange(e.target.value)}
      />
      {!isValid && (
        <p className="text-red-400 text-semibold mt-2 mb-4">
          Please make sure you follow the correct format.
        </p>
      )}
      <DownloadButton
        type="button"
        disabled={!isValid || newSubreddits.trim() === ""}
        text="Save Subreddits"
        icon={isLoading ? <Loading /> : null}
        onClick={submitSubreddits}
      />
    </>
  );
}
