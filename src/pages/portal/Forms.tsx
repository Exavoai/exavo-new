import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Eye, Edit, Copy } from "lucide-react";

const forms = [
  {
    id: 1,
    name: 'Lead Capture Form',
    description: 'Collect information from potential clients',
    submissions: 145,
    status: 'Published',
    lastUpdated: '2025-11-10',
  },
  {
    id: 2,
    name: 'Customer Feedback Survey',
    description: 'Gather feedback on services and experience',
    submissions: 89,
    status: 'Published',
    lastUpdated: '2025-11-05',
  },
  {
    id: 3,
    name: 'Service Request Form',
    description: 'Allow clients to request new services',
    submissions: 56,
    status: 'Draft',
    lastUpdated: '2025-11-12',
  },
];

export default function FormsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground">Create and manage custom forms</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {forms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{form.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{form.description}</p>
                  </div>
                </div>
                <Badge variant={form.status === 'Published' ? 'default' : 'secondary'}>
                  {form.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-2 font-semibold">{form.submissions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="ml-2 font-medium">{form.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
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
