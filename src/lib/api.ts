const API_BASE_URL = "https://ai-tribe-hackathon2025-ovw3-csvwrs3lc-amans-projects-31c68103.vercel.app";

export interface KPIs {
  open_tasks: number;
  in_progress: number;
  closed_today: number;
  closed_this_hour: number;
  completion_rate: number;
}

export interface TaskDistribution {
  status: string;
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  tasks_created: number;
  tasks_completed: number;
  tasks_in_progress: number;
}

export interface TeamPerformance {
  team_name: string;
  completed: number;
  in_progress: number;
  open: number;
}

export interface TaskMember {
  name: string;
  total_assigned: number;
  ongoing: number;
  completed: number;
  trend_percent: number;
}

export interface QueryRequest {
  question: string;
}

export interface QueryResponse {
  answer: string;
  // Add other fields based on actual API response
}

export interface DashboardAnalytics {
  kpis: KPIs;
  task_distribution: TaskDistribution[];
  trend: TrendData[];
  team_performance: TeamPerformance[];
}

export async function fetchTaskManagement(): Promise<TaskMember[]> {
  try {
    console.log('Fetching task management data from:', `${API_BASE_URL}/analytics/task_management`);
    
    const response = await fetch(`${API_BASE_URL}/analytics/task_management`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Task management data received:', data.length, 'members');
    return data;
  } catch (error) {
    console.error('Error fetching task management data:', error);
    console.log('Falling back to mock data');
    
    // Return mock data as fallback
    return getMockTaskManagementData();
  }
}

export async function fetchDashboardAnalytics(): Promise<DashboardAnalytics> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    
    // Return mock data as fallback
    return getMockDashboardData();
  }
}

export async function sendQuery(question: string): Promise<QueryResponse> {
  try {
    console.log('Sending query to API:', question);
    
    const response = await fetch(`${API_BASE_URL}/analytics/query`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    console.log('Query response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Query response received:', data);
    return data;
  } catch (error) {
    console.error('Error sending query:', error);
    
    // Return mock response as fallback
    return {
      answer: "I apologize, but I'm currently unable to connect to the analytics service. Please try again later or contact support if the issue persists."
    };
  }
}

// Mock data fallback
function getMockDashboardData(): DashboardAnalytics {
  return {
    kpis: {
      open_tasks: 1311,
      in_progress: 543,
      closed_today: 0,
      closed_this_hour: 0,
      completion_rate: 7.3
    },
    task_distribution: [
      { status: "closed", count: 146, percentage: 7.3 },
      { status: "open", count: 1311, percentage: 65.55 },
      { status: "in_progress", count: 543, percentage: 27.15 }
    ],
    trend: [
      { date: "2025-11-01", tasks_created: 8, tasks_completed: 3, tasks_in_progress: 12 },
      { date: "2025-11-02", tasks_created: 12, tasks_completed: 5, tasks_in_progress: 15 },
      { date: "2025-11-03", tasks_created: 10, tasks_completed: 8, tasks_in_progress: 14 },
      { date: "2025-11-04", tasks_created: 15, tasks_completed: 7, tasks_in_progress: 18 },
      { date: "2025-11-05", tasks_created: 9, tasks_completed: 11, tasks_in_progress: 16 },
      { date: "2025-11-06", tasks_created: 13, tasks_completed: 6, tasks_in_progress: 19 },
      { date: "2025-11-07", tasks_created: 11, tasks_completed: 9, tasks_in_progress: 17 }
    ],
    team_performance: [
      { team_name: "Cloud Warriors", completed: 15, in_progress: 81, open: 230 },
      { team_name: "Alpha Squad", completed: 31, in_progress: 110, open: 231 },
      { team_name: "Frontend Foxes", completed: 39, in_progress: 66, open: 178 },
      { team_name: "Beta Builders", completed: 21, in_progress: 114, open: 231 },
      { team_name: "DevOps Dragons", completed: 19, in_progress: 95, open: 187 },
      { team_name: "Data Ninjas", completed: 21, in_progress: 77, open: 254 }
    ]
  };
}

function getMockTaskManagementData(): TaskMember[] {
  return [
    { name: "Alice Johnson", total_assigned: 2, ongoing: 0, completed: 0, trend_percent: 50.0 },
    { name: "Bob Smith", total_assigned: 1, ongoing: 0, completed: 0, trend_percent: 0.0 },
    { name: "Carol Davis", total_assigned: 3, ongoing: 0, completed: 0, trend_percent: 0.0 },
    { name: "David Lee", total_assigned: 6, ongoing: 1, completed: 1, trend_percent: 16.7 },
    { name: "Emma Wilson", total_assigned: 4, ongoing: 2, completed: 0, trend_percent: 0.0 },
    { name: "Frank Martinez", total_assigned: 5, ongoing: 1, completed: 0, trend_percent: 0.0 },
    { name: "Grace Chen", total_assigned: 4, ongoing: 0, completed: 4, trend_percent: 100.0 },
    { name: "Henry Taylor", total_assigned: 4, ongoing: 0, completed: 2, trend_percent: 50.0 },
    { name: "Iris Anderson", total_assigned: 6, ongoing: 1, completed: 1, trend_percent: 16.7 },
    { name: "Shane Williams", total_assigned: 6, ongoing: 0, completed: 1, trend_percent: 16.7 },
  ];
}
