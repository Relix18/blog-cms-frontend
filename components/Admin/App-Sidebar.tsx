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
  ClipboardPlus,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Settings,
  Settings2,
  Tags,
  Target,
  UserCheck,
  UserCog,
} from "lucide-react";
import { MdDrafts, MdNotes, MdOutlineAnalytics } from "react-icons/md";

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
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard/overview",
        icon: Target,
      },
      {
        title: "Post Manage",
        icon: MdNotes,
        items: [
          {
            title: "All Posts",
            url: "/admin/dashboard/posts",
            icon: ScrollText,
          },
          {
            title: "Add New Post",
            url: "/admin/dashboard/new-post",
            icon: ClipboardPlus,
          },
          {
            title: "Drafts",
            url: "/admin/dashboard/drafts",
            icon: MdDrafts,
          },
        ],
      },
      {
        title: "Categories & Tags",
        url: "/admin/dashboard/category-tag",
        icon: Tags,
      },
    ],
  },
  {
    title: "User Management",
    icon: UserCog,
    items: [
      {
        title: "Authors",
        url: "/admin/user-management/authors",
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
        url: "/admin/setting/site",
        icon: Settings2,
      },
      {
        title: "Seo Settings",
        url: "/admin/setting/seo",
        icon: CalendarCog,
      },
      {
        title: "Notifications",
        url: "/admin/setting/notification",
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
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-fuchsia-600 text-sidebar-primary-foreground">
              <BookOpen className="size-5" />
            </div>
            <div className="grid flex-1 text-left text-lg leading-tight">
              <span className="truncate font-semibold">OrbitBlog</span>
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