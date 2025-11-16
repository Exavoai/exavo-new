import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Play, Pause, Edit, Trash2 } from "lucide-react";

const automations = [
  {
    id: 1,
    name: 'Lead Scoring Automation',
    description: 'Automatically score and qualify new leads',
    status: 'Active',
    runs: 1250,
    lastRun: '5 mins ago',
  },
  {
    id: 2,
    name: 'Email Campaign Trigger',
    description: 'Send personalized emails based on user behavior',
    status: 'Active',
    runs: 856,
    lastRun: '1 hour ago',
  },
  {
    id: 3,
    name: 'Data Sync',
    description: 'Sync customer data across platforms',
    status: 'Paused',
    runs: 423,
    lastRun: '2 days ago',
  },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">Create and manage automated workflows</p>
        </div>
        <Button>
          <Workflow className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{automation.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{automation.description}</p>
                  </div>
                </div>
                <Badge variant={automation.status === 'Active' ? 'default' : 'secondary'}>
                  {automation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Runs:</span>
                    <span className="ml-2 font-semibold">{automation.runs}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Run:</span>
                    <span className="ml-2 font-medium">{automation.lastRun}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {automation.status === 'Active' ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
