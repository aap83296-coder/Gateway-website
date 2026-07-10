import { createActor } from "@/backend";
import type { ContactMessage, PortfolioItem, Service } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Cloud,
  Code,
  CreditCard,
  Edit,
  Globe,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Server,
  Shield,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type Page = "home" | "about" | "services" | "portfolio" | "contact" | "admin";
void (null as unknown as Page);

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Code,
  Smartphone,
  Server,
  Shield,
  CreditCard,
  Cloud,
  Search,
  MessageSquare,
};

const iconOptions = Object.keys(iconMap);

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

// ─── Login Screen ──────────────────────────────────────────────────────────────
interface LoginProps {
  onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginProps) {
  const { actor } = useActor(createActor);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      let ok = false;
      if (actor) {
        ok = await actor.checkAdminCredentials(username, password);
      } else {
        ok = username === "admin" && password === "gsi2000";
      }
      if (ok) {
        onLogin();
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch {
      if (username === "admin" && password === "gsi2000") {
        onLogin();
      } else {
        setLoginError("Unable to verify credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm px-4"
      >
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-md">
                <Lock size={26} className="text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                gSoft Admin
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Content Management System
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-user">Username</Label>
                <Input
                  data-ocid="admin.input"
                  id="admin-user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-pass">Password</Label>
                <Input
                  data-ocid="admin.input"
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              {loginError && (
                <p
                  data-ocid="admin.error_state"
                  className="text-destructive text-sm"
                >
                  {loginError}
                </p>
              )}
              <Button
                data-ocid="admin.submit_button"
                type="submit"
                className="w-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Verifying…" : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ─── Portfolio Tab ──────────────────────────────────────────────────────────────
interface PortfolioForm {
  title: string;
  client: string;
  year: number;
  category: string;
  technologies: string;
  description: string;
}

const emptyPortfolioForm: PortfolioForm = {
  title: "",
  client: "",
  year: new Date().getFullYear(),
  category: "",
  technologies: "",
  description: "",
};

function PortfolioTab() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<PortfolioForm>(emptyPortfolioForm);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin", "portfolio"],
    queryFn: async () => (actor ? actor.listPortfolioItems() : []),
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (f: PortfolioForm) => {
      if (!actor) throw new Error("No actor");
      const techs = f.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      return actor.addPortfolioItem(
        f.title,
        f.client,
        BigInt(f.year),
        f.category,
        techs,
        f.description,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
      toast.success("Portfolio item added.");
      setModal(false);
    },
    onError: () => toast.error("Failed to add portfolio item."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, f }: { id: bigint; f: PortfolioForm }) => {
      if (!actor) throw new Error("No actor");
      const techs = f.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      return actor.updatePortfolioItem(
        id,
        f.title,
        f.client,
        BigInt(f.year),
        f.category,
        techs,
        f.description,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
      toast.success("Portfolio item updated.");
      setModal(false);
    },
    onError: () => toast.error("Failed to update portfolio item."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deletePortfolioItem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
      toast.success("Portfolio item deleted.");
    },
    onError: () => toast.error("Failed to delete portfolio item."),
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyPortfolioForm);
    setModal(true);
  };
  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      client: item.client,
      year: Number(item.year),
      category: item.category,
      technologies: item.technologies.join(", "),
      description: item.description,
    });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.client.trim()) {
      toast.error("Title and client are required.");
      return;
    }
    if (editing) updateMutation.mutate({ id: editing.id, f: form });
    else addMutation.mutate(form);
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          Portfolio Items{isLoading ? "" : ` (${items.length})`}
        </h2>
        <Button
          data-ocid="admin.open_modal_button"
          onClick={openAdd}
          size="sm"
          className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus size={14} /> Add New
        </Button>
      </div>
      <Card className="bg-card shadow-sm overflow-hidden">
        {isLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="py-12 text-center text-muted-foreground"
          >
            Loading…
          </div>
        ) : items.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="py-12 text-center text-muted-foreground"
          >
            No portfolio items yet. Add your first one!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow
                  key={String(item.id)}
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <TableCell className="font-medium text-foreground max-w-[180px] truncate">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.client}
                  </TableCell>
                  <TableCell>{String(item.year)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 3).map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-xs border-primary/30 text-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(item)}
                        className="h-7 px-2 gap-1"
                        data-ocid={`admin.edit_button.${i + 1}`}
                      >
                        <Edit size={12} /> Edit
                      </Button>
                      <Button
                        data-ocid={`admin.delete_button.${i + 1}`}
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(item.id)}
                        className="h-7 px-2 gap-1"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={12} /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent
          data-ocid="admin.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto bg-card"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Title *</Label>
              <Input
                data-ocid="admin.input"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Project title"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Client *</Label>
                <Input
                  data-ocid="admin.input"
                  value={form.client}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, client: e.target.value }))
                  }
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Year</Label>
                <Input
                  data-ocid="admin.input"
                  type="number"
                  value={form.year}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, year: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input
                data-ocid="admin.input"
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                placeholder="e.g. Government, Healthcare, Finance"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Technologies (comma-separated)</Label>
              <Input
                data-ocid="admin.input"
                value={form.technologies}
                onChange={(e) =>
                  setForm((p) => ({ ...p, technologies: e.target.value }))
                }
                placeholder="Java, .NET, SAP, React…"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                data-ocid="admin.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                placeholder="Brief project description…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              data-ocid="admin.cancel_button"
              variant="outline"
              onClick={() => setModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.save_button"
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSaving}
            >
              {isSaving ? "Saving…" : editing ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Services Tab ───────────────────────────────────────────────────────────────
interface ServiceForm {
  title: string;
  description: string;
  icon: string;
  benefits: string;
}

const emptyServiceForm: ServiceForm = {
  title: "",
  description: "",
  icon: "Globe",
  benefits: "",
};

function ServicesTab() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyServiceForm);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => (actor ? actor.listServices() : []),
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (f: ServiceForm) => {
      if (!actor) throw new Error("No actor");
      const benefits = f.benefits
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);
      return actor.addService(f.title, f.description, f.icon, benefits);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Service added.");
      setModal(false);
    },
    onError: () => toast.error("Failed to add service."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, f }: { id: bigint; f: ServiceForm }) => {
      if (!actor) throw new Error("No actor");
      const benefits = f.benefits
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);
      return actor.updateService(id, f.title, f.description, f.icon, benefits);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Service updated.");
      setModal(false);
    },
    onError: () => toast.error("Failed to update service."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteService(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success("Service deleted.");
    },
    onError: () => toast.error("Failed to delete service."),
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyServiceForm);
    setModal(true);
  };
  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({
      title: svc.title,
      description: svc.description,
      icon: svc.icon,
      benefits: svc.benefits.join("\n"),
    });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("Service title is required.");
      return;
    }
    if (editing) updateMutation.mutate({ id: editing.id, f: form });
    else addMutation.mutate(form);
  };

  const isSaving = addMutation.isPending || updateMutation.isPending;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          Services{isLoading ? "" : ` (${services.length})`}
        </h2>
        <Button
          data-ocid="admin.open_modal_button"
          onClick={openAdd}
          size="sm"
          className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus size={14} /> Add New
        </Button>
      </div>
      <Card className="bg-card shadow-sm overflow-hidden">
        {isLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="py-12 text-center text-muted-foreground"
          >
            Loading…
          </div>
        ) : services.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="py-12 text-center text-muted-foreground"
          >
            No services yet. Add your first one!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Icon</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((svc, i) => {
                const IconComp = iconMap[svc.icon] ?? Globe;
                return (
                  <TableRow
                    key={String(svc.id)}
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <TableCell>
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                        <IconComp size={16} className="text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {svc.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                      {svc.description}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {svc.benefits.length} benefit
                      {svc.benefits.length !== 1 ? "s" : ""}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(svc)}
                          className="h-7 px-2 gap-1"
                          data-ocid={`admin.edit_button.${i + 1}`}
                        >
                          <Edit size={12} /> Edit
                        </Button>
                        <Button
                          data-ocid={`admin.delete_button.${i + 1}`}
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(svc.id)}
                          className="h-7 px-2 gap-1"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={12} /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent
          data-ocid="admin.dialog"
          className="max-w-lg max-h-[90vh] overflow-y-auto bg-card"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editing ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Service Title *</Label>
              <Input
                data-ocid="admin.input"
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
                placeholder="Service name"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Icon</Label>
              <select
                data-ocid="admin.select"
                value={form.icon}
                onChange={(e) =>
                  setForm((s) => ({ ...s, icon: e.target.value }))
                }
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {iconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                data-ocid="admin.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((s) => ({ ...s, description: e.target.value }))
                }
                rows={3}
                placeholder="Brief service description…"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Benefits (one per line)</Label>
              <Textarea
                data-ocid="admin.textarea"
                value={form.benefits}
                onChange={(e) =>
                  setForm((s) => ({ ...s, benefits: e.target.value }))
                }
                rows={4}
                placeholder={
                  "24/7 availability\nDedicated support team\nScalable infrastructure"
                }
              />
              <p className="text-xs text-muted-foreground">
                Enter each benefit on a new line
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              data-ocid="admin.cancel_button"
              variant="outline"
              onClick={() => setModal(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.save_button"
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSaving}
            >
              {isSaving ? "Saving…" : editing ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Messages Tab ───────────────────────────────────────────────────────────────
function MessagesTab() {
  const { actor, isFetching } = useActor(createActor);
  const [expanded, setExpanded] = useState<bigint | null>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => (actor ? actor.listContactMessages() : []),
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });

  const sorted = [...messages].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          Contact Messages{isLoading ? "" : ` (${sorted.length})`}
        </h2>
        <Badge
          variant="outline"
          className="text-xs border-primary/40 text-primary"
        >
          Read-only
        </Badge>
      </div>
      <Card className="bg-card shadow-sm overflow-hidden">
        {isLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="py-12 text-center text-muted-foreground"
          >
            Loading messages…
          </div>
        ) : sorted.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="py-12 text-center text-muted-foreground"
          >
            No contact messages yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((msg: ContactMessage, i) => (
                <>
                  <TableRow
                    key={String(msg.id)}
                    data-ocid={`admin.item.${i + 1}`}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() =>
                      setExpanded(expanded === msg.id ? null : msg.id)
                    }
                  >
                    <TableCell className="font-medium text-foreground">
                      {msg.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {msg.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {msg.phone || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 text-foreground capitalize"
                      >
                        {msg.subject}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(msg.timestamp)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      <div className="flex items-center gap-1">
                        {msg.message.slice(0, 60)}
                        {msg.message.length > 60 ? "…" : ""}
                        {expanded === msg.id ? (
                          <X size={12} />
                        ) : (
                          <MessageSquare size={12} />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {expanded === msg.id && (
                    <TableRow key={`${String(msg.id)}-expanded`}>
                      <TableCell colSpan={6} className="bg-muted/20 p-4">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            gSoft Admin Panel
          </h1>
          <p className="text-primary-foreground/70 text-xs mt-0.5">
            Content Management System
          </p>
        </div>
        <Button
          data-ocid="admin.logout_button"
          onClick={() => setLoggedIn(false)}
          variant="outline"
          size="sm"
          className="gap-1.5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
        >
          <LogOut size={14} /> Logout
        </Button>
      </div>

      {/* Amber accent bar */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="portfolio">
          <TabsList className="mb-6 bg-muted border border-border">
            <TabsTrigger
              data-ocid="admin.portfolio.tab"
              value="portfolio"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.services.tab"
              value="services"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.messages.tab"
              value="messages"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
