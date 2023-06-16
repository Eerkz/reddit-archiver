import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";
import Tab from "../components/navigation/Tab";
import { useState } from "react";
import SavedSubreddits from "../components/landing/SavedSubreddits";
import AddSubreddits from "../components/landing/AddSubreddits";

export default function SubredditsPage() {
  return (
    <MainLayout>
      <Tab
        titleA="Download Subreddits"
        titleB="Add New Subreddits"
        slotA={<SavedSubreddits />}
        slotB={<AddSubreddits />}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
