import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getTrip,
  getCity,
  getActivity,
  packingTemplate,
  notesSeed,
  type Trip,
} from "@/lib/mock-data";
import {
  Calendar,
  MapPin,
  Wallet,
  Share2,
  Pencil,
  Plus,
  Clock,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";

export const Route = createFileRoute("/trips/$tripId")({
  head: ({ params }) => ({
    meta: [{ title: `${getTrip(params.tripId)?.name ?? "Trip"} — Traveloop` }],
  }),
  loader: ({ params }) => {
    const trip = getTrip(params.tripId);
    if (!trip) throw notFound();
    return { trip };
  },
  component: TripDetailPage,
  notFoundComponent: () => (
    <AppLayout>
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Trip not found</h2>
        <Button asChild className="mt-4">
          <Link to="/trips">Back to trips</Link>
        </Button>
      </div>
    </AppLayout>
  ),
});

function TripDetailPage() {
  const { trip } = Route.useLoaderData() as { trip: Trip };
  const days =
    differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  const notes = notesSeed.filter((n) => n.tripId === trip.id);

  return (
    <AppLayout>
      <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[21/8] bg-muted">
        <img
          src={trip.cover}
          alt={trip.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <Badge className="bg-white/20 backdrop-blur border-0 text-white capitalize mb-2">
            {trip.status}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {trip.name}
          </h1>
          <p className="text-white/85 mt-1 max-w-2xl">{trip.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(trip.startDate), "MMM d")} –{" "}
              {format(new Date(trip.endDate), "MMM d, yyyy")} · {days} days
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {trip.stops.length} stops
            </span>
            <span className="inline-flex items-center gap-1">
              <Wallet className="h-4 w-4" />${trip.budget.toLocaleString()}{" "}
              budget
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90">
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90">
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="packing">Packing</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-semibold mt-1">{days} days</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Cities</p>
              <p className="text-2xl font-semibold mt-1">{trip.stops.length}</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Spent / Budget</p>
              <p className="text-2xl font-semibold mt-1">
                ${trip.spent.toLocaleString()}{" "}
                <span className="text-sm text-muted-foreground font-normal">
                  / ${trip.budget.toLocaleString()}
                </span>
              </p>
              <Progress
                value={(trip.spent / trip.budget) * 100}
                className="mt-2 h-1.5"
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="itinerary" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add stop
            </Button>
          </div>
          <div className="relative pl-8 space-y-6">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            {trip.stops.map((stop, i) => {
              const city = getCity(stop.cityId);
              if (!city) return null;
              return (
                <div key={stop.id} className="relative">
                  <div className="absolute -left-6 top-3 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  <Card className="overflow-hidden p-0">
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="md:w-48 h-40 md:h-auto object-cover"
                      />
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Stop {i + 1}
                            </p>
                            <h3 className="text-lg font-semibold">
                              {city.name}, {city.country}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {format(new Date(stop.arrival), "MMM d")} –{" "}
                              {format(new Date(stop.departure), "MMM d")}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </div>
                        {stop.activityIds.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              Activities
                            </p>
                            {stop.activityIds.map((aid) => {
                              const a = getActivity(aid);
                              if (!a) return null;
                              return (
                                <div
                                  key={aid}
                                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                                >
                                  <img
                                    src={a.image}
                                    alt=""
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                      {a.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
                                      <Clock className="h-3 w-3" /> {a.duration}
                                      h · ${a.cost}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="mt-6">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-3xl font-semibold">
              ${trip.spent.toLocaleString()}{" "}
              <span className="text-base text-muted-foreground font-normal">
                of ${trip.budget.toLocaleString()}
              </span>
            </p>
            <Progress
              value={(trip.spent / trip.budget) * 100}
              className="mt-3"
            />
            <p className="text-sm text-muted-foreground mt-4">
              Visit the{" "}
              <Link to="/budget" className="text-primary underline">
                Budget dashboard
              </Link>{" "}
              for detailed breakdowns.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="packing" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {packingTemplate.slice(0, 8).map((p, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/40 cursor-pointer"
              >
                <Checkbox defaultChecked={p.packed} />
                <span className="flex-1">{p.name}</span>
                <Badge variant="secondary">{p.category}</Badge>
              </label>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6 space-y-4">
          {notes.length === 0 && (
            <p className="text-muted-foreground">No notes for this trip yet.</p>
          )}
          {notes.map((n) => (
            <Card key={n.id} className="p-5">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{n.content}</p>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
