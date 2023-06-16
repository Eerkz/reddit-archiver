import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";
import Tab from "../components/navigation/Tab";
import SavedPosts from "../components/landing/SavedPosts";
import AddSavedPosts from "../components/landing/AddSavedPosts";

export default function SavedItemsPage() {
  return (
    <MainLayout>
      <Tab
        titleA="Download Items"
        titleB="Add New Items"
        slotA={<SavedPosts />}
        slotB={<AddSavedPosts />}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
