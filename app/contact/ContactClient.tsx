"use client";

import { useSearchParams } from "next/navigation";
import QuoteForm from "@/components/QuoteForm";

/** Maps both Scan ids and service slugs onto the form's issue chips. */
const MAP: Record<string, string> = {
  nostart: "nostart",
  cel: "cel",
  brakes: "brakes",
  shake: "shake",
  ac: "ac",
  overheat: "overheat",
  "mobile-diagnostics": "cel",
  "suspension-and-shocks": "shake",
  "cv-axles-and-drivetrain": "shake",
  "electrical-and-batteries": "electrical",
  "ac-and-heating": "ac",
  "belts-timing-and-cooling": "overheat",
  "pre-purchase-inspections": "ppi",
};

export default function ContactClient() {
  const params = useSearchParams();
  const raw = params.get("issue") ?? "";
  return <QuoteForm prefillIssue={MAP[raw]} />;
}
