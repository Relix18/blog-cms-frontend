"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../utils/ThemeProvider";
import Loader from "@/components/Loader/Loader";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { useGetUserQuery } from "@/state/api/user/userApi";
import { Toaster } from "@/components/ui/toaster";

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
}: Readonly<{
  children: React.ReactNode;
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
              <Custom>{children}</Custom>
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

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
