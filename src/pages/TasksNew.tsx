import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const taskMembers = [
  { name: "Alice Johnson", initials: "AJ", assigned: 2, completed: 0, ongoing: 0, trend: "50.0%" },
  { name: "Bob Smith", initials: "BS", assigned: 1, completed: 0, ongoing: 0, trend: "0.0%" },
  { name: "Carol Davis", initials: "CD", assigned: 3, completed: 0, ongoing: 0, trend: "0.0%" },
  { name: "David Lee", initials: "DL", assigned: 6, completed: 1, ongoing: 1, trend: "16.7%" },
  { name: "Emma Wilson", initials: "EW", assigned: 4, completed: 0, ongoing: 2, trend: "0.0%" },
  { name: "Frank Martinez", initials: "FM", assigned: 5, completed: 0, ongoing: 1, trend: "0.0%" },
  { name: "Grace Chen", initials: "GC", assigned: 4, completed: 4, ongoing: 0, trend: "100.0%" },
  { name: "Henry Taylor", initials: "HT", assigned: 4, completed: 2, ongoing: 0, trend: "50.0%" },
  { name: "Iris Anderson", initials: "IA", assigned: 6, completed: 1, ongoing: 1, trend: "16.7%" },
  { name: "Shane Williams", initials: "SW", assigned: 6, completed: 1, ongoing: 0, trend: "16.7%" },
  { name: "Georgia Lopez", initials: "GL", assigned: 6, completed: 1, ongoing: 0, trend: "16.7%" },
];

const projectsData = [
  { name: "API Services", value: 43, color: "hsl(280, 65%, 60%)" },
  { name: "Mobile App", value: 32, color: "hsl(217, 91%, 60%)" },
  { name: "Web Platform", value: 25, color: "hsl(38, 92%, 50%)" },
];

const openIssuesData = [
  { name: "API Services", value: 40, color: "hsl(280, 65%, 60%)" },
  { name: "Mobile App", value: 10, color: "hsl(217, 91%, 60%)" },
  { name: "Web Platform", value: 1, color: "hsl(38, 92%, 50%)" },
];

export default function TasksNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Task Management Table */}
        <Card className="shadow-card bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Task Management</CardTitle>
              <Button variant="outline" className="gap-2" size="sm">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Assigned</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Completed</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ongoing</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {taskMembers.map((member) => (
                    <tr key={member.name} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-success">{member.initials}</span>
                          </div>
                          <span className="text-sm">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{member.assigned}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                          {member.completed}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs">
                          {member.ongoing}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm ${parseFloat(member.trend) > 50 ? 'text-success' : parseFloat(member.trend) > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {parseFloat(member.trend) > 50 ? '↗' : parseFloat(member.trend) > 0 ? '↘' : '—'} {member.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </Button>
              <Button
                variant={currentPage === 1 ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(1)}
              >
                1
              </Button>
              <Button
                variant={currentPage === 2 ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(2)}
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
                disabled={currentPage === 2}
              >
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Charts */}
        <div className="space-y-6">
          {/* Tasks by Project */}
          <Card className="shadow-card bg-card">
            <CardHeader>
              <CardTitle>Tasks by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={projectsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {projectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {projectsData.map((project) => (
                  <div key={project.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                    <span className="text-sm text-muted-foreground">{project.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Open Issues by Project */}
          <Card className="shadow-card bg-card">
            <CardHeader>
              <CardTitle>Open Issues by Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {openIssuesData.map((project) => (
                  <div key={project.name} className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.value}
                    </div>
                    <span className="text-sm text-muted-foreground">{project.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                {openIssuesData.map((project) => (
                  <div key={project.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                    <span className="text-sm text-muted-foreground">{project.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
