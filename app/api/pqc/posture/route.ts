import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    breakdown: {
      elite: 120,
      standard: 450,
      legacy: 600,
      critical: 70,
    },
    recommendations: [
      { trigger: "RSA-2048 keys identified on 600 assets.", action: "Migrate to ML-KEM-768 or hybrid ECDSA/Dilithium.", impact: "High" },
      { trigger: "Legacy TLS 1.0 protocols active on core endpoints.", action: "Enforce TLS 1.3 minimum floor across ingress gateways.", impact: "Critical" },
      { trigger: "HNDL (Hack Now Decrypt Later) Exposure identified.", action: "Rotate session keys hourly to mitigate payload hoarding.", impact: "Medium" }
    ],
    assets: [
      { id: "1", name: "auth.pnb.in", tier: "Critical", cipher: "RSA-1024", quantumClockSeconds: 3888000 }, // ~45 days
      { id: "2", name: "vpn.dfs.internal", tier: "Legacy", cipher: "RSA-2048", quantumClockSeconds: 63072000 }, // ~2 years
      { id: "3", name: "api.pnb.in", tier: "Elite", cipher: "ML-KEM-1024", quantumClockSeconds: 864000000 }, // safe
      { id: "4", name: "db-replica", tier: "Standard", cipher: "AES-256", quantumClockSeconds: 157680000 }, // ~5 years
    ]
  });
}
