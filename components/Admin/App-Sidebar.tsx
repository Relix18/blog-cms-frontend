"use client";

import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bell,
  BookOpen,
  CalendarCog,
  ChartLine,
  ChartNetwork,
  ChartNoAxesCombined,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Settings,
  Settings2,
  Tags,
  UserCheck,
  UserCog,
} from "lucide-react";
import { MdNotes, MdOutlineAnalytics, MdOutlineCategory } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectSettings } from "@/state/api/site/siteSlice";
import { ISiteSettings } from "@/types/types";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  url?: string;
  items?: MenuItem[];
  isActive?: boolean;
}

const items: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "Post Management",
    icon: MdNotes,
    items: [
      {
        title: "All Posts",
        url: "/admin/post-management/posts",
        icon: ScrollText,
      },
      {
        title: "Categories",
        url: "/admin/post-management/category",
        icon: MdOutlineCategory,
      },
      {
        title: "Tags",
        url: "/admin/post-management/tag",
        icon: Tags,
      },
    ],
  },
  {
    title: "User Management",
    icon: UserCog,
    items: [
      {
        title: "Users",
        url: "/admin/user-management/users",
        icon: UserCheck,
      },
      {
        title: "Comments",
        url: "/admin/user-management/comments",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Analytics",
    icon: MdOutlineAnalytics,
    items: [
      {
        title: "Post Analytics",
        url: "/admin/analytics/post",
        icon: ChartLine,
      },
      {
        title: "User Analytics",
        url: "/admin/analytics/user",
        icon: ChartNetwork,
      },
      {
        title: "Growth Reports",
        url: "/admin/analytics/growth",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "Site Settings",
        url: "/admin/settings/site",
        icon: Settings2,
      },
      {
        title: "Seo Settings",
        url: "/admin/settings/seo",
        icon: CalendarCog,
      },
      {
        title: "Notifications",
        url: "/admin/settings/notification",
        icon: Bell,
      },
    ],
  },
];

const renderMenuItems = (menuItems: MenuItem[]) => {
  return menuItems.map((item) => (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {item.url ? (
            <Link href={item.url} passHref>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.title}</span>
                {item.items && (
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                )}
              </SidebarMenuButton>
            </Link>
          ) : (
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon className=" size-4" />}

              <span>{item.title}</span>
              {item.items && (
                <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.items && (
          <CollapsibleContent>
            <SidebarMenuSub>{renderMenuItems(item.items)}</SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  ));
};

const AppSidebar: React.FC = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { setOpen } = useSidebar();
  const settings = useSelector(selectSettings);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accentColor text-sidebar-primary-foreground">
              <BookOpen className="size-5" />
            </div>
            <div className="grid flex-1 text-left text-lg leading-tight">
              <span className="truncate font-semibold">
                {settings?.siteName}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu
              onClick={() => {
                setOpen(true);
              }}
            >
              {renderMenuItems(items)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
