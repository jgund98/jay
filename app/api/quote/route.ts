import { NextResponse } from "next/server";
import { sendLead } from "@/lib/lead-email";

/*
 * Lead intake -> the shop's inbox, via Epic's client email protocol.
 *
 * This route only validates and hands off; lib/lead-email.ts builds and sends
 * the email, so the preview route renders exactly what actually gets sent.
 *
 * Requires BREVO_API_KEY. Without it sendLead no-ops and this returns 502
 * rather than a cheerful ok — a misconfigured deploy should make the visitor
 * see the "call him instead" fallback, not swallow the lead.
 *
 * GET is a health check, because the only other way to find out whether a
 * deploy can send is to submit the form — and submitting the form mails a
 * fake lead to the shop owner.
 *
 *   GET /api/quote            -> is the key present
 *   GET /api/quote?verify=1   -> is it actually a working key, checked against
 *                                Brevo's account endpoint, which sends nothing
 *
 * The second one matters: a key can be present and still wrong. This one was
 * handed over base64-wrapped, and pasting the wrapper instead of the decoded
 * xkeysib-... value would look identical here but 401 on every send. Neither
 * response ever includes the key.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function GET(req: Request) {
  const key = process.env.BREVO_API_KEY;
  const configured = Boolean(key);
  if (!configured || !new URL(req.url).searchParams.has("verify")) {
    return NextResponse.json({ ok: true, configured });
  }
  try {
    const res = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": key as string, accept: "application/json" },
    });
    return NextResponse.json({
      ok: true,
      configured,
      keyValid: res.ok,
      brevoStatus: res.status,
    });
  } catch {
    return NextResponse.json({
      ok: true,
      configured,
      keyValid: false,
      brevoStatus: 0,
    });
  }
}

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
