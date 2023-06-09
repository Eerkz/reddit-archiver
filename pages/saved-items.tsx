import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";

export default function SavedItemsPage(){
    return <MainLayout>Saved Items Page</MainLayout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const result = await handleAuth(context);
  
    return result;
  }
  