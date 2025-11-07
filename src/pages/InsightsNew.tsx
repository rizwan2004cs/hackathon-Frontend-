import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Clock, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const weeklyData = [
  { week: "Week 1", alpha: 38, yourTeam: 36, beta: 35, gamma: 34 },
  { week: "Week 2", alpha: 42, yourTeam: 40, beta: 38, gamma: 37 },
  { week: "Week 3", alpha: 48, yourTeam: 46, beta: 44, gamma: 42 },
  { week: "Week 4", alpha: 52, yourTeam: 48, beta: 46, gamma: 44 },
];

const teamStats = [
  { name: "Your Team", badge: "You", tasks: 178, velocity: "49/wk", efficiency: "92%", trend: "up", rank: "#2", highlighted: true },
  { name: "Alpha Team", badge: "🏆", tasks: 186, velocity: "51/wk", efficiency: "94%", trend: "up", rank: "#1", highlighted: false },
  { name: "Beta Team", badge: "", tasks: 162, velocity: "44/wk", efficiency: "88%", trend: "down", rank: "#3", highlighted: false },
  { name: "Gamma Team", badge: "", tasks: 160, velocity: "45/wk", efficiency: "85%", trend: "down", rank: "#4", highlighted: false },
];

const sentimentData = [
  { label: "Positive", percentage: 65, color: "hsl(142, 71%, 45%)" },
  { label: "Neutral", percentage: 25, color: "hsl(215, 20%, 50%)" },
  { label: "Negative", percentage: 25, color: "hsl(0, 84%, 60%)" },
];

export default function InsightsNew() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* AI Summary Banner */}
      <Card className="shadow-card bg-card border-l-4 border-l-success">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">AI-Powered Summary</h3>
              <p className="text-sm mb-1">
                Over the last 24 hours, your team completed <strong>5 tasks</strong> with an average closure time of <strong>58.1 hours</strong>
              </p>
              <p className="text-sm text-destructive">
                Task completion velocity has decreased by 17.8%, indicating potential bottlenecks.
              </p>
              <p className="text-sm mt-1 text-muted-foreground">
                There are 11 blocked tasks requiring attention.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card bg-card">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Task Closure Performance</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Avg</p>
                    <p className="text-2xl font-bold">30.1h</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Previous Avg</p>
                    <p className="text-2xl font-bold">25.6h</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Blocked Tasks Alert</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Blocked Tasks</p>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">% of Total</p>
                    <p className="text-2xl font-bold">30.0%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Due Date Compliance</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold">14</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">On Time</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-card">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">In Progress Status</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Tasks</p>
                    <p className="text-2xl font-bold">13</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Active Time</p>
                    <p className="text-2xl font-bold">159.2h</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analysis */}
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-4">Predictive Performance Analysis</h3>
          <p className="text-sm text-muted-foreground mb-6">Based on historical data patterns and current velocity</p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Projected Sprint Completion</p>
              <p className="text-3xl font-bold">94%</p>
              <Progress value={94} className="h-2" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Next Week Workload</p>
              <p className="text-3xl font-bold">Medium</p>
              <p className="text-sm text-muted-foreground">~48 tasks expected</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <p className="text-3xl font-bold text-success">Low</p>
              <p className="text-sm text-muted-foreground">No major bottlenecks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Benchmarking */}
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Team Benchmarking</h3>
              <p className="text-sm text-muted-foreground">AI-powered comparison across teams</p>
            </div>
          </div>

          <h4 className="font-semibold mb-4">4-Week Productivity Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorYourTeam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGamma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="alpha" stroke="hsl(280, 65%, 60%)" fill="url(#colorAlpha)" name="Alpha Team" />
              <Area type="monotone" dataKey="yourTeam" stroke="hsl(217, 91%, 60%)" fill="url(#colorYourTeam)" name="Your Team" />
              <Area type="monotone" dataKey="beta" stroke="hsl(142, 71%, 45%)" fill="url(#colorBeta)" name="Beta Team" />
              <Area type="monotone" dataKey="gamma" stroke="hsl(38, 92%, 50%)" fill="url(#colorGamma)" name="Gamma Team" />
            </AreaChart>
          </ResponsiveContainer>

          {/* Team Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            {teamStats.map((team) => (
              <Card
                key={team.name}
                className={`shadow-card ${team.highlighted ? 'border-2 border-primary' : 'border border-border'}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">{team.name}</h4>
                    {team.badge && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        {team.badge}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Tasks</span>
                      <span className="font-semibold">{team.tasks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Velocity</span>
                      <span className="font-semibold">{team.velocity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-semibold text-success">{team.efficiency} {team.trend === 'up' ? '↗' : ''}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted-foreground">Rank</span>
                      <span className="font-semibold">{team.rank}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-card bg-primary/5 border-primary/20 mt-6">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Benchmarking Insights</p>
                  <p className="text-sm text-muted-foreground">
                    Your team ranks #2 with 5 tasks behind Alpha Team. Velocity increased 22% over 4 weeks, outpacing Beta (+16%) and Gamma (+29%).
                    Focus on efficiency improvements to reach #1 position.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Team Communication Sentiment */}
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-2">Team Communication Sentiment</h3>
          <p className="text-sm text-muted-foreground mb-6">Analyzed from commit messages and task comments</p>
          
          <div className="space-y-4">
            {sentimentData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <Card className="shadow-card bg-muted/30 border-border mt-6">
            <CardContent className="pt-4">
              <p className="text-sm">
                <strong>Insight:</strong> Team morale appears positive. Keep up the good work and maintain open communication.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
