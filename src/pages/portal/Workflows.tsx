import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Plus, Settings, Copy } from "lucide-react";

const workflows = [
  {
    id: 1,
    name: 'Customer Onboarding Flow',
    description: 'Multi-step onboarding process for new customers',
    steps: 8,
    status: 'Active',
    completions: 342,
  },
  {
    id: 2,
    name: 'Support Ticket Resolution',
    description: 'Automated ticket triage and assignment',
    steps: 5,
    status: 'Active',
    completions: 1205,
  },
  {
    id: 3,
    name: 'Payment Processing',
    description: 'Handle payments and send confirmation',
    steps: 6,
    status: 'Active',
    completions: 567,
  },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Design complex multi-step business processes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg mb-2">{workflow.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{workflow.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Steps:</span>
                    <span className="ml-2 font-semibold">{workflow.steps}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Runs:</span>
                    <span className="ml-2 font-semibold">{workflow.completions}</span>
                  </div>
                </div>
                <Badge variant="default">{workflow.status}</Badge>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
