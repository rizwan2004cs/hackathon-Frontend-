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
    default: "bg-card",
    success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
  };

  const iconClasses = {
    default: "text-muted-foreground",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
  };

  return (
    <Card className={cn("shadow-card hover:shadow-elevated transition-shadow", variantClasses[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className={cn("h-4 w-4", iconClasses[variant])} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className={cn(
            "text-xs mt-1",
            trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
