import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { urls } = await req.json();
    // Generate a secure looking mock scan ID
    const scanId = "sc_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    return NextResponse.json({ scan_id: scanId, status: "pending", target: urls });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
}
