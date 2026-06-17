import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { TripCard } from "@/components/trip-card";
import { sharedTrips } from "@/lib/mock-data";

export const Route = createFileRoute("/shared")({
  head: () => ({ meta: [{ title: "Shared Trips — Traveloop" }] }),
  component: SharedPage,
});

function SharedPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Shared trips"
        description="Get inspired by itineraries from the Traveloop community."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sharedTrips.map((t) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </div>
    </AppLayout>
  );
}
