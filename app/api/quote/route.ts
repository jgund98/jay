import { NextResponse } from "next/server";

/*
 * Lead intake.
 *
 * ⚠️ JORDAN — this is a stub. It validates and logs; it does not deliver.
 * Wire it to the Brevo drop-in (epic\client-email-protocol) plus an SMS to
 * Jay before this site goes live, or leads will fall on the floor.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const d = body as Record<string, unknown>;
  const name = typeof d.name === "string" ? d.name.trim() : "";
  const phone = typeof d.phone === "string" ? d.phone.trim() : "";

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "name and phone required" },
      { status: 422 },
    );
  }

  console.log("[game-changer] quote request", {
    at: new Date().toISOString(),
    name,
    phone,
    issues: d.issues,
    where: d.where,
    city: d.city,
    urgency: d.urgency,
    vehicle: d.vehicle,
    notes: d.notes,
  });

  return NextResponse.json({ ok: true });
}
