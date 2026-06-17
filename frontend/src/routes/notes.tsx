import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Clock } from "lucide-react";
import { notesSeed, type Note } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Notes & Journal — Traveloop" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(notesSeed);
  const [draft, setDraft] = useState({ title: "", content: "" });

  const add = () => {
    if (!draft.title.trim()) return;
    setNotes([
      {
        id: `n${Date.now()}`,
        tripId: "t1",
        title: draft.title,
        content: draft.content,
        createdAt: new Date().toISOString(),
      },
      ...notes,
    ]);
    setDraft({ title: "", content: "" });
  };

  return (
    <AppLayout>
      <PageHeader
        title="Notes & Journal"
        description="Capture moments, tips and ideas from your travels."
      />

      <Card className="p-5 mb-6">
        <div className="space-y-3">
          <Input
            placeholder="Note title…"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="text-base font-medium border-0 px-0 focus-visible:ring-0 shadow-none"
          />
          <Textarea
            placeholder="Write a note, journal entry, or travel tip…"
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            rows={3}
            className="border-0 px-0 focus-visible:ring-0 shadow-none resize-none"
          />
          <div className="flex justify-end border-t pt-3">
            <Button onClick={add} size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add note
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((n) => (
          <Card key={n.id} className="p-5 group hover:shadow-md transition">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold">{n.title}</h3>
              <button
                onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
              {n.content}
            </p>
            <p className="text-xs text-muted-foreground mt-3 inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />{" "}
              {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
            </p>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
