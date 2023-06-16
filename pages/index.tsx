import { GetServerSidePropsContext } from "next";
import { RedditIdentity } from "../types/RedditUser";
import { useState } from "react";
import { handleAuth } from "../lib/auth";
import MainLayout from "../components/layouts/MainLayout";
import Signin from "../components/landing/Signin";
import ActionsList from "../components/navigation/ActionsList";
import { useCurrentUser } from "../store/userContext";

export default function Home() {
  const { user } = useCurrentUser();
  return (
    <MainLayout>
      {!user ? <Signin /> : <ActionsList variant="large" />}
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
