import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  const url = new URL(req.url);
  const step = parseInt(url.searchParams.get("step") || "0");
  
  const stages = [
    { label: "Initializing Subsurface Probe", progress: 5, status: "processing" },
    { label: "DNS Resolution & Path Mapping", progress: 20, status: "processing" },
    { label: "TLS Handshake Injection", progress: 35, status: "processing" },
    { label: "Certificate Decoupling", progress: 50, status: "processing" },
    { label: "Post-Quantum (PQC) Evaluation", progress: 75, status: "processing" },
    { label: "Generating Threat Entropy & CBOM", progress: 90, status: "processing" },
    { label: "Cyber Rating Finalization", progress: 100, status: "completed" },
  ];

  if (step >= stages.length) {
    return NextResponse.json({ scan_id: id, ...stages[stages.length - 1], complete: true });
  }

  // Artificial delay to simulate real processing over HTTP polling
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({ scan_id: id, ...stages[step], complete: false });
}
