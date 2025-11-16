import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSignature, Plus, Send, Eye } from "lucide-react";

const proposals = [
  {
    id: 1,
    title: 'AI Implementation Project',
    client: 'Acme Corporation',
    value: '$15,000',
    status: 'Sent',
    date: '2025-11-10',
    validUntil: '2025-12-10',
  },
  {
    id: 2,
    title: 'Marketing Automation Setup',
    client: 'TechStart Inc',
    value: '$8,500',
    status: 'Accepted',
    date: '2025-11-05',
    validUntil: '2025-12-05',
  },
  {
    id: 3,
    title: 'Custom AI Model Training',
    client: 'Global Solutions',
    value: '$25,000',
    status: 'Draft',
    date: '2025-11-12',
    validUntil: '2025-12-12',
  },
];

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proposals</h1>
          <p className="text-muted-foreground">Create and manage client proposals</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <FileSignature className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{proposal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Client: {proposal.client}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    proposal.status === 'Accepted'
                      ? 'default'
                      : proposal.status === 'Sent'
                      ? 'outline'
                      : 'secondary'
                  }
                >
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Value:</span>
                    <span className="ml-2 font-semibold text-lg">{proposal.value}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <span className="ml-2 font-medium">{proposal.date}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="ml-2 font-medium">{proposal.validUntil}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {proposal.status === 'Draft' && (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
