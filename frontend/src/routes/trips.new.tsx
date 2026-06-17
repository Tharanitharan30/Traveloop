import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/trips/new")({
  head: () => ({ meta: [{ title: "New Trip — Traveloop" }] }),
  component: NewTripPage,
});

function NewTripPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    start: "",
    end: "",
  });
  const submit = (publish: boolean) => {
    if (!form.name) return toast.error("Trip name is required");
    toast.success(publish ? "Trip published!" : "Draft saved");
    navigate({ to: "/trips" });
  };

  return (
    <AppLayout>
      <PageHeader
        title="Create a new trip"
        description="Start with the basics — you can add cities and activities next."
      />
      <Card className="p-6 md:p-8 max-w-3xl">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Trip name</Label>
            <Input
              id="name"
              placeholder="e.g. Japan Discovery"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="What's the vibe of this trip?"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start">Start date</Label>
              <Input
                id="start"
                type="date"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end">End date</Label>
              <Input
                id="end"
                type="date"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Cover image</Label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground hover:bg-muted/40 transition cursor-pointer">
              <ImagePlus className="h-6 w-6 mx-auto" />
              <p className="text-sm mt-2">
                Drop an image here or click to upload
              </p>
              <p className="text-xs">PNG, JPG up to 5MB</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" onClick={() => submit(false)}>
              Save draft
            </Button>
            <Button onClick={() => submit(true)}>Publish trip</Button>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
