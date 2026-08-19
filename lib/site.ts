// ─────────────────────────────────────────────────────────────
//  ONE source of truth for every business fact on this site.
//  Change it here, it changes everywhere. Nothing is hardcoded.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Game Changer Automotive",
  legalName: "Game Changer Automotive Mobile Repair Service",
  owner: "Jay Metcalf",
  ownerShort: "Jay",
  ownerNickname: "Jay the Game Changer",
  tagline: "Your ride, my priority.",
  positioning: "Mobile Diagnostics & Repairs",

  phone: "(832) 528-0270",
  phoneHref: "tel:+18325280270",
  smsHref: "sms:+18325280270",
  phoneRaw: "+18325280270",

  domain: "gamechangerauto.shop",
  url: "https://gamechangerauto.shop",

  hours: "Open 24 hours",
  hoursLong: "24 hours a day, 7 days a week",

  // Verified from the Google Business Profile
  rating: 4.5,
  reviewCount: 8,
  reviewUrl: "https://g.page/r/Cdc0ZMfi9UXhEBM/review",
  gmbUrl: "https://g.page/r/Cdc0ZMfi9UXhEBM",

  // Jay's own credentials, from his own materials
  aseYears: 25,
  aseCertified: true,

  // Jason came on 2026-08 as a partner. Jay called him a "small partner",
  // so Jay stays the face of the business and Jason is introduced as the
  // second technician who also answers the phone and runs calls.
  // ⚠️ Jay said "certified technician" — NOT confirmed as ASE, so the site
  // never says ASE about Jason. Confirm before changing this.
  partner: "Jason Garcia",
  partnerFirst: "Jason",
  partnerRole: "certified technician",

  // Confirmed by Jay 2026-08-19: $125 diagnostic, waived outright when the
  // customer has the repair done. Every mention on the site reads from here.
  callOutFee: "$125",
  callOutLabel: "diagnostic",
  callOutNote: "waived when you have the repair done",

  // Hub — Google Business Profile coordinates
  geo: { lat: 30.1446161, lng: -95.5052515 },
  baseCity: "Conroe",
  baseRegion: "TX",
  regionName: "Texas",
  areaLabel: "Montgomery County & North Houston",

  social: {
    facebook: "https://www.facebook.com/search/top?q=game%20changer%20automotive",
  },
} as const;

/** Primary named towns — the ones Jay told us he serves. */
export const coreCities = [
  "Conroe",
  "Montgomery",
  "Spring",
  "Humble",
  "Porter",
  "Anderson",
] as const;

/** Everything inside the drive-time radius, for schema + real on-page copy. */
export const allCities = [
  "Conroe",
  "Montgomery",
  "Spring",
  "Humble",
  "Porter",
  "Anderson",
  "The Woodlands",
  "Willis",
  "New Caney",
  "Magnolia",
  "Tomball",
  "Kingwood",
  "Splendora",
  "Panorama Village",
  "Oak Ridge North",
  "Shenandoah",
  "Pinehurst",
  "Atascocita",
  "Cut and Shoot",
  "Cleveland",
] as const;

export type Service = {
  slug: string;
  name: string;
  short: string;
  navName: string;
  blurb: string;
  image: string;
  imageAlt: string;
  symptoms: string[];
  includes: string[];
  body: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "mobile-diagnostics",
    name: "Mobile Diagnostics",
    navName: "Diagnostics",
    short: "Find the actual problem",
    blurb:
      "A scan tool tells you a code. Twenty-five years tells you what the code means. Jay comes to your driveway, pulls the data, tests the circuit and shows you the part that failed.",
    image: "/img/scan-tablet-a.jpg",
    imageAlt: "Hands holding a diagnostic scan tool plugged into a vehicle",
    symptoms: [
      "Check engine light on or flashing",
      "ABS, traction or airbag light",
      "Car runs rough, stalls or hesitates",
      "A shop quoted a repair and you want a second opinion",
    ],
    includes: [
      "Full code pull — engine, transmission, ABS, body",
      "Live data and freeze-frame review",
      "Circuit and component testing, not just code reading",
      "Photos of what was found, sent to your phone",
      "A written plan: what has to be fixed now, what can wait",
    ],
    body: [
      "Most of the money wasted on car repair gets wasted right here. A code like P0171 doesn't mean \"replace the sensor\" — it means the engine is running lean, and there are a dozen reasons that happens. Parts-cannon guessing is how a $90 problem turns into a $900 one.",
      "Jay does it the other way around. He pulls every module, reads live data while the fault is happening, and tests the actual circuit before anything gets replaced. Then he shows you the photo of what he found and tells you plainly what it will take.",
      "It happens in your driveway, at your office parking lot, or wherever the car gave up. You do not need to arrange a tow or lose a day off work.",
    ],
    faqs: [
      {
        q: "How much does a mobile diagnostic cost in Conroe?",
        a: "The diagnostic is $125, and it is waived entirely when you have the repair done. Call (832) 528-0270 and Jay or Jason will tell you what the repair itself runs before anyone starts.",
      },
      {
        q: "Can you diagnose a car that won't start at all?",
        a: "Yes. A no-start is one of the most common calls. Jay tests battery, starter, alternator, fuel and ignition on site — most no-starts are diagnosed and fixed in the same visit.",
      },
      {
        q: "Is a mobile diagnostic as good as taking it to a shop?",
        a: "It uses the same professional scan tools a shop uses. The difference is that Jay is standing next to your car while it does the thing it only does for you — which is usually where shop diagnostics fall down.",
      },
      {
        q: "Will you tell me if the repair isn't worth doing?",
        a: "Yes, and he does regularly. If a car isn't worth the repair, you'll hear that before you spend money on it.",
      },
    ],
    keywords: [
      "mobile diagnostics",
      "check engine light diagnosis",
      "obd2 scan",
      "car computer diagnostic",
      "engine light on",
      "mobile mechanic diagnostic",
    ],
  },
  {
    slug: "brakes",
    name: "Brakes",
    navName: "Brakes",
    short: "Pads, rotors, calipers, lines",
    blurb:
      "Grinding, squealing, a pedal that goes soft or a wheel that locks up. Brakes are the one repair nobody should put off — and one Jay can do in your driveway in an afternoon.",
    image: "/img/svc-brakes.jpg",
    imageAlt: "Close-up of a drilled brake rotor and wheel hub with the wheel removed",
    symptoms: [
      "Grinding, squealing or scraping when you stop",
      "Pedal feels soft, spongy or goes to the floor",
      "Steering wheel shakes when braking",
      "A wheel is locking up or the car pulls to one side",
      "Brake light or ABS light on the dash",
    ],
    includes: [
      "Front and rear pads and rotors",
      "Calipers, brackets, hardware and slide pins",
      "Brake hoses and hard lines",
      "Master cylinder and brake booster",
      "Full system bleed and road test",
    ],
    body: [
      "Brakes are the repair where mobile service makes the most sense. There is nothing about a pad-and-rotor job that needs a lift — it needs a jack, the right torque spec and somebody who has done it a few thousand times.",
      "Jay pulls the wheel, measures the rotor, shows you the pad thickness and tells you exactly where you stand. If you have life left, he'll say so. If you're metal-on-metal, you'll see the photo.",
      "One customer had a truck down for months with brakes that kept locking up. Several shops replaced parts and never found it. Jay found it. That's the kind of brake work this is.",
    ],
    faqs: [
      {
        q: "Can you replace brake pads and rotors at my house?",
        a: "Yes — that is one of the most common jobs Jay does. He brings the jack, stands, torque wrench and parts to your driveway and road-tests the car before he leaves.",
      },
      {
        q: "How long does a brake job take?",
        a: "Pads and rotors on one axle usually run about an hour to an hour and a half in your driveway. All four corners takes most of an afternoon.",
      },
      {
        q: "My brakes are grinding — how bad is that?",
        a: "Grinding usually means the friction material is gone and you're on the backing plate, which chews up the rotor and can cost you the caliper too. It's worth calling the same day at (832) 528-0270.",
      },
      {
        q: "Do you do brakes on trucks and vans?",
        a: "Yes — light trucks, heavy half-tons, vans and work trucks included.",
      },
    ],
    keywords: [
      "brake repair",
      "brake pads and rotors",
      "brakes grinding",
      "squeaky brakes",
      "brake job",
      "mobile brake replacement",
      "caliper replacement",
    ],
  },
  {
    slug: "suspension-and-shocks",
    name: "Suspension & Shocks",
    navName: "Suspension",
    short: "Rides like it used to",
    blurb:
      "Clunks over bumps, a floaty ride, a car that leans in corners or eats tires on one edge. Shocks, struts, control arms, ball joints and bushings.",
    image: "/img/svc-suspension.jpg",
    imageAlt: "Vehicle suspension components seen from underneath during a repair",
    symptoms: [
      "Clunking or knocking over bumps",
      "Car bounces, floats or nose-dives when you stop",
      "Leans hard in corners or feels loose on the highway",
      "Tires wearing on one edge",
      "Steering wanders or feels vague",
    ],
    includes: [
      "Shocks and complete strut assemblies",
      "Control arms, ball joints and bushings",
      "Sway bar links and bushings",
      "Tie rods and steering components",
      "Coil springs and mounts",
    ],
    body: [
      "Suspension is the system people ignore the longest and feel the most. Worn shocks don't just ride badly — they change how long the car takes to stop and how much grip it has in the rain, which matters on wet Texas highway.",
      "Most of it is bolt-on work that Jay can do on the ground with proper stands. He'll show you which joint has play and which one is fine, so you're not replacing a whole front end when one link is bad.",
    ],
    faqs: [
      {
        q: "What does clunking over bumps usually mean?",
        a: "Most often a sway bar link, a strut mount or a worn ball joint. They sound alike but cost very differently, which is why it's worth having someone put hands on it before ordering parts.",
      },
      {
        q: "Can you replace struts in a driveway?",
        a: "Yes. Complete quick-strut assemblies are straightforward driveway work. If a spring has to be compressed, Jay brings the tooling for it.",
      },
      {
        q: "How do I know if my shocks are worn out?",
        a: "Push down hard on one corner of the car and let go. If it bounces more than once, that shock is done. Uneven cupped tire wear is the other giveaway.",
      },
    ],
    keywords: [
      "suspension repair",
      "shocks and struts",
      "clunking noise over bumps",
      "ball joint replacement",
      "control arm",
      "rough ride",
      "car bouncing",
    ],
  },
  {
    slug: "cv-axles-and-drivetrain",
    name: "CV Axles & Drivetrain",
    navName: "CV Axles",
    short: "Clicking, vibration, torn boots",
    blurb:
      "That rhythmic click when you turn is a CV joint telling you it's out of grease. Caught early it's an axle. Ignored, it's a tow.",
    image: "/img/svc-wheelwell.jpg",
    imageAlt: "Mechanic working inside a wheel well on drivetrain components",
    symptoms: [
      "Clicking or popping when turning",
      "Vibration that gets worse with speed",
      "Grease sprayed inside the wheel well",
      "Torn or split rubber boot on the axle",
      "Clunk when shifting into drive or reverse",
    ],
    includes: [
      "Complete CV axle shafts, front and rear",
      "CV boots and joint service",
      "Wheel bearings and hub assemblies",
      "Driveshaft U-joints and carrier bearings",
      "Differential and transfer case leaks",
    ],
    body: [
      "A CV axle gives you plenty of warning. First the boot splits, then the grease slings out, then the joint dries and starts clicking on turns. There is a wide window in there to fix it cheaply.",
      "Jay replaces complete axle shafts on site — no lift required — and checks the other side while he's under there, because they usually wear at the same rate.",
    ],
    faqs: [
      {
        q: "Is it safe to drive with a clicking CV axle?",
        a: "For a little while, and then very suddenly not. When a CV joint fails completely the axle can separate and you lose drive to that wheel. Don't take it on a road trip.",
      },
      {
        q: "Can a CV axle be replaced at my house?",
        a: "Yes. It's a wheel-off, ground-level job and one Jay does regularly in driveways around Conroe and Spring.",
      },
      {
        q: "What causes a vibration that gets worse the faster I go?",
        a: "Commonly a bent or worn axle, a failing wheel bearing, or a tire issue. All three are testable on site before anything is replaced.",
      },
    ],
    keywords: [
      "cv axle replacement",
      "clicking when turning",
      "cv joint",
      "wheel bearing noise",
      "driveshaft",
      "humming noise while driving",
    ],
  },
  {
    slug: "electrical-and-batteries",
    name: "Electrical & Batteries",
    navName: "Electrical",
    short: "Won't start, won't charge, won't behave",
    blurb:
      "Dead every morning, dim lights, a car that cranks but won't catch, or a gremlin nobody can find. Electrical is where diagnostics earns its keep.",
    image: "/img/svc-electrical.jpg",
    imageAlt: "Jumper cables clamped to a battery under an open vehicle hood outdoors",
    symptoms: [
      "Dead battery every morning or after sitting",
      "Clicks but won't crank",
      "Battery light or charging warning",
      "Lights dim at idle, brighten when you rev",
      "Power windows, locks or accessories acting up",
    ],
    includes: [
      "Batteries, terminals and cables",
      "Alternators and charging system testing",
      "Starters and starter circuits",
      "Parasitic draw testing — finding what's killing the battery overnight",
      "Wiring repair, grounds, fuses and relays",
    ],
    body: [
      "Half the batteries sold in this country get sold to people whose battery was fine. A car that's dead every morning usually has a parasitic draw — something staying awake after you lock it — and a new battery just gives the drain a fresh one to kill.",
      "Jay tests the charging system and measures the draw with a meter before selling you anything. Sometimes it's a battery. Sometimes it's a $6 relay that's been costing somebody $180 a year.",
    ],
    faqs: [
      {
        q: "Can you replace a battery or alternator at my house?",
        a: "Yes, both. Jay carries the tools and can source the part, and he'll test the whole charging system first so you're not replacing a good alternator.",
      },
      {
        q: "Why does my car keep dying overnight?",
        a: "Usually a parasitic draw — a module or accessory that isn't going to sleep. It takes a meter and some patience to isolate, and it's one of the most satisfying things to actually find.",
      },
      {
        q: "My car clicks but won't start. Battery or starter?",
        a: "Could be either, plus cables or grounds. A five-minute voltage-drop test on site tells you which, and it's a lot cheaper than replacing both.",
      },
    ],
    keywords: [
      "car battery replacement",
      "alternator replacement",
      "car won't start",
      "car keeps dying",
      "parasitic draw",
      "starter replacement",
      "electrical problem car",
    ],
  },
  {
    slug: "ac-and-heating",
    name: "A/C & Heating",
    navName: "A/C",
    short: "Cold air, Texas summer",
    blurb:
      "In this part of Texas, air conditioning is not a comfort item. Warm air, weak air, or a system that quit — diagnosed and charged at your place.",
    image: "/img/scan-engine-tool.jpg",
    imageAlt: "Diagnostic equipment set up on an engine bay during service",
    symptoms: [
      "Blows warm or barely cool",
      "Cold at highway speed, warm at a stoplight",
      "A/C clutch not engaging",
      "Musty smell or weak airflow from the vents",
      "Heater blowing cold in winter",
    ],
    includes: [
      "System performance test with manifold gauges",
      "Leak detection and recharge",
      "Compressors, clutches and condensers",
      "Blend doors, blower motors and resistors",
      "Heater cores and cooling system checks",
    ],
    body: [
      "An A/C system that blows warm is almost never \"just low on freon.\" Refrigerant is a closed loop — if it's low, it leaked, and topping it up without finding the leak means paying twice.",
      "Jay puts gauges on it, reads high and low side pressures, finds where it's going and tells you what the real fix costs. Sometimes it's a $40 o-ring. Sometimes it's a compressor. You'll know which before he touches it.",
    ],
    faqs: [
      {
        q: "How much is a mobile A/C recharge?",
        a: "It depends on what's leaking and how much refrigerant the system holds. The $125 diagnostic gets gauges on it and a straight answer — and it is waived when you have the repair done.",
      },
      {
        q: "Why is my A/C cold on the highway but warm at stoplights?",
        a: "Classic sign of a cooling fan problem or low charge. Both are testable on site in a few minutes.",
      },
      {
        q: "Can A/C really be fixed in a driveway?",
        a: "Yes — recovery, evacuation and recharge are all done with portable equipment. Compressor replacement is driveway work on most vehicles too.",
      },
    ],
    keywords: [
      "car ac repair",
      "ac blowing warm",
      "ac recharge",
      "air conditioning car",
      "ac compressor",
      "heater not working car",
    ],
  },
  {
    slug: "belts-timing-and-cooling",
    name: "Belts, Timing & Cooling",
    navName: "Timing & Cooling",
    short: "The jobs that save engines",
    blurb:
      "Timing belts, water pumps, thermostats, hoses and overheating. The repairs that are cheap on schedule and catastrophic on failure.",
    image: "/img/real-timing-belt.jpg",
    imageAlt:
      "Timing belt, tensioner and cam pulleys exposed on a Honda engine, lit by a work light — one of Jay's own jobs",
    symptoms: [
      "Temperature gauge climbing or in the red",
      "Coolant on the driveway or a sweet smell",
      "Squealing belt or whine on startup",
      "Heater blowing cold with the engine hot",
      "Approaching the timing belt interval on the sticker",
    ],
    includes: [
      "Timing belts, tensioners, idlers and water pumps",
      "Serpentine belts and pulleys",
      "Thermostats, radiators and hoses",
      "Coolant leaks — pressure tested, not guessed",
      "Head gasket and overheating diagnosis",
    ],
    body: [
      "On an interference engine, a timing belt that snaps bends valves and turns a scheduled maintenance item into an engine. It is the single best money a high-mileage car owner can spend, and it is a job Jay does properly — belt, tensioner, idlers and water pump together, because doing them separately means paying the labor twice.",
      "Overheating gets found the same way. Pressure test the system, look for where it's actually going, and only then quote the repair. The photos on this page are from Jay's own jobs — that's a real timing service and a real coolant leak he found and circled for the customer.",
    ],
    faqs: [
      {
        q: "When should a timing belt be replaced?",
        a: "Most manufacturers call for somewhere between 60,000 and 105,000 miles. Check the sticker or the manual — and if nobody can tell you when it was last done, that's your answer.",
      },
      {
        q: "My car is overheating. Can I keep driving it?",
        a: "No. Overheating warps heads and blows gaskets fast. Pull over, let it cool and call (832) 528-0270 — Jay comes to you, which matters a lot when the alternative is driving it further.",
      },
      {
        q: "Do you replace the water pump with the timing belt?",
        a: "Yes, always where the pump is driven by the belt. The pump is right there once the belt is off — doing it later means paying that labor a second time.",
      },
    ],
    keywords: [
      "timing belt replacement",
      "water pump replacement",
      "car overheating",
      "coolant leak",
      "radiator repair",
      "serpentine belt squealing",
      "thermostat replacement",
    ],
  },
  {
    slug: "pre-purchase-inspections",
    name: "Pre-Purchase Inspections",
    navName: "Pre-Purchase",
    short: "Inspect before you buy",
    blurb:
      "Before you hand over cash for a used car, have somebody with 25 years and a scan tool look at it. Jay meets you at the seller.",
    image: "/img/scan-obd-plug.jpg",
    imageAlt: "OBD-II diagnostic tool plugged into a vehicle's data port under the dash",
    symptoms: [
      "Buying private-party and you can't tell what you're looking at",
      "The seller says \"it just needs a little work\"",
      "Dealer lot car with a clean history report",
      "Buying for a teenager or a long commute",
    ],
    includes: [
      "Full computer scan — including codes that were recently cleared",
      "Fluid condition, leaks and evidence of past repair",
      "Brakes, tires, suspension and steering wear",
      "Frame, rust and accident-repair check",
      "Road test, and a straight answer on what it will need",
    ],
    body: [
      "This is the cheapest hour anyone ever spends on a car. A pre-purchase inspection either saves you from a very expensive mistake, or it hands you a written list of what the car needs — which is leverage on the price.",
      "Jay's own line on this is \"Drive smart: inspect before you buy.\" He meets you wherever the car is, scans it, drives it, and tells you what he'd tell a family member.",
    ],
    faqs: [
      {
        q: "How much is a pre-purchase inspection near Conroe?",
        a: "Call (832) 528-0270 and Jay will quote it for the vehicle and location. It is a small fraction of what a bad used car costs.",
      },
      {
        q: "Can you inspect a car at a dealership?",
        a: "Yes. Most dealers will allow an independent inspection on the lot. If one refuses, that itself is useful information.",
      },
      {
        q: "How long does an inspection take?",
        a: "Usually around an hour on site, including a scan and a road test.",
      },
    ],
    keywords: [
      "pre purchase inspection",
      "used car inspection",
      "buying a used car checklist",
      "mobile car inspection",
      "ppi mechanic",
    ],
  },
];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Real Google reviews. Verbatim, trimmed only with ellipsis. Never invent these. */
export const reviews = [
  {
    author: "Jeremy Ramirez",
    quote:
      "Mr. Metcalf went out of his way to ensure I made my trip coming up safe and sound. He inspected every part of my vehicle and even taught me lessons regarding my vehicle and how to keep it running strong. I highly recommend.",
    tag: "Pre-trip inspection",
  },
  {
    author: "David Bailey",
    quote:
      "Truck was down several months due to brake issues, had it at several shops with no luck, the brakes were locking up, changed everything. Jay got on it and busted his butt, and figured it out. I'm completely grateful for his knowledge and hard work.",
    tag: "The one nobody else could fix",
  },
  {
    author: "Andrew Balla",
    quote:
      "Not only a great auto mechanic, but really cares about his customers and their needs. He tells you honestly what you need for your car, doesn't try to oversell you, and works with you on what the most important issues are, instead of trying to tack on multiple unnecessary repairs.",
    tag: "Google Local Guide",
  },
] as const;
