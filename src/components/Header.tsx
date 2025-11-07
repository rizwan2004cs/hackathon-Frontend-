import { Button } from "@/components/ui/button";
import { Bell, Cloud } from "lucide-react";
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

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[#0f1419]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f1419]/80">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">
            PULSEVO
          </h1>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
              activeClassName="bg-primary text-white hover:bg-primary hover:text-white"
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 text-sm bg-secondary/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <nav className="md:hidden border-t border-border px-3 py-2 flex overflow-x-auto gap-2 bg-[#0f1419]/95">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap",
              "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
            activeClassName="bg-primary text-white hover:bg-primary hover:text-white"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
