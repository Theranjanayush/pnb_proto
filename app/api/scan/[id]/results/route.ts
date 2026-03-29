import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  // Returns the final scan vulnerability snapshot
  return NextResponse.json({
    scan_id: resolvedParams.id,
    identifiedAssets: 12,
    criticalVulnerabilities: 3,
    overallScore: 785,
    pqcCompliant: false,
    findings: [
      { id: "VULN-01", type: "Legacy Cipher Detected", severity: "Critical", asset: "login.dfs.gov.in", detail: "RSA-2048 encryption is vulnerable to Shor's algorithm." },
      { id: "VULN-02", type: "Expiring Identity Key", severity: "High", asset: "auth.pnb.in", detail: "TLS Certificate expires in 14 days." },
      { id: "VULN-03", type: "HNDL Risk", severity: "Medium", asset: "database.internal", detail: "Hack Now, Decrypt Later risk high on port 5432 intercept." }
    ]
  });
}
