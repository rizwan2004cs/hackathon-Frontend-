export const mockMetrics = {
  openTasks: 37,
  inProgress: 12,
  closedToday: 5,
  closedThisHour: 0,
  completionRate: 26,
  totalTasks: 100,
};

export const taskDistribution = [
  { status: "Open", count: 38, color: "hsl(var(--chart-1))" },
  { status: "In Progress", count: 24, color: "hsl(var(--chart-2))" },
  { status: "Blocked", count: 12, color: "hsl(var(--chart-3))" },
  { status: "Completed", count: 26, color: "hsl(var(--chart-4))" },
];

export const weeklyTrend = [
  { day: "Mon", completed: 3, created: 5, inProgress: 8 },
  { day: "Tue", completed: 4, created: 3, inProgress: 7 },
  { day: "Wed", completed: 2, created: 6, inProgress: 9 },
  { day: "Thu", completed: 5, created: 4, inProgress: 6 },
  { day: "Fri", completed: 3, created: 5, inProgress: 8 },
  { day: "Sat", completed: 1, created: 2, inProgress: 7 },
  { day: "Sun", completed: 2, created: 3, inProgress: 5 },
];

export const dailyMetrics = {
  avgDailyCompletion: 2.4,
  avgDailyCreation: 4.1,
  avgInProgress: 7.6,
};

export const teamMembers = [
  { name: "David", status: "In Progress", tasksCompleted: 12, tasksOpen: 3 },
  { name: "Bob", status: "Open", tasksCompleted: 8, tasksOpen: 5 },
  { name: "Carol", status: "Completed", tasksCompleted: 15, tasksOpen: 1 },
  { name: "Emma", status: "In Progress", tasksCompleted: 10, tasksOpen: 4 },
];

export const blockedTasks = {
  count: 11,
  alert: "There are 11 blocked tasks requiring attention.",
};

export const inProgressMetrics = {
  currentAvg: 30.1,
  previousAvg: 25.6,
  percentOfTotal: 30.0,
  avgActiveTime: 159.2,
};

export const predictiveAnalysis = {
  projectedCompletion: 94,
  expectedTasks: 48,
  nextWeekWorkload: "Medium",
  riskLevel: "Low",
  bottleneckStatus: "No major bottlenecks detected",
};

export const teamBenchmarking = [
  { week: "Week 1", alpha: 165, yourTeam: 158, beta: 145, gamma: 142 },
  { week: "Week 2", alpha: 186, yourTeam: 178, beta: 162, gamma: 160 },
  { week: "Week 3", alpha: 51, yourTeam: 49, beta: 44, gamma: 45 },
  { week: "Week 4", alpha: 94, yourTeam: 92, beta: 88, gamma: 85 },
];

export const aiInsights = [
  {
    type: "positive",
    title: "Improved Efficiency",
    message: "Average closure time up 20% this week",
    timestamp: "2 hours ago",
  },
  {
    type: "warning",
    title: "Blocked Tasks Alert",
    message: "11 blocked tasks requiring attention",
    timestamp: "3 hours ago",
  },
  {
    type: "neutral",
    title: "Workload Prediction",
    message: "Next week: Medium workload expected (48 tasks)",
    timestamp: "5 hours ago",
  },
  {
    type: "positive",
    title: "Team Performance",
    message: "92% completion rate - close to #1 position",
    timestamp: "1 day ago",
  },
];

export const recentTasks = [
  {
    id: 1,
    title: "Implement user authentication",
    status: "In Progress",
    assignee: "David",
    priority: "High",
    dueDate: "2025-01-10",
  },
  {
    id: 2,
    title: "Design dashboard mockups",
    status: "Completed",
    assignee: "Carol",
    priority: "Medium",
    dueDate: "2025-01-08",
  },
  {
    id: 3,
    title: "Fix API integration bugs",
    status: "Blocked",
    assignee: "Bob",
    priority: "High",
    dueDate: "2025-01-09",
  },
  {
    id: 4,
    title: "Update documentation",
    status: "Open",
    assignee: "Emma",
    priority: "Low",
    dueDate: "2025-01-12",
  },
  {
    id: 5,
    title: "Optimize database queries",
    status: "In Progress",
    assignee: "David",
    priority: "Medium",
    dueDate: "2025-01-11",
  },
];
