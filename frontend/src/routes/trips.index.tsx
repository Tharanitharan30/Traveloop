import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { TripCard } from "@/components/trip-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trips } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/trips/")({
  head: () => ({ meta: [{ title: "My Trips — Traveloop" }] }),
  component: TripsPage,
});

function TripsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<string>("date-desc");

  const filtered = trips
    .filter((t) => (status === "all" ? true : t.status === status))
    .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "date-asc")
        return +new Date(a.startDate) - +new Date(b.startDate);
      if (sort === "name") return a.name.localeCompare(b.name);
      return +new Date(b.startDate) - +new Date(a.startDate);
    });

  return (
    <AppLayout>
      <PageHeader
        title="My Trips"
        description="All your itineraries in one place."
        actions={
          <Button asChild>
            <Link to="/trips/new">
              <Plus className="h-4 w-4 mr-1" /> New trip
            </Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trips…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="date-asc">Oldest first</SelectItem>
            <SelectItem value="name">Name (A–Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No trips match your filters.
        </p>
      )}
    </AppLayout>
  );
}
