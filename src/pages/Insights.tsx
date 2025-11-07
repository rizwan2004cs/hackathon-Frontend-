import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { aiInsights, blockedTasks, inProgressMetrics, predictiveAnalysis, teamBenchmarking } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const insightIcons = {
  positive: CheckCircle,
  warning: AlertTriangle,
  neutral: Info,
};

const insightColors = {
  positive: "text-success",
  warning: "text-warning",
  neutral: "text-primary",
};

const insightBgColors = {
  positive: "bg-success/10 border-success/20",
  warning: "bg-warning/10 border-warning/20",
  neutral: "bg-primary/10 border-primary/20",
};

export default function Insights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Insights</h1>
      </div>

      {/* Alert Banner */}
      <Card className="shadow-card bg-warning/5 border-warning/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning">Blocked Tasks Alert</h3>
              <p className="text-sm text-muted-foreground mt-1">{blockedTasks.alert}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => {
              const Icon = insightIcons[insight.type as keyof typeof insightIcons];
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border",
                    insightBgColors[insight.type as keyof typeof insightBgColors]
                  )}
                >
                  <Icon className={cn("h-5 w-5 mt-0.5", insightColors[insight.type as keyof typeof insightColors])} />
                  <div className="flex-1">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{insight.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* In Progress Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>In Progress Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Avg</p>
              <p className="text-2xl font-bold">{inProgressMetrics.currentAvg}h</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Previous Avg</p>
              <p className="text-2xl font-bold">{inProgressMetrics.previousAvg}h</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">% of Total</p>
              <p className="text-2xl font-bold">{inProgressMetrics.percentOfTotal}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Active Time</p>
              <p className="text-2xl font-bold">{inProgressMetrics.avgActiveTime}h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Predictive Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Projected Sprint Completion</span>
                <span className="text-lg font-semibold text-success">{predictiveAnalysis.projectedCompletion}%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Expected Tasks</span>
                <span className="text-lg font-semibold">{predictiveAnalysis.expectedTasks} tasks</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Next Week Workload</span>
                <Badge className="bg-warning/10 text-warning border-warning/20">{predictiveAnalysis.nextWeekWorkload}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <Badge className="bg-success/10 text-success border-success/20">{predictiveAnalysis.riskLevel}</Badge>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-success/5 border border-success/20 rounded-lg">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{predictiveAnalysis.bottleneckStatus}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Benchmarking */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>4-Week Productivity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamBenchmarking}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="alpha" stroke="hsl(var(--chart-1))" name="Alpha Team" strokeWidth={2} />
              <Line type="monotone" dataKey="yourTeam" stroke="hsl(var(--chart-2))" name="Your Team" strokeWidth={2} />
              <Line type="monotone" dataKey="beta" stroke="hsl(var(--chart-3))" name="Beta Team" strokeWidth={2} />
              <Line type="monotone" dataKey="gamma" stroke="hsl(var(--chart-4))" name="Gamma Team" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Benchmarking Insight:</strong> Focus on efficiency improvements to reach #1 position
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
