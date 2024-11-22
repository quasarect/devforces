import { TriangleAlert } from "lucide-react";
import React from "react";

export default function RecentAlerts() {
  return (
    <div className="">
      <div className="text-2xl mb-4">Suspicious Contract Addresses</div>
      <div className="rounded-xl w-full flex-col gap-3 justify-between flex">
        <div className="shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border bg-card flex gap-4 items-center w-full p-4 rounded-xl">
          <TriangleAlert className="text-red-500" />
          <div className="flex flex-col w-full flex-1 text-slate-200">
            <p>High Risk Activity Detected</p>
            <p className="text-xs">Contract 0x742d...4e</p>
          </div>
        </div>
        <div className="shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border bg-card flex gap-4 items-center w-full p-4 rounded-xl">
          <TriangleAlert className="text-orange-500" />
          <div className="flex flex-col w-full flex-1 text-slate-200">
            <p>Medium Risk Activity Detected</p>
            <p className="text-xs">Contract 0x742d...4e</p>
          </div>
        </div>
        <div className="shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border bg-card flex gap-4 items-center w-full p-4 rounded-xl">
          <TriangleAlert className="text-orange-500" />
          <div className="flex flex-col w-full flex-1 text-slate-200">
            <p>Medium Risk Activity Detected</p>
            <p className="text-xs">Contract 0x742d...4e</p>
          </div>
        </div>
        <div className="shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border bg-card flex gap-4 items-center w-full p-4 rounded-xl">
          <TriangleAlert className="text-red-500" />
          <div className="flex flex-col w-full flex-1 text-slate-200">
            <p>High Risk Activity Detected</p>
            <p className="text-xs">Contract 0x742d...4e</p>
          </div>
        </div>
        <div className="shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] border bg-card flex gap-4 items-center w-full p-4 rounded-xl">
          <TriangleAlert className="text-red-500" />
          <div className="flex flex-col w-full flex-1 text-slate-200">
            <p>High Risk Activity Detected</p>
            <p className="text-xs">Contract 0x742d...4e</p>
          </div>
        </div>
      </div>
    </div>
  );
}
