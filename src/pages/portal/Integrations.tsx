import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug, Settings } from "lucide-react";

const integrations = [
  {
    id: 1,
    name: 'Stripe',
    description: 'Payment processing and billing',
    category: 'Payment',
    status: 'Connected',
    icon: '💳',
  },
  {
    id: 2,
    name: 'Slack',
    description: 'Team communication and notifications',
    category: 'Communication',
    status: 'Connected',
    icon: '💬',
  },
  {
    id: 3,
    name: 'Google Analytics',
    description: 'Website analytics and tracking',
    category: 'Analytics',
    status: 'Not Connected',
    icon: '📊',
  },
  {
    id: 4,
    name: 'Mailchimp',
    description: 'Email marketing and automation',
    category: 'Marketing',
    status: 'Not Connected',
    icon: '📧',
  },
  {
    id: 5,
    name: 'Zapier',
    description: 'Connect with 5000+ apps',
    category: 'Automation',
    status: 'Not Connected',
    icon: '⚡',
  },
  {
    id: 6,
    name: 'HubSpot',
    description: 'CRM and marketing platform',
    category: 'CRM',
    status: 'Not Connected',
    icon: '🎯',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Connect your favorite tools and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{integration.icon}</div>
                <Badge variant={integration.status === 'Connected' ? 'default' : 'secondary'}>
                  {integration.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="outline" className="text-xs">
                {integration.category}
              </Badge>
              <div className="flex gap-2">
                {integration.status === 'Connected' ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive hover:bg-destructive/10">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="w-full">
                    <Plug className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
