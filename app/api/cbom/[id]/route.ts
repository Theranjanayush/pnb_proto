import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  return NextResponse.json({
    scan_id: resolvedParams.id,
    generatedAt: new Date().toISOString(),
    cbomRecords: [
      { id: "ast-01", asset: "login.dfs.gov.in", keyLength: "RSA-2048", cipherSuite: "TLS_RSA_WITH_AES_128_CBC_SHA", tlsVersion: "TLS 1.2", ca: "DigiCert", pqcStatus: "Non-Compliant", riskScore: 88, statusKey: "Critical" },
      { id: "ast-02", asset: "api.pnb.in", keyLength: "Kyber-768", cipherSuite: "TLS_AES_256_GCM_SHA384", tlsVersion: "TLS 1.3", ca: "Let's Encrypt", pqcStatus: "Quantum Resistant", riskScore: 12, statusKey: "Healthy" },
      { id: "ast-03", asset: "db-replica.internal", keyLength: "ECDSA (P-256)", cipherSuite: "TLS_AES_128_GCM_SHA256", tlsVersion: "TLS 1.2", ca: "Internal CA", pqcStatus: "Legacy", riskScore: 65, statusKey: "Warning" },
      { id: "ast-04", asset: "mail.pnb.in", keyLength: "RSA-4096", cipherSuite: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384", tlsVersion: "TLS 1.3", ca: "GlobalSign", pqcStatus: "Transitional", riskScore: 40, statusKey: "Healthy" },
    ]
  });
}
