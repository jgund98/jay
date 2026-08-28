/*
 * Epic's client email protocol — lead notifier (Brevo transactional API).
 *
 * Adapted from epic/client-email-protocol with a branded template. Jay reads
 * these on a phone between jobs, so the customer's name and number come first
 * and the number is a real tel: link he can tap.
 *
 * Env (all of these must also exist in Vercel, or production silently sends
 * nothing — sendLead no-ops when the key or the recipient is missing):
 *   BREVO_API_KEY    required   Brevo v3 key (xkeysib-...)
 *   LEAD_TO_EMAIL    required   where this client's leads land (comma-separated ok)
 *   LEAD_FROM_EMAIL  optional   default noreply@epicdevsolutions.com
 *   LEAD_FROM_NAME   optional   default "Website"
 *   LEAD_SITE_NAME   optional   appended after the kicker; leave unset to
 *                               keep the site's domain out of the header
 */

import {
  QUOTE_ISSUES,
  QUOTE_WHERE,
  QUOTE_URGENCY,
  labelsFor,
  labelFor,
} from "@/lib/site";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || "noreply@epicdevsolutions.com";
const FROM_NAME = process.env.LEAD_FROM_NAME || "Website";
const TO_EMAIL = process.env.LEAD_TO_EMAIL || "";
const SITE_NAME = process.env.LEAD_SITE_NAME || "";

/*
 * One row of the email.
 *
 * `empty` is what to print when the value is blank: pass null to drop the row
 * entirely, or a string like "Not provided" to keep the label visible so the
 * reader can tell the question was asked and skipped, rather than wondering
 * whether the form even collects it.
 */
type LeadField = {
  label: string;
  value?: string | null;
  empty?: string | null;
  tel?: boolean;
  mailto?: boolean;
};

type LeadSection = { title: string; fields: LeadField[] };

/** What the quote form collects. */
export type Lead = {
  name: string;
  phone: string;
  email?: string;
  issues?: string[];
  vehicle?: string;
  where?: string;
  city?: string;
  urgency?: string;
  notes?: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );

const digits = (s: string) => s.replace(/\D/g, "");

/** E.164 for a US number, however the visitor typed it. */
const telHref = (raw: string) => {
  const d = digits(raw).replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `tel:+1${d}` : `tel:${digits(raw)}`;
};

/** (832) 528-0270 from any of the ways a person might type it. */
export function prettyPhone(raw: string): string {
  const d = digits(raw).replace(/^1(?=\d{10}$)/, "");
  return d.length === 10
    ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    : raw;
}

/* Email clients strip <style> and most of CSS, so every rule here is inline
   and the layout is tables. Not nostalgia — Gmail still requires it. */
const SANS =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
const C = {
  ink: "#111114",
  body: "#33323a",
  muted: "#8b8a95",
  faint: "#b6b4c0",
  line: "#e7e6ec",
  accent: "#6d28d9", // brand violet, darkened enough to read on white
  dark: "#12101c",
  page: "#f4f3f7",
};

function rows(fields: LeadField[]): string {
  return fields
    .map((f) => {
      const raw = (f.value ?? "").toString().trim();
      if (!raw && f.empty === null) return "";
      const shown = raw || f.empty || "";
      if (!shown) return "";
      let cell = esc(shown).replace(/\n/g, "<br>");
      if (raw && f.tel) {
        cell = `<a href="${telHref(raw)}" style="color:${C.accent};text-decoration:none;font-weight:700">${cell}</a>`;
      } else if (raw && f.mailto) {
        cell = `<a href="mailto:${esc(raw)}" style="color:${C.accent};text-decoration:none;font-weight:700">${cell}</a>`;
      }
      const color = raw ? C.body : C.muted;
      const italic = raw ? "" : "font-style:italic;";
      return `<tr>
        <td width="124" style="width:124px;padding:9px 18px 9px 0;color:${C.muted};font:600 11px/1.5 ${SANS};letter-spacing:.06em;text-transform:uppercase;vertical-align:top;white-space:nowrap">${esc(f.label)}</td>
        <td style="padding:9px 0;color:${color};${italic}font:15px/1.5 ${SANS};vertical-align:top">${cell}</td>
      </tr>`;
    })
    .join("");
}

/*
 * Bulletproof call button.
 *
 * The first version was a styled <a> with display:inline-block. It looked
 * right but taps did nothing on a phone, so this is the table-cell pattern
 * instead: the <td> carries the background via bgcolor (an attribute, which
 * no client strips) and the <a> is display:block so the whole cell is the
 * tap target rather than just the text baseline.
 *
 * The footer also prints the number as plain text, deliberately unlinked:
 * mail clients auto-detect bare phone numbers and make them dialable on their
 * own, which is a second tap path that survives any link rewriting a sender or
 * client might do to the href here.
 */
function callButton(phone: string): string {
  if (!digits(phone)) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0 0">
    <tr>
      <td bgcolor="${C.accent}" style="border-radius:10px;background-color:${C.accent}">
        <a href="${telHref(phone)}" style="display:block;padding:15px 26px;color:#ffffff;font:700 17px/1 ${SANS};text-decoration:none;border-radius:10px">Call ${esc(phone)}</a>
      </td>
    </tr>
  </table>`;
}

type Rendered = {
  kicker: string;
  name: string;
  phone: string;
  sections: LeadSection[];
  preheader: string;
};

function leadHtml(o: Rendered): string {
  const body = o.sections
    .map((s) => {
      const r = rows(s.fields);
      if (!r.trim()) return "";
      return `<tr><td style="padding:22px 28px 0">
        <p style="margin:0 0 4px;color:${C.accent};font:700 11px/1 ${SANS};letter-spacing:.14em;text-transform:uppercase">${esc(s.title)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">${r}</table>
      </td></tr>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:0;background:${C.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(o.preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:${C.page}">
  <tr><td align="center" style="padding:28px 14px">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${C.line};border-radius:14px;overflow:hidden">

      <tr><td style="background:${C.dark};padding:20px 28px">
        <p style="margin:0;color:#ffffff;font:800 17px/1.2 ${SANS};letter-spacing:-.01em">${esc(FROM_NAME)}</p>
        <p style="margin:5px 0 0;color:#9d94c8;font:12px/1.4 ${SANS}">${esc(o.kicker)}${SITE_NAME ? ` &middot; ${esc(SITE_NAME)}` : ""}</p>
      </td></tr>
      <tr><td style="height:3px;background:linear-gradient(90deg,#8B3DFF,#38E1E8,#FF3DC4);background-color:#8B3DFF;font-size:0;line-height:0">&nbsp;</td></tr>

      <tr><td style="padding:26px 28px 0">
        <p style="margin:0;color:${C.ink};font:800 26px/1.15 ${SANS};letter-spacing:-.02em">${esc(o.name || "New lead")}</p>
        ${callButton(o.phone)}
      </td></tr>

      ${body}

      <tr><td style="padding:24px 28px 26px">
        <div style="border-top:1px solid ${C.line};padding-top:16px">
          <p style="margin:0;color:${C.muted};font:13px/1.6 ${SANS}">
            Tap the button to call them back, or dial ${esc(o.phone)}. If they left an email address, just hit Reply.
          </p>
          <p style="margin:10px 0 0;color:${C.faint};font:11px/1.5 ${SANS}">
            Sent by the website contact form &middot; built by Epic Dev Solutions
          </p>
        </div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

function leadText(o: Rendered): string {
  const out: string[] = [o.kicker.toUpperCase(), ""];
  if (o.name) out.push(o.name);
  if (o.phone) out.push(o.phone);
  out.push("");
  for (const s of o.sections) {
    const lines = s.fields
      .map((f) => {
        const raw = (f.value ?? "").toString().trim();
        if (!raw && f.empty === null) return "";
        const shown = raw || f.empty || "";
        return shown ? `  ${f.label}: ${shown.replace(/\n/g, " ")}` : "";
      })
      .filter(Boolean);
    if (!lines.length) continue;
    out.push(s.title.toUpperCase(), ...lines, "");
  }
  return out.join("\n");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * Turn a submission into the finished email.
 *
 * The section order is the point: it reads in the order Jay would ask the
 * questions himself — who and how to reach them, what the car is doing, where
 * it is and how soon, then anything else. Ids become the words the customer
 * actually saw, in the order the form listed them (labelsFor preserves the
 * option order, not the click order), so nothing arrives as "nostart".
 */
export function buildLeadEmail(lead: Lead): {
  subject: string;
  html: string;
  text: string;
  replyTo?: { email: string; name?: string };
} {
  const phone = prettyPhone(lead.phone);
  const email = (lead.email || "").trim();
  const issueLabels = labelsFor(QUOTE_ISSUES, lead.issues || []);
  const where = lead.where ? labelFor(QUOTE_WHERE, lead.where) : "";
  const urgency = lead.urgency ? labelFor(QUOTE_URGENCY, lead.urgency) : "";
  const city = (lead.city || "").trim();

  const submitted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const sections: LeadSection[] = [
    {
      title: "How to reach them",
      fields: [
        { label: "Name", value: lead.name },
        { label: "Phone", value: phone, tel: true },
        { label: "Email", value: email, empty: "Not provided", mailto: true },
      ],
    },
    {
      title: "What the car is doing",
      fields: [
        {
          label: "Symptoms",
          value: issueLabels.join("\n"),
          empty: "Nothing selected",
        },
        { label: "Vehicle", value: lead.vehicle, empty: "Not provided" },
      ],
    },
    {
      title: "Where and when",
      fields: [
        { label: "Car is", value: where, empty: "Not selected" },
        { label: "Town", value: city, empty: "Not provided" },
        { label: "Needs him", value: urgency, empty: "Not selected" },
      ],
    },
    {
      title: "Notes",
      fields: [
        { label: "They added", value: lead.notes, empty: "Nothing added" },
      ],
    },
    { title: "Lead details", fields: [{ label: "Submitted", value: submitted }] },
  ];

  // The subject and the inbox preview carry the useful bits, so the list view
  // alone tells Jay whether this is a no-start now or a brake job next week.
  const gist = issueLabels.slice(0, 2).join(", ") || "Quote request";
  const rendered: Rendered = {
    kicker: "New quote request",
    name: lead.name,
    phone,
    sections,
    preheader: `${urgency ? `${urgency} · ` : ""}${gist}${city ? ` · ${city}` : ""} · ${phone}`,
  };

  return {
    subject: `New quote request — ${lead.name}${city ? `, ${city}` : ""} (${gist})`,
    html: leadHtml(rendered),
    text: leadText(rendered),
    ...(EMAIL_RE.test(email) ? { replyTo: { email, name: lead.name } } : {}),
  };
}

/** Send one lead notification. No-ops cleanly if the key/recipient are unset. */
export async function sendLead(lead: Lead): Promise<{
  ok: boolean;
  skipped?: boolean;
  status?: number;
  error?: string;
  /* Brevo's id for the accepted message. Worth logging: it is the only thing
     that separates "we sent it and the inbox ate it" from "we never actually
     sent it", and those look identical from the website side. */
  messageId?: string;
}> {
  const key = process.env.BREVO_API_KEY;
  if (!key || !TO_EMAIL) {
    console.warn(
      "[lead] BREVO_API_KEY or LEAD_TO_EMAIL missing — skipping send.",
    );
    return { ok: false, skipped: true };
  }
  const built = buildLeadEmail(lead);
  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": key,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: FROM_EMAIL, name: FROM_NAME },
        to: TO_EMAIL.split(",")
          .map((e) => e.trim())
          .filter(Boolean)
          .map((email) => ({ email })),
        ...(built.replyTo ? { replyTo: built.replyTo } : {}),
        subject: built.subject,
        htmlContent: built.html,
        textContent: built.text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead] Brevo send failed:", res.status, detail);
      return { ok: false, status: res.status, error: detail.slice(0, 300) };
    }
    const json = (await res.json().catch(() => ({}))) as { messageId?: string };
    return { ok: true, messageId: json.messageId };
  } catch (err) {
    console.error("[lead] send error:", err);
    return { ok: false, error: String(err) };
  }
}
