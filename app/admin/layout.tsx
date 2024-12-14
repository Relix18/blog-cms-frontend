import Sidebar from "@/components/Admin/App-Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { cookies } from "next/headers";
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminProtected from "../hooks/useAdminProtected";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <AdminProtected>
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar />
        <main className="w-full bg-gray-50 dark:bg-background">
          <AdminHeader />
          {children}
        </main>
      </SidebarProvider>
    </AdminProtected>
  );
}
