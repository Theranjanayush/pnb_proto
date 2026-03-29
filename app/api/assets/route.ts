import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    assets: [
      { id: "ast-01", name: "login.dfs.gov.in", type: "Domain", ip: "102.45.1.200", riskTier: "Critical", pqcReady: false, certValidDays: 14 },
      { id: "ast-02", name: "auth.pnb.in", type: "Domain", ip: "102.45.1.201", riskTier: "High", pqcReady: false, certValidDays: 30 },
      { id: "ast-03", name: "api-internal.dfs", type: "API", ip: "192.168.1.5", riskTier: "Low", pqcReady: true, certValidDays: 365 },
      { id: "ast-04", name: "db-main.internal", type: "Database", ip: "192.168.1.10", riskTier: "Medium", pqcReady: false, certValidDays: 120 },
      { id: "ast-05", name: "gateway.pnb.in", type: "Gateway", ip: "102.45.1.205", riskTier: "Low", pqcReady: true, certValidDays: 180 },
    ]
  });
}
