import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { mockMetrics, taskDistribution, weeklyTrend, dailyMetrics, teamMembers } from "@/lib/mockData";

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Open Tasks"
          value={mockMetrics.openTasks}
          icon={AlertCircle}
          variant="primary"
        />
        <MetricCard
          title="In Progress"
          value={mockMetrics.inProgress}
          icon={Clock}
          variant="warning"
        />
        <MetricCard
          title="Closed Today"
          value={mockMetrics.closedToday}
          icon={CheckCircle}
          variant="success"
          subtitle="+2 from yesterday"
          trend="up"
        />
        <MetricCard
          title="Closed This Hour"
          value={mockMetrics.closedThisHour}
          icon={TrendingDown}
        />
        <MetricCard
          title="Completion Rate"
          value={`${mockMetrics.completionRate}%`}
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Task Distribution ({mockMetrics.totalTasks})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 7-Day Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>7-Day Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrend}>
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
        {/* Avg Daily Metrics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Avg. Daily Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Avg. Daily Completion</span>
                <span className="text-lg font-semibold">{dailyMetrics.avgDailyCompletion} tasks</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Avg. Daily Creation</span>
                <span className="text-lg font-semibold">{dailyMetrics.avgDailyCreation} tasks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. In Progress</span>
                <span className="text-lg font-semibold">{dailyMetrics.avgInProgress} tasks</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-success">{member.tasksCompleted} done</p>
                    <p className="text-xs text-muted-foreground">{member.tasksOpen} open</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
