import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stats: {
      totalAssets: 1240,
      highRiskAssets: 87,
      expiringCerts: 12,
      pqcScore: 785,
      activeScans: 3,
      criticalFindings: 24,
    },
    charts: {
      riskDistribution: [
        { name: "Critical", value: 24, fill: "#ef4444" },
        { name: "High", value: 87, fill: "#f97316" },
        { name: "Medium", value: 320, fill: "#eab308" },
        { name: "Low", value: 809, fill: "#22c55e" },
      ],
      cipherUsage: [
        { name: "AES-GCM", count: 450 },
        { name: "ChaCha20", count: 320 },
        { name: "RSA-2048", count: 210 },
        { name: "Kyber-768", count: 54 },
        { name: "Legacy (3DES)", count: 12 },
      ],
      expiryTimeline: [
        { month: "Jan", expiring: 2 },
        { month: "Feb", expiring: 5 },
        { month: "Mar", expiring: 12 },
        { month: "Apr", expiring: 40 },
        { month: "May", expiring: 15 },
        { month: "Jun", expiring: 8 },
      ]
    },
    activity: [
      { id: 1, action: "Scan Completed", target: "core-banking-api.pnb.in", time: "10 mins ago", status: "Critical" },
      { id: 2, action: "Scan Initiated", target: "vpn.internal.dfs.gov.in", time: "45 mins ago", status: "In Progress" },
      { id: 3, action: "CBOM Exported", target: "auth.pnb.in", time: "2 hours ago", status: "Success" },
      { id: 4, action: "Cert Renewed", target: "payment-gw.pnb.in", time: "5 hours ago", status: "Success" }
    ],
    geography: [
      { region: "Mumbai (ap-south-1)", count: 450, status: "Healthy" },
      { region: "Delhi (Data Center A)", count: 320, status: "Warning" },
      { region: "Frankfurt (eu-central-1)", count: 120, status: "Healthy" },
    ]
  });
}
