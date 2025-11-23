import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Zap, Bell, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Setting {
  key: string;
  value: string;
  category: string;
}

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((setting: Setting) => {
        settingsMap[setting.key] = setting.value;
      });

      setSettings(settingsMap);
    } catch (error: any) {
      console.error('Error loading settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async (keys: string[]) => {
    setSaving(true);
    try {
      for (const key of keys) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: settings[key] })
          .eq('key', key);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your platform configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
          <TabsTrigger value="general" className="text-xs sm:text-sm">
            <SettingsIcon className="h-4 w-4 mr-2 hidden sm:inline" />
            General
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs sm:text-sm">
            <Zap className="h-4 w-4 mr-2 hidden sm:inline" />
            Features
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">
            <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your platform's basic settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.site_name || ''}
                  onChange={(e) => updateSetting('site_name', e.target.value)}
                  placeholder="Exavo AI"
                />
                <p className="text-xs text-muted-foreground">
                  Displayed in navigation and page titles
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.site_description || ''}
                  onChange={(e) => updateSetting('site_description', e.target.value)}
                  placeholder="AI-powered business solutions..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Used for SEO meta descriptions
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                  placeholder="contact@exavo.ai"
                />
                <p className="text-xs text-muted-foreground">
                  Primary email for contact forms and support
                </p>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="registration">User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                </div>
                <Switch
                  id="registration"
                  checked={settings.allow_registration === 'true'}
                  onCheckedChange={(checked) => updateSetting('allow_registration', checked.toString())}
                />
              </div>
              <Button
                onClick={() => saveSettings(['site_name', 'site_description', 'contact_email', 'allow_registration'])}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="bookings" className="cursor-pointer">Online Bookings</Label>
                  <p className="text-sm text-muted-foreground">Allow users to book services online</p>
                </div>
                <Switch
                  id="bookings"
                  checked={settings.feature_bookings === 'true'}
                  onCheckedChange={(checked) => updateSetting('feature_bookings', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="payments" className="cursor-pointer">Online Payments</Label>
                  <p className="text-sm text-muted-foreground">Enable payment processing</p>
                </div>
                <Switch
                  id="payments"
                  checked={settings.feature_payments === 'true'}
                  onCheckedChange={(checked) => updateSetting('feature_payments', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="chatbot" className="cursor-pointer">AI Chatbot</Label>
                  <p className="text-sm text-muted-foreground">Enable AI-powered chat support</p>
                </div>
                <Switch
                  id="chatbot"
                  checked={settings.feature_chatbot === 'true'}
                  onCheckedChange={(checked) => updateSetting('feature_chatbot', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="tickets" className="cursor-pointer">Support Tickets</Label>
                  <p className="text-sm text-muted-foreground">Enable ticket system for support</p>
                </div>
                <Switch
                  id="tickets"
                  checked={settings.feature_tickets === 'true'}
                  onCheckedChange={(checked) => updateSetting('feature_tickets', checked.toString())}
                />
              </div>
              <Button
                onClick={() => saveSettings(['feature_bookings', 'feature_payments', 'feature_chatbot', 'feature_tickets'])}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>Configure admin notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="newUsers" className="cursor-pointer">New User Registrations</Label>
                  <p className="text-sm text-muted-foreground">Get notified when users sign up</p>
                </div>
                <Switch
                  id="newUsers"
                  checked={settings.notify_new_users === 'true'}
                  onCheckedChange={(checked) => updateSetting('notify_new_users', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="newBookings" className="cursor-pointer">New Bookings</Label>
                  <p className="text-sm text-muted-foreground">Get notified for new bookings</p>
                </div>
                <Switch
                  id="newBookings"
                  checked={settings.notify_new_bookings === 'true'}
                  onCheckedChange={(checked) => updateSetting('notify_new_bookings', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="newPayments" className="cursor-pointer">New Payments</Label>
                  <p className="text-sm text-muted-foreground">Get notified for successful payments</p>
                </div>
                <Switch
                  id="newPayments"
                  checked={settings.notify_new_payments === 'true'}
                  onCheckedChange={(checked) => updateSetting('notify_new_payments', checked.toString())}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="newTickets" className="cursor-pointer">New Support Tickets</Label>
                  <p className="text-sm text-muted-foreground">Get notified for new support tickets</p>
                </div>
                <Switch
                  id="newTickets"
                  checked={settings.notify_new_tickets === 'true'}
                  onCheckedChange={(checked) => updateSetting('notify_new_tickets', checked.toString())}
                />
              </div>
              <Button
                onClick={() => saveSettings(['notify_new_users', 'notify_new_bookings', 'notify_new_payments', 'notify_new_tickets'])}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
