import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Shirt,
  FileText,
  Smartphone,
  Sparkles,
  Trash2,
} from "lucide-react";
import { packingTemplate } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/packing")({
  head: () => ({ meta: [{ title: "Packing List — Traveloop" }] }),
  component: PackingPage,
});

interface Item {
  id: string;
  category: string;
  name: string;
  packed: boolean;
}

const icons: Record<string, typeof Shirt> = {
  Clothing: Shirt,
  Documents: FileText,
  Electronics: Smartphone,
  Essentials: Sparkles,
};

function PackingPage() {
  const [items, setItems] = useState<Item[]>(
    packingTemplate.map((p, i) => ({ id: `p${i}`, ...p })),
  );
  const [newItem, setNewItem] = useState({ name: "", category: "Essentials" });

  const toggle = (id: string) =>
    setItems((arr) =>
      arr.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)),
    );
  const remove = (id: string) =>
    setItems((arr) => arr.filter((i) => i.id !== id));
  const add = () => {
    if (!newItem.name.trim()) return;
    setItems((arr) => [
      ...arr,
      {
        id: `p${Date.now()}`,
        name: newItem.name,
        category: newItem.category,
        packed: false,
      },
    ]);
    setNewItem({ name: "", category: newItem.category });
  };

  const packed = items.filter((i) => i.packed).length;
  const pct = items.length ? (packed / items.length) * 100 : 0;
  const categories = ["Clothing", "Documents", "Electronics", "Essentials"];

  return (
    <AppLayout>
      <PageHeader
        title="Packing list"
        description="Stay organized — check items off as you pack."
      />

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-semibold">
              {packed}{" "}
              <span className="text-base font-normal text-muted-foreground">
                of {items.length} packed
              </span>
            </p>
          </div>
          <span className="text-2xl font-semibold tabular-nums">
            {Math.round(pct)}%
          </span>
        </div>
        <Progress value={pct} />
      </Card>

      <Card className="p-4 mb-6 flex gap-2">
        <Input
          placeholder="Add an item…"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <select
          className="border rounded-md px-3 text-sm bg-background"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
        </Button>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        {categories.map((cat) => {
          const Icon = icons[cat];
          const list = items.filter((i) => i.category === cat);
          return (
            <Card key={cat} className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold">{cat}</h3>
                <span className="text-xs text-muted-foreground ml-auto">
                  {list.filter((i) => i.packed).length}/{list.length}
                </span>
              </div>
              <div className="space-y-1">
                {list.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group"
                  >
                    <Checkbox
                      checked={item.packed}
                      onCheckedChange={() => toggle(item.id)}
                    />
                    <span
                      className={cn(
                        "flex-1 text-sm",
                        item.packed && "line-through text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => remove(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {list.length === 0 && (
                  <p className="text-xs text-muted-foreground py-2">
                    No items yet.
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
