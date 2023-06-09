import { GetServerSidePropsContext } from "next";
import { RedditIdentity } from "../types/RedditUser";
import { useState } from "react";
import { handleAuth } from "../lib/auth";
import MainLayout from "../components/layouts/MainLayout";
import Signin from "../components/landing/Signin";
import ActionsList from "../components/navigation/ActionsList";

export default function Home({
  user,
  access_token,
  error,
}: {
  access_token?: string;
  user: RedditIdentity;
  error?: string;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    user && access_token ? true : false
  );
  return (
    <MainLayout>
      {!isAuthenticated ? <Signin /> : <ActionsList variant="large" />}
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
