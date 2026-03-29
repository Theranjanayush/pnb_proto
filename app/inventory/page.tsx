"use client";

import { useEffect, useState } from "react";
import { Database, Download, Search, Filter } from "lucide-react";
import { Skeleton } from "../components/Skeleton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AssetInventoryPage() {
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, []);

  const exportPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    doc.text(`Asset Inventory Report`, 14, 15);
    
    autoTable(doc, {
      startY: 25,
      head: [['Asset', 'Type', 'IP Address', 'Risk Tier', 'PQC Ready', 'Cert Valid (Days)']],
      body: data.assets.map((r: any) => [r.name, r.type, r.ip, r.riskTier, r.pqcReady ? 'Yes' : 'No', r.certValidDays]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    doc.save(`Asset_Inventory.pdf`);
  };

  if (!data) return (
    <div className="w-full max-w-[90rem] mx-auto flex flex-col gap-6 animate-in fade-in p-10">
      <Skeleton className="h-40 rounded-[2.5rem] mb-4" />
      <Skeleton className="h-[600px] rounded-[2rem]" />
    </div>
  );

  const filteredAssets = filter === "All" 
    ? data.assets 
    : data.assets.filter((a: any) => a.riskTier === filter || (filter === "PQC Ready" && a.pqcReady));

  return (
    <div className="w-full max-w-[90rem] mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Header Panel */}
      <div className="bg-card-background/60 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden flex justify-between items-center flex-wrap gap-6">
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Asset Inventory
            </h1>
            <p className="font-semibold text-card-foreground/70 mt-1">
              Comprehensive list of all discovered and registered digital assets.
            </p>
          </div>
        </div>

        <button 
          onClick={exportPDF}
          className="relative z-10 flex items-center gap-2 px-6 py-3 font-bold bg-white/50 dark:bg-black/20 border-2 border-primary/30 hover:border-primary hover:bg-white dark:hover:bg-black/50 transition-colors rounded-xl shadow-sm"
        >
          <Download className="w-5 h-5 text-primary" />
          Export to PDF
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-card-background/60 backdrop-blur-3xl border border-white/20 shadow-xl rounded-[2rem] overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-black/5 dark:bg-white/5 p-4 flex justify-between items-center border-b border-input-border/50 flex-wrap gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-card-foreground/40" />
            <input 
              placeholder="Search by IP or name..."
              className="w-full bg-white/40 dark:bg-black/40 border-[2px] border-input-border/60 rounded-xl py-2.5 pl-9 pr-4 outline-none focus:border-blue-500 font-semibold text-sm transition-colors shadow-inner"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide flex-nowrap">
            <Filter className="w-4 h-4 text-card-foreground/50 mr-2 shrink-0" />
            {["All", "Critical", "High", "Medium", "PQC Ready"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
                  filter === f 
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white/50 dark:bg-black/20 text-card-foreground/70 hover:bg-white dark:hover:bg-black/40 border border-input-border/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Data Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5">
                <th className="p-5 text-sm tracking-wide font-black border-b border-input-border/50">Asset Name</th>
                <th className="p-5 text-sm tracking-wide font-black border-b border-input-border/50">Type & IP</th>
                <th className="p-5 text-sm tracking-wide font-black border-b border-input-border/50">Risk Tier</th>
                <th className="p-5 text-sm tracking-wide font-black border-b border-input-border/50">PQC Ready</th>
                <th className="p-5 text-sm tracking-wide font-black border-b border-input-border/50">Cert Expiry</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((record: any) => (
                <tr key={record.id} className="border-b border-input-border/30 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-5 font-bold font-mono text-sm">{record.name}</td>
                  <td className="p-5">
                    <div className="font-bold text-sm bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-md inline-flex border border-input-border/30">{record.type}</div>
                    <div className="text-xs text-card-foreground/50 font-mono mt-2 pl-1">{record.ip}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                      record.riskTier === 'Critical' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' :
                      record.riskTier === 'High' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20' :
                      record.riskTier === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' :
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {record.riskTier}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-sm text-card-foreground/70">
                    {record.pqcReady ? <span className="text-emerald-500">True</span> : <span className="text-red-500">False</span>}
                  </td>
                  <td className="p-5 font-bold text-sm">
                    {record.certValidDays} Days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
