import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Key, Bell, Save } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SettingsNew() {
  const [githubToken, setGithubToken] = useState("ghp_xxxxxxxxxxxx");
  const [trelloKey, setTrelloKey] = useState("");
  const [trelloToken, setTrelloToken] = useState("");
  const [taskUpdates, setTaskUpdates] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  const handleSave = () => {
    toast.success("API keys saved successfully!");
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure API connections and preferences</p>
      </div>

      {/* API Configuration */}
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">API Configuration</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="github-token" className="text-sm font-medium">
                GitHub Personal Access Token
              </Label>
              <Input
                id="github-token"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
                className="bg-background font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Required for fetching GitHub Issues data
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="trello-key" className="text-sm font-medium">
                Trello API key
              </Label>
              <Input
                id="trello-key"
                type="password"
                value={trelloKey}
                onChange={(e) => setTrelloKey(e.target.value)}
                placeholder="Enter your Trello API  Key"
                className="bg-background font-mono text-sm"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="trello-token" className="text-sm font-medium">
                Trello Token
              </Label>
              <Input
                id="trello-token"
                type="password"
                value={trelloToken}
                onChange={(e) => setTrelloToken(e.target.value)}
                placeholder="Enter your Trello token"
                className="bg-background font-mono text-sm"
              />
            </div>

            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save API Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
              <Bell className="h-5 w-5 text-chart-4" />
            </div>
            <h3 className="font-semibold text-lg">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="task-updates" className="text-sm font-medium">
                  Task Updates
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Notify on task status changes
                </p>
              </div>
              <Switch
                id="task-updates"
                checked={taskUpdates}
                onCheckedChange={setTaskUpdates}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-insights" className="text-sm font-medium">
                  AI Insights
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive AI-generated summaries
                </p>
              </div>
              <Switch
                id="ai-insights"
                checked={aiInsights}
                onCheckedChange={setAiInsights}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-digest" className="text-sm font-medium">
                  Daily Digest
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get daily productivity reports
                </p>
              </div>
              <Switch
                id="daily-digest"
                checked={dailyDigest}
                onCheckedChange={setDailyDigest}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
