import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Map,
  Compass,
  Sparkles,
  Wallet,
  ListChecks,
  NotebookPen,
  Share2,
  User,
  Settings,
  LogOut,
  Plane,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const primary = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Trips", url: "/trips", icon: Map },
  { title: "Discover Cities", url: "/discover", icon: Compass },
  { title: "Activities", url: "/activities", icon: Sparkles },
];
const planning = [
  { title: "Budget", url: "/budget", icon: Wallet },
  { title: "Packing List", url: "/packing", icon: ListChecks },
  { title: "Notes & Journal", url: "/notes", icon: NotebookPen },
  { title: "Shared Trips", url: "/shared", icon: Share2 },
];
const account = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  const renderGroup = (label: string, items: typeof primary) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                tooltip={item.title}
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Plane className="h-5 w-5 -rotate-45" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">
                Traveloop
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Plan · Budget · Share
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Explore", primary)}
        {renderGroup("Planning", planning)}
        {renderGroup("Account", account)}
      </SidebarContent>
      <SidebarFooter>
        <div
          className={`flex items-center gap-3 rounded-lg p-2 ${collapsed ? "justify-center" : "bg-sidebar-accent"}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              AT
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Alex Traveler</div>
              <div className="text-xs text-muted-foreground truncate">
                alex@traveloop.io
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
