import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";
import Tab from "../components/navigation/Tab";
import { useState } from "react";
import { RedditIdentity } from "../types/RedditUser";
import SavedPosts from "../components/landing/SavedPosts";
import { useCurrentUser } from "../store/userContext";

export default function SavedItemsPage() {
  const [activeTab, setActiveTab] = useState<"download" | "save">("download");

  return (
    <MainLayout>
      <Tab
        titleA="Download Items"
        titleB="Add New Items"
        onClickTabA={() => setActiveTab("download")}
        onClickTabB={() => setActiveTab("save")}
      />
      {activeTab === "download" ? (
        <SavedPosts />
      ) : (
        <>Mass save new items by uploading a JSON file.</>
      )}
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
