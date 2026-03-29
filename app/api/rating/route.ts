import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    score: 755,
    maxScore: 1000,
    tier: "BB+",
    hndlExposureTimeline: [
      { date: "2023", risk: 20 },
      { date: "2025", risk: 35 },
      { date: "2026", risk: 50 },
      { date: "2028", risk: 80 },
      { date: "2030 (Q-Day)", risk: 100 },
    ],
    components: [
      { name: "Network Security", score: 850 },
      { name: "Application Security", score: 710 },
      { name: "Cryptographic Posture", score: 420 },
      { name: "Patch Management", score: 920 },
    ]
  });
}
