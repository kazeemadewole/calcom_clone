/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionProvider } from "next-auth/react";

// import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
