import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* API Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Configure your API connections and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trello-api">Trello API Key</Label>
            <Input
              id="trello-api"
              type="password"
              placeholder="Enter your Trello API key"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trello-token">Trello Token</Label>
            <Input
              id="trello-token"
              type="password"
              placeholder="Enter your Trello token"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github-token">GitHub Token (Optional)</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="Enter your GitHub token"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="task-updates">Task Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when tasks are updated
              </p>
            </div>
            <Switch id="task-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-insights">AI Insights</Label>
              <p className="text-sm text-muted-foreground">
                Receive AI-generated productivity insights
              </p>
            </div>
            <Switch id="ai-insights" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-digest">Daily Digest</Label>
              <p className="text-sm text-muted-foreground">
                Get daily productivity reports
              </p>
            </div>
            <Switch id="daily-digest" />
          </div>
        </CardContent>
      </Card>

      {/* Data Refresh */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Data Refresh</CardTitle>
          <CardDescription>Configure how often data is refreshed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
            <Input
              id="refresh-interval"
              type="number"
              defaultValue="30"
              min="10"
              max="300"
            />
            <p className="text-xs text-muted-foreground">
              Real-time data refresh via asynchronous calls
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
