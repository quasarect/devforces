import { NotebookTabs, ScanLine, ShieldAlert, ShieldCheck } from "lucide-react";
import React from "react";

export default function Security() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-3">
      <div className="col-span-1 flex flex-col items-center justify-center p-4 text-slate-100 md:col-span-6 md:row-span-4 w-full rounded-xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 order-1 md:order-3">
        <div className="w-[300px] mx-auto text-ellipsis">
          0xd1962fb588bc2...909b0a2b45c73213d
        </div>
        <div className="text-slate-300">
          Balance : <span className="font-semibold">0.002 ETH</span>
        </div>
      </div>
      <div className="rounded-xl md:col-span-3 md:row-span-3 border w-full justify-between shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] bg-card flex p-8 order-3 md:order-1">
        <div className="flex flex-col justify-end gap-4">
          <NotebookTabs className="text-indigo-500" />
          <p className="text-xs">Contracts Audited</p>
        </div>
        <div className="h-full flex items-center text-4xl">156</div>
      </div>
      <div className="rounded-xl md:col-span-3 md:row-span-3 border w-full justify-between shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] bg-card flex p-8 order-4 md:order-2">
        <div className="flex flex-col justify-end gap-4">
          <ShieldAlert className="text-red-500" />
          <p className="text-xs">High Risk Contracts</p>
        </div>
        <div className="h-full flex items-center text-4xl">23</div>
      </div>

      <div className="rounded-xl md:col-span-3 md:row-span-3 border w-full justify-between shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] bg-card flex p-8 order-5 md:order-4">
        <div className="flex flex-col justify-end gap-4">
          <ScanLine className="text-orange-500" />
          <p className="text-xs">Suspicious Contracts</p>
        </div>
        <div className="h-full flex items-center text-4xl">89</div>
      </div>
      <div className="rounded-xl md:col-span-3 md:row-span-3 border w-full justify-between shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] bg-card flex p-8 order-6 md:order-5">
        <div className="flex flex-col justify-end gap-4">
          <ShieldCheck className="text-green-500" />
          <p className="text-xs">Verified Contracts</p>
        </div>
        <div className="h-full flex items-center text-4xl">45</div>
      </div>
      <div className="rounded-xl w-full md:col-span-6 md:row-span-2 border justify-between shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] bg-card flex p-8 order-2 md:order-6"></div>
    </div>
  );
}
