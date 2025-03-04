"use client";

import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from "react";
import { ThemeProvider } from "../utils/ThemeProvider";
import Loader from "@/components/Loader/Loader";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { useGetUserQuery } from "@/state/api/user/userApi";
import { Toaster } from "@/components/ui/toaster";
import GlobalStyles from "@/utils/GlobalStyles";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: AppProps;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <SessionProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <GlobalStyles />
              <Custom {...pageProps}>{children}</Custom>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useGetUserQuery({});

  useEffect(() => {
    const handleConnection = () => {
      console.log("Socket connected");
    };

    socketId.on("connection", handleConnection);

    return () => {
      socketId.off("connection", handleConnection); // Cleanup to prevent memory leaks
    };
  }, []);

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
