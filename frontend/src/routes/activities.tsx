import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { ActivityCard } from "@/components/activity-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activities } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Activities — Traveloop" }] }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [cost, setCost] = useState("all");

  const filtered = activities
    .filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))
    .filter((a) => (cat === "all" ? true : a.category === cat))
    .filter((a) =>
      cost === "low"
        ? a.cost < 80
        : cost === "mid"
          ? a.cost >= 80 && a.cost < 200
          : cost === "high"
            ? a.cost >= 200
            : true,
    );

  return (
    <AppLayout>
      <PageHeader
        title="Activities"
        description="Hand-picked experiences for every kind of traveler."
      />
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {[
              "Adventure",
              "Culture",
              "Food",
              "Nature",
              "Nightlife",
              "Relax",
            ].map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={cost} onValueChange={setCost}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any cost</SelectItem>
            <SelectItem value="low">Under $80</SelectItem>
            <SelectItem value="mid">$80 – $200</SelectItem>
            <SelectItem value="high">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((a) => (
          <ActivityCard
            key={a.id}
            activity={a}
            onAdd={() => toast.success(`${a.name} added`)}
          />
        ))}
      </div>
    </AppLayout>
  );
}
