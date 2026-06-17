import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { CityCard } from "@/components/city-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover Cities — Traveloop" }] }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");
  const [budget, setBudget] = useState("all");

  const regions = useMemo(
    () => Array.from(new Set(cities.map((c) => c.region))),
    [],
  );
  const filtered = cities
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.country.toLowerCase().includes(q.toLowerCase()),
    )
    .filter((c) => (region === "all" ? true : c.region === region))
    .filter((c) => {
      if (budget === "low") return c.costIndex < 50;
      if (budget === "mid") return c.costIndex >= 50 && c.costIndex < 75;
      if (budget === "high") return c.costIndex >= 75;
      return true;
    });

  return (
    <AppLayout>
      <PageHeader
        title="Discover cities"
        description="Find your next destination from our handpicked directory."
      />
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cities or countries…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any budget</SelectItem>
            <SelectItem value="low">Budget-friendly</SelectItem>
            <SelectItem value="mid">Mid-range</SelectItem>
            <SelectItem value="high">High-end</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((c) => (
          <CityCard
            key={c.id}
            city={c}
            onSave={() => toast.success(`${c.name} saved!`)}
          />
        ))}
      </div>
    </AppLayout>
  );
}
