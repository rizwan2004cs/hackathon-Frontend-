import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Clock, Users, Activity, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { useState, useEffect } from "react";
import { fetchWeekForecast, ForecastDay, predictCompletionProbability, PredictionRequest, predictClosureTime, ClosureTimeRequest } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  
  // Prediction state
  const [predictionMode, setPredictionMode] = useState<"probability" | "closure">("probability");
  const [taskType, setTaskType] = useState<"Bug" | "Feature" | "Defect">("Bug");
  const [priority, setPriority] = useState<"Low" | "High" | "Severe">("High");
  const [teamName, setTeamName] = useState<string>("Alpha Squad");
  const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString());
  const [completionProb, setCompletionProb] = useState<number | null>(null);
  const [closureTime, setClosureTime] = useState<number | null>(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    const loadForecast = async () => {
      // reset fallback when starting a fresh load
      setShowFallback(false);
      try {
        const data = await fetchWeekForecast();
        setForecast(data.forecast);
      } catch (error) {
        console.error('Error loading forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    // start loading and kick off fetch
    setLoading(true);
    loadForecast();

    // if loading takes longer than 2500ms, show the example fallback data
    const fallbackTimer = setTimeout(() => {
      if (loading) setShowFallback(true);
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Fetch prediction whenever task type, priority, team name, created time, or mode changes
  useEffect(() => {
    const fetchPrediction = async () => {
      setPredicting(true);
      try {
        const request = {
          task_type: taskType,
          priority: priority,
          team_name: teamName,
          created_at: createdAt
        };
        
        if (predictionMode === "probability") {
          const result = await predictCompletionProbability(request);
          setCompletionProb(result.completion_probability);
        } else {
          const result = await predictClosureTime(request);
          setClosureTime(result.predicted_closure_time_hours);
        }
      } catch (error) {
        console.error('Error fetching prediction:', error);
      } finally {
        setPredicting(false);
      }
    };

    fetchPrediction();
  }, [taskType, priority, teamName, createdAt, predictionMode]);

  // Sample fallback forecast (example response) — used when API is slow
  const sampleForecast: ForecastDay[] = [
    { ds: "2025-01-13", yhat: -2.00000077833034 },
    { ds: "2025-01-14", yhat: -120.48153719004965 },
    { ds: "2025-01-15", yhat: -0.4208843322076934 },
    { ds: "2025-01-16", yhat: 49.894401094182946 },
    { ds: "2025-01-17", yhat: 25.50376556601788 },
    { ds: "2025-01-18", yhat: 15.098877431522286 },
    { ds: "2025-01-19", yhat: -4.0000006316169365 },
  ];

  // decide which dataset to display: live forecast, or sample fallback when loading is slow
  const isUsingFallback = loading && showFallback && forecast.length === 0;
  const effectiveForecast = isUsingFallback ? sampleForecast : forecast;

  // Format forecast data for the chart
  const forecastChartData = effectiveForecast.map(item => ({
    date: new Date(item.ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predicted: Math.round(item.yhat * 10) / 10,
  }));

  // Derived summary numbers (use effectiveForecast so fallback works)
  const avgPrediction = effectiveForecast.length
    ? (effectiveForecast.reduce((sum, day) => sum + day.yhat, 0) / effectiveForecast.length)
    : 0;

  const peakDayObj = effectiveForecast.length
    ? effectiveForecast.reduce((max, day) => day.yhat > max.yhat ? day : max, effectiveForecast[0])
    : { ds: '', yhat: 0 };

  const totalForecastSum = effectiveForecast.reduce((sum, day) => sum + day.yhat, 0);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-fade-in">
      {/* AI Summary Banner */}
      <Card className="shadow-card bg-card border-l-4 border-l-success transition-all duration-200 hover:-translate-y-1">
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
        <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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

        <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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

        <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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

        <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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

      {/* AI Task Completion Prediction */}
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1 border-l-4 border-l-chart-2">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-chart-2" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">AI Task Predictor</h3>
              <p className="text-sm text-muted-foreground">
                {predictionMode === "probability" 
                  ? "Predict the probability a task will be closed within 24 hours"
                  : "Predict how long it will take to close the task"
                }
              </p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
            <Button
              variant={predictionMode === "probability" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setPredictionMode("probability")}
            >
              <Zap className="h-4 w-4 mr-2" />
              Completion Probability
            </Button>
            <Button
              variant={predictionMode === "closure" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setPredictionMode("closure")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Closure Time
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Type</label>
              <Select value={taskType} onValueChange={(value) => setTaskType(value as "Bug" | "Feature" | "Defect")}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Defect">Defect</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={(value) => setPriority(value as "Low" | "High" | "Severe")}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Team Name</label>
              <Input 
                type="text" 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Created At</label>
              <Input 
                type="datetime-local" 
                value={createdAt.slice(0, 16)} 
                onChange={(e) => setCreatedAt(new Date(e.target.value).toISOString())}
                className="bg-background"
              />
            </div>
          </div>

          {predicting ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-4 border-chart-2 border-t-transparent" />
                <p className="text-sm text-muted-foreground">
                  {predictionMode === "probability" ? "Calculating probability..." : "Calculating closure time..."}
                </p>
              </div>
            </div>
          ) : predictionMode === "probability" && completionProb !== null ? (
            <>
              <Card className="shadow-card bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Completion Probability (24h)</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-6xl font-bold text-chart-2">{completionProb}%</p>
                    </div>
                    <Progress value={completionProb} className="h-3 mt-4" />
                    <p className="text-xs text-muted-foreground mt-3">
                      {completionProb >= 70 ? 'High likelihood of completion' : 
                       completionProb >= 40 ? 'Moderate likelihood of completion' : 
                       'Low likelihood of completion'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-primary/5 border-primary/20 mt-4">
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <Zap className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">AI Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        {completionProb >= 70 
                          ? `This ${taskType.toLowerCase()} with ${priority.toLowerCase()} priority has a strong chance of completion within 24 hours. Continue with current approach.`
                          : completionProb >= 40
                          ? `This ${taskType.toLowerCase()} may require additional attention. Consider allocating more resources or adjusting priority.`
                          : `This ${taskType.toLowerCase()} is at risk of missing the 24-hour window. Recommend immediate escalation or reassignment.`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : predictionMode === "closure" && closureTime !== null ? (
            <>
              <Card className="shadow-card bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/30">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Predicted Closure Time</p>
                    <div className="flex items-center justify-center gap-3">
                      <Clock className="h-12 w-12 text-chart-2" />
                      <div>
                        <p className="text-6xl font-bold text-chart-2">{closureTime}</p>
                        <p className="text-lg text-muted-foreground">hours</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Days</p>
                        <p className="font-semibold text-lg">{Math.floor(closureTime / 24)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hours</p>
                        <p className="font-semibold text-lg">{closureTime % 24}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Est. Completion</p>
                        <p className="font-semibold text-lg">
                          {new Date(new Date().getTime() + closureTime * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-primary/5 border-primary/20 mt-4">
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <Clock className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">AI Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        {closureTime <= 24 
                          ? `This ${taskType.toLowerCase()} is expected to be completed quickly (within 1 day). Current resource allocation appears optimal.`
                          : closureTime <= 72
                          ? `This ${taskType.toLowerCase()} will take approximately ${Math.floor(closureTime / 24)} days. Consider monitoring progress closely.`
                          : `This ${taskType.toLowerCase()} has an extended timeline (${Math.floor(closureTime / 24)}+ days). Review complexity and consider breaking into smaller tasks.`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </CardContent>
      </Card>

      {/* AI Forecast - Next Week Prediction */}
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI-Powered Next Week Forecast</h3>
              <p className="text-sm text-muted-foreground">Machine learning predictions based on historical patterns</p>
            </div>
          </div>

          {loading && !isUsingFallback ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading forecast data...</p>
              </div>
            </div>
          ) : (
            <>
              {isUsingFallback && (
                <div className="mb-4 p-3 rounded-md bg-muted/30 border border-border text-sm">
                  Displaying a sample forecast while the live forecast is loading. This will be replaced when the API responds.
                </div>
              )}
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    label={{ value: 'Tasks Predicted', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    formatter={(value: number) => [value.toFixed(1), 'Predicted Tasks']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Forecast Summary Cards */}
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <Card className="shadow-card bg-muted/30">
                  <CardContent className="pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Average Prediction</p>
                    <p className="text-2xl font-bold">
                      {avgPrediction.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">tasks/day</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-card bg-muted/30">
                  <CardContent className="pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Peak Day</p>
                    <p className="text-2xl font-bold">
                      {new Date(peakDayObj.ds).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {peakDayObj.yhat.toFixed(1)} tasks
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-card bg-muted/30">
                  <CardContent className="pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Total Forecast</p>
                    <p className="text-2xl font-bold">
                      {totalForecastSum.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">tasks this week</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card bg-primary/5 border-primary/20 mt-4">
                <CardContent className="pt-4">
                  <div className="flex gap-2">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">AI Insights</p>
                      <p className="text-sm text-muted-foreground">
                        Based on machine learning analysis, workload is expected to {
                          forecast.reduce((sum, day) => sum + day.yhat, 0) / forecast.length > 20 
                            ? 'increase' 
                            : 'remain stable'
                        } next week. 
                        Plan resources accordingly for optimal team performance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>

      {/* Team Benchmarking */}
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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
      <Card className="shadow-card bg-card transition-all duration-200 hover:-translate-y-1">
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
