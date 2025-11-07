import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchDashboardAnalytics, type DashboardAnalytics } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Overview() {
  const [data, setData] = useState<DashboardAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = async () => {
    const analytics = await fetchDashboardAnalytics();
    setData(analytics);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    // Initial load
    loadData();

    // Set up polling - refresh every 30 seconds
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px] animate-fade-in">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Transform API data for charts
  const taskDistributionChart = data.task_distribution.map(item => ({
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
    count: item.count,
    color: item.status === 'open' 
      ? "hsl(var(--chart-1))" 
      : item.status === 'in_progress' 
      ? "hsl(var(--chart-3))" 
      : "hsl(var(--chart-2))"
  }));

  const trendChart = data.trend.map(item => ({
    day: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
    completed: item.tasks_completed,
    created: item.tasks_created,
    inProgress: item.tasks_in_progress,
  }));

  const totalTasks = data.kpis.open_tasks + data.kpis.in_progress + (data.task_distribution.find(t => t.status === 'closed')?.count || 0);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header with Last Updated */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={loadData} 
          variant="outline" 
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Open Tasks"
          value={data.kpis.open_tasks}
          icon={AlertCircle}
          variant="primary"
          subtitle="Active items"
        />
        <MetricCard
          title="In Progress"
          value={data.kpis.in_progress}
          icon={Clock}
          variant="warning"
          subtitle="Currently working"
        />
        <MetricCard
          title="Closed Today"
          value={data.kpis.closed_today}
          icon={CheckCircle}
          variant="success"
          subtitle="Completed today"
        />
        <MetricCard
          title="Closed This Hour"
          value={data.kpis.closed_this_hour}
          icon={TrendingDown}
          subtitle="Recent completions"
        />
        <MetricCard
          title="Completion Rate"
          value={`${data.kpis.completion_rate.toFixed(1)}%`}
          icon={TrendingUp}
          variant="success"
          subtitle="Overall progress"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Distribution */}
        <Card className="shadow-card transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Task Distribution ({totalTasks} total)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskDistributionChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {taskDistributionChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 7-Day Trend */}
        <Card className="shadow-card transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>7-Day Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendChart}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="hsl(var(--chart-2))" name="Completed" />
                <Bar dataKey="created" fill="hsl(var(--chart-1))" name="Created" />
                <Bar dataKey="inProgress" fill="hsl(var(--chart-3))" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Metrics & Team Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Statistics */}
        <Card className="shadow-card transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Task Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Total Tasks</span>
                <span className="text-lg font-semibold">{totalTasks}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Open Tasks</span>
                <span className="text-lg font-semibold">{data.kpis.open_tasks}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">In Progress</span>
                <span className="text-lg font-semibold">{data.kpis.in_progress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="text-lg font-semibold text-success">{data.kpis.completion_rate.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="shadow-card transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.team_performance.map((team) => {
                const totalTeamTasks = team.completed + team.in_progress + team.open;
                const completionRate = totalTeamTasks > 0 
                  ? ((team.completed / totalTeamTasks) * 100).toFixed(1) 
                  : '0.0';
                
                return (
                  <div key={team.team_name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">{team.team_name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{team.team_name}</p>
                        <p className="text-xs text-muted-foreground">{completionRate}% completion</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-success">{team.completed} done</p>
                      <p className="text-xs text-muted-foreground">{team.open} open</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
