import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "primary";
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: MetricCardProps) {
  const variantClasses = {
    default: "bg-[#1a2332] border-[#2a3442]",
    success: "bg-gradient-to-br from-success/15 to-success/5 border-success/30",
    warning: "bg-gradient-to-br from-warning/15 to-warning/5 border-warning/30",
    primary: "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30",
  };

  const iconClasses = {
    default: "text-muted-foreground",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
  };

  return (
    <Card className={cn("shadow-card transition-all duration-200 hover:-translate-y-1 border", variantClasses[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</CardTitle>
        {Icon && <Icon className={cn("h-5 w-5 transition-transform duration-200", iconClasses[variant])} />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && (
          <p className={cn(
            "text-xs mt-2 flex items-center gap-1",
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          )}>
            {trend === "up" && <span>↗</span>}
            {trend === "down" && <span>↘</span>}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
