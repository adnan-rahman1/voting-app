import Main from "@/components/Main";
import Navbar from "@/components/base-comp/AppBar";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Navbar />
      <Main />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
