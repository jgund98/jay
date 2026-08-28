import { buildLeadEmail } from "@/lib/lead-email";

/*
 * Dev-only preview of the lead email, so the template can be checked in a
 * browser without sending anything to the client's real inbox.
 *
 *   npm start  ->  http://localhost:3441/api/quote/preview
 *   ?empty=1   ->  the sparse version, where the optional fields were skipped
 *
 * 404s in production on purpose: it renders sample customer data and there is
 * no reason for it to exist on the live site.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  if (process.env.NODE_ENV === "production" && !process.env.LEAD_PREVIEW) {
    return new Response("Not found", { status: 404 });
  }

  const sparse = new URL(req.url).searchParams.has("empty");

  const { html } = buildLeadEmail(
    sparse
      ? {
          name: "Dana",
          phone: "(281) 555-0192",
          email: "",
          issues: ["brakes"],
          vehicle: "",
          where: "home",
          city: "Spring",
          urgency: "week",
          notes: "",
        }
      : {
          name: "Marcus Webb",
          phone: "(936) 555-0147",
          email: "marcus.webb@example.com",
          issues: ["nostart", "cel", "overheat"],
          vehicle: "2016 Ford F-250 6.7 Powerstroke",
          where: "roadside",
          city: "Conroe",
          urgency: "now",
          notes:
            "Started blowing white smoke and lost power pulling a trailer up 45. Shut it off on the shoulder past the Conroe exit.",
        },
  );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
