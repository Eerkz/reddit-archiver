import { Nunito } from "next/font/google";
import HeadLayout from "../components/layouts/Head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ToastContainer from "../components/utilities/ToastContainer";
import { UserProvider } from "../store/userContext";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --nunito-font: ${nunito.style.fontFamily};
        }
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>
      {/* <HeadLayout /> */}
      <UserProvider
        user={pageProps.user}
        access_token={pageProps.access_token}
        error={pageProps.error}
      >
        <ToastContainer />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
