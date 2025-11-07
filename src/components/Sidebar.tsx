import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CheckSquare, Sparkles, MessageSquare, Settings } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "AI Insights", href: "/insights", icon: Sparkles },
  { name: "Query", href: "/query", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PULSEVO
          </h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
