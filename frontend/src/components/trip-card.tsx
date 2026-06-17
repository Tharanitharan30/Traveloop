import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Trip } from "@/lib/mock-data";
import { format } from "date-fns";

const statusTone: Record<Trip["status"], string> = {
  draft: "bg-muted text-muted-foreground",
  upcoming: "bg-primary/10 text-primary",
  ongoing: "bg-accent/15 text-accent",
  completed: "bg-success/15 text-success",
};

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      to="/trips/$tripId"
      params={{ tripId: trip.id }}
      className="group block"
    >
      <Card className="overflow-hidden p-0 transition-all hover:shadow-lg hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={trip.cover}
            alt={trip.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge
            className={`absolute top-3 left-3 capitalize ${statusTone[trip.status]} border-0`}
          >
            {trip.status}
          </Badge>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-1">
              {trip.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
              {trip.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(trip.startDate), "MMM d")} –{" "}
              {format(new Date(trip.endDate), "MMM d")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {trip.stops.length} {trip.stops.length === 1 ? "stop" : "stops"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Wallet className="h-3.5 w-3.5" />${trip.budget.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
