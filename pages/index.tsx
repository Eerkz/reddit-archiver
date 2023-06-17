import { GetServerSidePropsContext } from "next";
import { handleAuth } from "../lib/auth";
import MainLayout from "../components/layouts/MainLayout";
import Signin from "../components/landing/Signin";
import ActionsList from "../components/navigation/ActionsList";
import { useCurrentUser } from "../store/userContext";

export default function HomePage() {
  const { user } = useCurrentUser();
  return (
    <MainLayout>
      {user ? <ActionsList variant="large" /> : <Signin />}
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const result = await handleAuth(context);

  return result;
}
