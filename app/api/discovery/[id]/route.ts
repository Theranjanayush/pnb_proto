import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const resolvedParams = await params;
  return NextResponse.json({
    scan_id: resolvedParams.id,
    nodes: [
      { id: "1", label: "DFS Root Network", type: "hub", x: 50, y: 50 },
      { id: "2", label: "auth.dfs.in", type: "node", x: 20, y: 30 },
      { id: "3", label: "vpn.internal", type: "node", x: 80, y: 30 },
      { id: "4", label: "database", type: "leaf", x: 30, y: 80 },
      { id: "5", label: "192.168.1.1", type: "leaf", x: 70, y: 80 },
      { id: "6", label: "api.pnb.in", type: "node", x: 20, y: 70 },
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "4" },
      { source: "3", target: "5" },
      { source: "1", target: "6" },
      { source: "6", target: "4" },
    ]
  });
}
