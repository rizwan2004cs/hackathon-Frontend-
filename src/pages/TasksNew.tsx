import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchTaskManagement, TaskMember } from "@/lib/api";

export default function TasksNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [taskMembers, setTaskMembers] = useState<TaskMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [dataSource, setDataSource] = useState<"api" | "mock">("api");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 10;

  // Load data from API
  const loadData = async () => {
    try {
      console.log("Loading task management data...");
      const data = await fetchTaskManagement();
      console.log("Received data:", data);
      setTaskMembers(data);
      // Check if we got real API data or mock data
      if (data.length === 10 && data[0].name === "Alice Johnson") {
        setDataSource("mock");
      } else {
        setDataSource("api");
      }
    } catch (error) {
      console.error("Error loading task management data:", error);
      setDataSource("mock");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Manual refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
  };

  // Initial load and polling setup
  useEffect(() => {
    loadData();

    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter and search logic
  const filteredMembers = taskMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return member.completed > 0;
    if (filterStatus === "ongoing") return member.ongoing > 0;
    if (filterStatus === "pending") return member.total_assigned > (member.completed + member.ongoing);
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-in">
        <Card className="shadow-card bg-card">
          <CardContent className="py-20">
            <div className="flex items-center justify-center">
              <div className="text-muted-foreground">Loading task data...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* Task Management Table */}
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Task Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredMembers.length} team members • Auto-refreshing every 30s
                  {dataSource === "mock" && (
                    <span className="ml-2 text-destructive">(Using fallback data - API unavailable)</span>
                  )}
                  {dataSource === "api" && (
                    <span className="ml-2 text-success">(Live API data)</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline" className="gap-2" size="sm">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
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
            <div className="overflow-hidden">
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
                  {currentMembers.length > 0 ? (
                    currentMembers.map((member) => (
                      <tr key={member.name} className="border-b border-border/50 hover:bg-secondary/50 transition-all duration-150">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                              <span className="text-xs font-semibold text-success">{getInitials(member.name)}</span>
                            </div>
                            <span className="text-sm">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{member.total_assigned}</td>
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
                          <span className={`text-sm ${member.trend_percent > 50 ? 'text-success' : member.trend_percent > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {member.trend_percent > 50 ? '↗' : member.trend_percent > 0 ? '↘' : '—'} {member.trend_percent.toFixed(2)}%
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No team members found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
