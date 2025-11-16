import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare } from "lucide-react";

const conversations = [
  {
    id: 1,
    client: 'Acme Corporation',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '10 mins ago',
    unread: 3,
    status: 'Active',
  },
  {
    id: 2,
    client: 'TechStart Inc',
    lastMessage: 'Can we schedule a call?',
    timestamp: '2 hours ago',
    unread: 1,
    status: 'Active',
  },
  {
    id: 3,
    client: 'Global Solutions',
    lastMessage: 'Invoice received, thank you',
    timestamp: '1 day ago',
    unread: 0,
    status: 'Resolved',
  },
];

export default function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversations</h1>
          <p className="text-muted-foreground">Manage client communications</p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                    {conversation.client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{conversation.client}</p>
                    <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{conversation.timestamp}</span>
                  {conversation.unread > 0 && (
                    <Badge className="rounded-full">{conversation.unread}</Badge>
                  )}
                  <Badge variant={conversation.status === 'Active' ? 'default' : 'secondary'}>
                    {conversation.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
