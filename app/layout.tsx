"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../utils/ThemeProvider";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import Loader from "@/components/Loader/Loader";
import { SessionProvider } from "next-auth/react";

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
        <SessionProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Custom>{children}</Custom>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { getLoggedUser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      await getLoggedUser().finally(() => {
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  return <>{loading ? <Loader /> : <>{children}</>}</>;
};
