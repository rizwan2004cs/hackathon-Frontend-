import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentTasks } from "@/lib/mockData";
import { Calendar, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors = {
  "Open": "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Blocked": "bg-destructive/10 text-destructive border-destructive/20",
  "Completed": "bg-success/10 text-success border-success/20",
};

const priorityColors = {
  "High": "bg-destructive/10 text-destructive border-destructive/20",
  "Medium": "bg-warning/10 text-warning border-warning/20",
  "Low": "bg-muted text-muted-foreground border-border",
};

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-elevated transition-shadow"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{task.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge className={cn("font-normal", statusColors[task.status as keyof typeof statusColors])}>
                          {task.status}
                        </Badge>
                        <Badge className={cn("font-normal", priorityColors[task.priority as keyof typeof priorityColors])}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentTasks.length}</div>
            <p className="text-xs text-muted-foreground">Showing recent tasks</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <AlertCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentTasks.filter(t => t.status === "Completed").length}
            </div>
            <p className="text-xs text-success">On track</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentTasks.filter(t => t.status === "Blocked").length}
            </div>
            <p className="text-xs text-destructive">Needs attention</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
