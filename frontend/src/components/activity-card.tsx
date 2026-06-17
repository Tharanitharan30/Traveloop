import { Clock, Star, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/lib/mock-data";

export function ActivityCard({
  activity,
  onAdd,
}: {
  activity: Activity;
  onAdd?: () => void;
}) {
  return (
    <Card className="overflow-hidden p-0 group transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={activity.image}
          alt={activity.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground border-0">
          {activity.category}
        </Badge>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold leading-tight line-clamp-1">
            {activity.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {activity.description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {activity.duration}h
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />{" "}
            {activity.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="font-semibold">${activity.cost}</span>
          <Button size="sm" variant="outline" onClick={onAdd}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
