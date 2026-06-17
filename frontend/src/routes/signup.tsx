import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Traveloop" }] }),
  component: SignupPage,
});

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0-4
}

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const score = useMemo(() => strength(form.password), [form.password]);
  const labels = ["Too weak", "Weak", "Okay", "Good", "Strong"];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please fill all fields");
    if (form.password !== form.confirm)
      return toast.error("Passwords don't match");
    if (score < 2) return toast.error("Please pick a stronger password");
    toast.success("Account created!");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Plane className="h-5 w-5 -rotate-45" />
          </div>
          <span className="text-lg font-semibold">Traveloop</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Start planning unforgettable trips in seconds.
        </p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div className="grid gap-2">
            <Label>Full name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {form.password && (
              <div className="space-y-1">
                <div className="flex gap-1 h-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${i < score ? (score < 2 ? "bg-destructive" : score < 3 ? "bg-warning" : "bg-success") : "bg-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{labels[score]}</p>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Confirm password</Label>
            <Input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            {form.confirm && form.confirm === form.password && (
              <p className="text-xs text-success inline-flex items-center gap-1">
                <Check className="h-3 w-3" /> Passwords match
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-sm text-center text-muted-foreground mt-6">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
