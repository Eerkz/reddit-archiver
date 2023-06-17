import React, { useState } from "react";
import DownloadButton from "../buttons/DownloadButton";
import Loading from "../utilities/Loading";
import { SavedItem } from "../../types/RedditUser";
import { useAppToast } from "../utilities/ToastContainer";

export default function AddSavedPosts() {
  const toast = useAppToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [toSaveItems, setToSaveItems] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file

    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = event.target?.result as string; // Get the file data as a string
        const jsonData = JSON.parse(fileData); // Parse the JSON data
        setToSaveItems(jsonData); // Set the parsed JSON data to the state
      };
      reader.readAsText(file); // Read the file as text
    } else {
      setToSaveItems(undefined);
    }
  };

  const handleSave = async () => {
    if (!toSaveItems || !Object.keys(toSaveItems).length) {
      return;
    }
    setIsLoading(true);
    try {
      const thingsNames = Object.values(toSaveItems).map((el) => {
        const { data } = el as SavedItem;
        return data.name;
      });
      const response = await fetch("/api/saved-items", {
        method: "POST",
        body: JSON.stringify({
          items: thingsNames,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      } else {
        toast.success(message);
        removeFile()
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setToSaveItems(undefined);
    setFileName("");
  };

  return (
    <>
      <div className="flex relative items-center justify-center mt-4 mb-6">
        <p className="w-[260px] leading-loose py-2 rounded-tl-[7px] break-all rounded-bl-[7px] bg-[#F2F2F2] h-[44px] pl-4 pr-8 flex items-center clamp-one-line">
          {fileName}
        </p>
        {toSaveItems ? (
          <button
            type="button"
            onClick={removeFile}
            className="bg-primary-red -ml-6 hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-base flex px-[17px] py-[10px]"
          >
            Remove File
          </button>
        ) : (
          <label
            htmlFor="saveItems"
            className="bg-primary-red cursor-pointer -ml-6 hover:bg-primary-red-dark transition-colors ease-in-out rounded-[17px] justify-center items-center text-white font-bold text-base flex px-[17px] py-[10px]"
          >
            Upload File
          </label>
        )}
        <input
          type="file"
          accept="application/JSON"
          name="saveItems"
          id="saveItems"
          onChange={handleChange}
        />
      </div>
      <DownloadButton
        type="button"
        text="Save Items"
        icon={isLoading ? <Loading /> : <></>}
        onClick={handleSave}
      />
    </>
  );
}
