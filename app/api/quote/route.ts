import { NextResponse } from "next/server";
import { sendLead } from "@/lib/lead-email";

/*
 * Lead intake -> the shop's inbox, via Epic's client email protocol.
 *
 * This route only validates and hands off; lib/lead-email.ts builds and sends
 * the email, so the preview route renders exactly what actually gets sent.
 *
 * Requires BREVO_API_KEY and LEAD_TO_EMAIL. Without them sendLead no-ops and
 * this returns 502 rather than a cheerful ok — a misconfigured deploy should
 * make the visitor see the "call him instead" fallback, not swallow the lead.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const d = body as Record<string, unknown>;
  const name = str(d.name);
  const phone = str(d.phone);

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "name and phone required" },
      { status: 422 },
    );
  }

  const res = await sendLead({
    name,
    phone,
    email: str(d.email),
    issues: Array.isArray(d.issues) ? d.issues.map(String) : [],
    vehicle: str(d.vehicle),
    where: str(d.where),
    city: str(d.city),
    urgency: str(d.urgency),
    notes: str(d.notes),
  });

  if (!res.ok) {
    console.error("[game-changer] lead email failed", {
      skipped: res.skipped,
      status: res.status,
      error: res.error,
      name,
      phone,
    });
    return NextResponse.json(
      { ok: false, error: "send failed" },
      { status: 502 },
    );
  }

  console.log("[game-changer] lead emailed", { messageId: res.messageId, name });
  return NextResponse.json({ ok: true });
}
