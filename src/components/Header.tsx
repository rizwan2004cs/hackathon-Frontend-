import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 lg:ml-64">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold lg:hidden ml-2 bg-gradient-primary bg-clip-text text-transparent">
            PULSEVO
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
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
      )}
    </header>
  );
}
