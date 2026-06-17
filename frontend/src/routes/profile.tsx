import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TripCard } from "@/components/trip-card";
import { CityCard } from "@/components/city-card";
import { trips, cities } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Traveloop" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppLayout>
      <PageHeader
        title="Profile"
        description="Manage your traveler identity and preferences."
      />
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              AT
            </AvatarFallback>
          </Avatar>
          <div className="grid md:grid-cols-2 gap-4 flex-1 w-full">
            <div className="grid gap-2">
              <Label>Full name</Label>
              <Input defaultValue="Alex Traveler" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input defaultValue="alex@traveloop.io" />
            </div>
            <div className="grid gap-2">
              <Label>Preferred language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Preferred currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button>Save changes</Button>
            </div>
          </div>
        </div>
      </Card>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Saved destinations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cities.slice(0, 4).map((c) => (
            <CityCard key={c.id} city={c} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-3">Recent trips</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.slice(0, 3).map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
