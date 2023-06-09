import { GetServerSidePropsContext } from "next";
import MainLayout from "../components/layouts/MainLayout";
import { handleAuth } from "../lib/auth";

export default function SubredditsPage() {
  return <MainLayout>Subreddits Page</MainLayout>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
