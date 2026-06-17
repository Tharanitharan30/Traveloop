import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { TripCard } from "@/components/trip-card";
import { CityCard } from "@/components/city-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trips, cities } from "@/lib/mock-data";
import {
  Map,
  Plane,
  Globe2,
  Wallet,
  Plus,
  Compass,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Traveloop" },
      {
        name: "description",
        content: "Plan, budget and share unforgettable multi-city trips.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const upcoming = trips.filter((t) => t.status === "upcoming");
  const completed = trips.filter((t) => t.status === "completed");
  const totalBudget = trips.reduce((s, t) => s + t.budget, 0);
  const countries = new Set(
    trips.flatMap((t) =>
      t.stops
        .map((s) => cities.find((c) => c.id === s.cityId)?.country)
        .filter(Boolean),
    ),
  ).size;
  const recommended = [...cities]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <AppLayout>
      <Card
        className="relative overflow-hidden p-8 md:p-10 mb-8 border-0 text-white"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-medium text-white/80 uppercase tracking-wider">
            Welcome back, Alex
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Your next adventure awaits.
          </h1>
          <p className="mt-2 text-white/85">
            You have {upcoming.length} upcoming trips. Let's keep the momentum
            going.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/trips/new">
                <Plus className="h-4 w-4 mr-1" /> Create New Trip
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white"
            >
              <Link to="/discover">
                <Compass className="h-4 w-4 mr-1" /> Discover Cities
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Total Trips"
          value={trips.length}
          hint={`${completed.length} completed`}
          icon={Map}
          tone="primary"
        />
        <MetricCard
          label="Upcoming"
          value={upcoming.length}
          hint="Next 90 days"
          icon={Plane}
          tone="accent"
        />
        <MetricCard
          label="Countries"
          value={countries}
          hint="Visited & planned"
          icon={Globe2}
          tone="secondary"
        />
        <MetricCard
          label="Total Budget"
          value={`$${(totalBudget / 1000).toFixed(1)}k`}
          hint="Across all trips"
          icon={Wallet}
          tone="warning"
        />
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Trips</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/trips">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.slice(0, 3).map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Recommended for you
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/discover">
              Explore all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommended.map((c) => (
            <CityCard key={c.id} city={c} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
