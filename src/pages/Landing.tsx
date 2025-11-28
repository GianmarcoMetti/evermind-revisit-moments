import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  ChefHat,
  UploadCloud,
  Sparkles,
  Megaphone,
  TrendingUp,
  ShieldCheck,
  UtensilsCrossed,
  Sandwich,
  Salad,
  Phone,
  Mail,
  CheckCircle2,
  Link2,
} from "lucide-react";

const platformOptions = [
  "Uber Eats",
  "Deliveroo",
  "Glovo",
  "DoorDash",
  "Wolt",
  "Own delivery / phone orders",
];

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function Landing() {
  const formRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [menuFile, setMenuFile] = useState<File | null>(null);
  const [deliveryPlatforms, setDeliveryPlatforms] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    restaurantName: "",
    cityCountry: "",
    menuLink: "",
    email: "",
    phone: "",
    notes: "",
  });

  const howItWorks = useMemo(
    () => [
      {
        title: "Upload your menu",
        description: "PDF, photo, or link — anything works.",
        icon: UploadCloud,
      },
      {
        title: "AI brand ideas",
        description: "We find 2–5 niche virtual brands that match your dishes.",
        icon: Sparkles,
      },
      {
        title: "We launch & market",
        description: "We build the brands, set up the listings, and handle ads.",
        icon: Megaphone,
      },
      {
        title: "You cook — we sell",
        description: "Orders come in, you fulfill them, and you get paid.",
        icon: TrendingUp,
      },
    ],
    [],
  );

  const scenarios = useMemo(
    () => [
      {
        title: "Pizzeria with extras",
        dishes: "Also cooks pasta, burgers, salads",
        brands: ["Pasta Express", "Burger Corner", "Green Bowl Club"],
        icon: Sandwich,
      },
      {
        title: "Hotel kitchen",
        dishes: "Idle capacity at night",
        brands: ["Breakfast to Bed", "Local Pasta Lab", "Hotel Burgers"],
        icon: ChefHat,
      },
      {
        title: "Italian desserts",
        dishes: "Strong tiramisù & panna cotta menu",
        brands: ["Tiramisù Nights", "Panna Cotta Club", "Dolci Express"],
        icon: Salad,
      },
    ],
    [],
  );

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const togglePlatform = (platform: string) => {
    setDeliveryPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform],
    );
  };

  const handleUpload = async (file: File) => {
    const bucket = import.meta.env.VITE_SUPABASE_MENU_BUCKET || "menu-uploads";
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt ?? "file"}`;

    const { data: signedData, error: signedError } =
      await supabase.storage
        .from(bucket)
        .createSignedUploadUrl(fileName, 60);

    if (signedError || !signedData) {
      throw new Error("Could not create a signed upload link. Please try again.");
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .uploadToSignedUrl(fileName, signedData.token, file);

    if (uploadError) {
      throw new Error("Upload failed. Please try a smaller file or different format.");
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.restaurantName || !formValues.cityCountry || !formValues.email) {
      setStatus("error");
      setStatusMessage("Please fill in restaurant name, city & country, and email.");
      return;
    }

    if (!formValues.menuLink && !menuFile) {
      setStatus("error");
      setStatusMessage("Add a menu link or upload a PDF/photo so we can analyze it.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      let menuFileUrl = "";

      if (menuFile) {
        menuFileUrl = await handleUpload(menuFile);
      }

      const response = await fetch("/api/submit-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          deliveryPlatforms,
          menuFileName: menuFile?.name ?? "",
          menuFileUrl,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setStatusMessage(
        "Thanks! We received your menu and will share your virtual brand ideas shortly.",
      );
      setFormValues({
        restaurantName: "",
        cityCountry: "",
        menuLink: "",
        email: "",
        phone: "",
        notes: "",
      });
      setMenuFile(null);
      setDeliveryPlatforms([]);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "We couldn't submit the form. Please try again.",
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 via-amber-50/60 to-emerald-50 text-slate-900">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#fef3c7,_transparent_35%),_radial-gradient(circle_at_bottom_right,_#d1fae5,_transparent_30%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium shadow-soft">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>No setup cost. We only add ~15% margin on delivery prices.</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] items-center">
            <div className="space-y-8">
              <Badge className="bg-emerald-600/10 text-emerald-800 border-emerald-200">
                Delivery-only brands for restaurants
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-emerald-950">
                Turn your existing menu into new delivery-only brands (for free)
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                We create virtual brands using the dishes you already cook. No cost, no risk.
                You cook — we bring the orders and add a small ~15% margin on the delivery price
                to earn our revenue.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-md"
                  onClick={scrollToForm}
                >
                  Check your menu potential
                </Button>
                <div className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl shadow-soft text-sm text-slate-700">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  <span>We launch 2–5 ready-to-sell brands in days</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-700">
                <div className="bg-white/70 p-4 rounded-xl shadow-soft flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Restaurant keeps existing dine-in menu and pricing</span>
                </div>
                <div className="bg-white/70 p-4 rounded-xl shadow-soft flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>We manage delivery listings & marketing</span>
                </div>
                <div className="bg-white/70 p-4 rounded-xl shadow-soft flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Restaurant receives base menu price on every order</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-white/70 rounded-3xl blur-xl" />
              <div className="relative rounded-3xl border border-emerald-100 bg-white/80 shadow-soft-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed className="h-10 w-10 text-emerald-600" />
                    <div>
                      <p className="text-sm text-slate-600">Virtual brand ideas ready</p>
                      <p className="text-lg font-semibold text-emerald-900">Cook what you know</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    0€ setup
                  </Badge>
                </div>

                <div className="space-y-3">
                  {["Pasta Express", "Burger Corner", "Green Bowl Club"].map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        <div>
                          <p className="font-semibold text-emerald-900">{brand}</p>
                          <p className="text-xs text-slate-600">Ready to list on delivery apps</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-emerald-200 text-emerald-800">
                        Margin ~15%
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-5 space-y-3">
                  <p className="text-sm uppercase tracking-wide text-white/80">How we get paid</p>
                  <p className="text-xl font-semibold">We list your €10 dish at €11.50.</p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    You receive the original €10. We keep the €1.50 margin. There is no subscription,
                    setup fee, or marketing cost for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 space-y-16">
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Megaphone className="h-5 w-5 text-amber-600" />
            <p className="text-sm font-semibold text-amber-700 uppercase">How it works</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/80 p-5 shadow-soft border border-slate-100 space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-950">{title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-semibold text-emerald-700 uppercase">Example scenarios</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {scenarios.map(({ title, dishes, brands, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/80 p-5 shadow-soft-md border border-slate-100 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-950">{title}</h3>
                    <p className="text-sm text-slate-600">{dishes}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div
                      key={brand}
                      className="flex items-center gap-2 text-sm text-emerald-900 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white/80 shadow-soft-lg border border-emerald-100 p-6 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-emerald-700 uppercase">Why this is free</p>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-950">
                We simply add a small margin (~15%) on your delivery prices
              </h2>
              <p className="text-slate-700 max-w-2xl">
                Example: your dish costs €10. We list it at €11.50 on delivery apps. The customer pays
                €11.50. You receive €10. We keep €1.50 as our revenue share. No setup fee, no monthly
                cost, and we handle the marketing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-6 shadow-soft-md max-w-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase text-white/80">Revenue share</p>
                  <p className="text-3xl font-bold">+15% delivery margin</p>
                  <p className="text-sm text-white/90 mt-2">
                    We only earn when we bring you orders. No risk for the restaurant.
                  </p>
                </div>
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </section>

        <section ref={formRef} className="rounded-3xl bg-white/90 shadow-soft-lg border border-slate-100 p-6 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700 uppercase">Menu checker</p>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-950">
                Check if your menu can become more brands
              </h2>
              <p className="text-slate-700 max-w-2xl">
                Upload your menu or share a link. We'll analyze it, suggest virtual brand concepts, and
                send you the ideas. No obligation, no cost.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 text-emerald-800">
                <UploadCloud className="h-4 w-4" />
                Accepts PDF or photo
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-50 text-amber-800">
                <Link2 className="h-4 w-4" />
                Or paste a link
              </div>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Restaurant name *</Label>
                <Input
                  id="restaurantName"
                  placeholder="e.g. Nonna's Kitchen"
                  value={formValues.restaurantName}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, restaurantName: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cityCountry">City & country *</Label>
                <Input
                  id="cityCountry"
                  placeholder="e.g. Milan, Italy"
                  value={formValues.cityCountry}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, cityCountry: event.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="menuLink">Link to menu (optional)</Label>
                <Input
                  id="menuLink"
                  placeholder="https://"
                  value={formValues.menuLink}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, menuLink: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menuFile">Upload menu (PDF or photo)</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="menuFile"
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(event) => setMenuFile(event.target.files?.[0] ?? null)}
                  />
                  {menuFile && (
                    <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200">
                      {menuFile.name}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500">Add a link or upload a file — at least one is required.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@restaurant.com"
                  value={formValues.email}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Optional"
                  value={formValues.phone}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, phone: event.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Delivery platforms you use</Label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {platformOptions.map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2"
                  >
                    <Checkbox
                      checked={deliveryPlatforms.includes(platform)}
                      onCheckedChange={() => togglePlatform(platform)}
                    />
                    <span className="text-sm text-slate-700">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea
                id="notes"
                placeholder="Prep times, best sellers, allergens, delivery setup..."
                value={formValues.notes}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, notes: event.target.value }))
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-600 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>
                  We analyze your menu for free. If you like the concepts, we launch them and only earn from
                  the delivery margin.
                </span>
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Check your menu potential"}
              </Button>
            </div>

            {statusMessage && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  status === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                {status === "success" ? "✅ " : "⚠️ "}
                {statusMessage}
              </div>
            )}
          </form>
        </section>

        <section className="rounded-2xl bg-emerald-700 text-white p-6 md:p-10 shadow-soft-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm uppercase text-white/80">Ready to see the ideas?</p>
              <h3 className="text-2xl font-bold">Share your menu and get 2–5 virtual brand concepts.</h3>
              <p className="text-white/90 text-sm md:text-base">
                We handle positioning, listings, and marketing. You keep cooking what you know. We add a
                small margin on top to get paid.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>We reply with ideas in 1–2 business days.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>No sales pressure — only useful concepts for your kitchen.</span>
              </div>
              <Button
                variant="secondary"
                className="bg-white text-emerald-800 hover:bg-white/90"
                onClick={scrollToForm}
              >
                Check your menu potential
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
