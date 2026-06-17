import { Heart, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { City } from "@/lib/mock-data";

export function CityCard({
  city,
  onSave,
}: {
  city: City;
  onSave?: () => void;
}) {
  return (
    <Card className="overflow-hidden p-0 group transition-all hover:shadow-lg hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={city.image}
          alt={city.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave?.();
          }}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-foreground hover:bg-white transition"
          aria-label="Save city"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate">
                {city.name}
              </h3>
              <p className="text-xs text-white/80">{city.country}</p>
            </div>
            <Badge
              variant="secondary"
              className="bg-white/90 text-foreground border-0 shrink-0"
            >
              <TrendingUp className="h-3 w-3 mr-1" /> {city.popularity}
            </Badge>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {city.description}
        </p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Cost index</span>
          <div className="flex items-center gap-2 flex-1 max-w-[140px] ml-2">
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${city.costIndex}%` }}
              />
            </div>
            <span className="font-medium tabular-nums w-6 text-right">
              {city.costIndex}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
