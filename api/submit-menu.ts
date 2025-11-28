export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const rawBody = req.body ?? {};
    const body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : rawBody;
    const {
      restaurantName,
      cityCountry,
      menuLink,
      menuFileUrl,
      menuFileName,
      email,
      phone,
      notes,
      deliveryPlatforms,
    } = body;

    if (!restaurantName || !cityCountry || !email) {
      res.status(400).json({ error: "Restaurant name, city/country, and email are required." });
      return;
    }

    if (!menuLink && !menuFileUrl) {
      res.status(400).json({ error: "Provide a menu link or upload a menu file." });
      return;
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      res.status(500).json({ error: "N8N webhook URL is not configured." });
      return;
    }

    const payload = {
      restaurantName,
      cityCountry,
      menuLink,
      menuFileUrl,
      menuFileName,
      email,
      phone,
      notes,
      deliveryPlatforms: deliveryPlatforms ?? [],
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(502).json({ error: `Webhook error: ${response.status} ${errorText}` });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("/api/submit-menu error", error);
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Unexpected server error" });
  }
}
