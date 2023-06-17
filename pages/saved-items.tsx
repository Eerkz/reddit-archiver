import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";
import Tab from "../components/navigation/Tab";
import SavedPosts from "../components/landing/SavedPosts";
import AddSavedPosts from "../components/landing/AddSavedPosts";
import { useEffect, useState } from "react";
import { SavedItem } from "../types/RedditUser";
import { useCurrentUser } from "../store/userContext";
import { useAppToast } from "../components/utilities/ToastContainer";

export default function SavedItemsPage() {
  const { user } = useCurrentUser();
  const toast = useAppToast();
  const username = user?.name || "";
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    (async function fetchSavedItems() {
      if (!username) {
        return;
      }
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
  }, [username, toast]);

  const addToSavedItems = (newItems: SavedItem[]) => {
    setSavedItems((prev) => [...prev, ...newItems])
  }

  return (
    <MainLayout>
      <Tab
        titleA="Download Items"
        titleB="Add New Items"
        slotA={<SavedPosts savedItems={savedItems} isLoading={isLoading} />}
        slotB={<AddSavedPosts savedItems={savedItems} addToSavedItems={addToSavedItems} />}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
