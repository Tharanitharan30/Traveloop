import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Traveloop" }] }),
  component: SettingsPage,
});

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        description="Configure your Traveloop experience."
      />
      <Tabs defaultValue="account" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4">
          <Card className="p-6 space-y-4">
            <div className="grid gap-2">
              <Label>Display name</Label>
              <Input defaultValue="Alex Traveler" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input defaultValue="alex@traveloop.io" />
            </div>
            <Button className="w-fit">Update account</Button>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
          <Card className="p-6">
            <Row
              title="Trip reminders"
              desc="Get notified before your trips start"
            >
              <Switch defaultChecked />
            </Row>
            <Row
              title="Budget alerts"
              desc="Warn me when I exceed 80% of budget"
            >
              <Switch defaultChecked />
            </Row>
            <Row
              title="Community updates"
              desc="New shared itineraries from people you follow"
            >
              <Switch />
            </Row>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="mt-4">
          <Card className="p-6">
            <Row title="Dark mode" desc="Use dark theme automatically">
              <Switch />
            </Row>
            <Row title="Metric units" desc="Show distances in kilometers">
              <Switch defaultChecked />
            </Row>
            <Row title="Compact density" desc="Show more content per screen">
              <Switch />
            </Row>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <Card className="p-6 space-y-4">
            <div className="grid gap-2">
              <Label>Current password</Label>
              <Input type="password" />
            </div>
            <div className="grid gap-2">
              <Label>New password</Label>
              <Input type="password" />
            </div>
            <Button className="w-fit">Change password</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
