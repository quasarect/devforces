import { FilePenLine, Search, Shield } from "lucide-react";
import React from "react";

export default function RunTests() {
  return (
    <div className="w-full">
      <div className="text-2xl mb-4">Quick Action</div>
      <div className="flex md:flex-row flex-col gap-3">
        <div className="border border-gray-600 hover:bg-gray-600 max-md:bg-gray-600 cursor-pointer transition-all duration-300 flex gap-4 items-center w-full p-4 rounded-xl">
          <Shield className="text-blue-500" />
          <p>Run Security Scan</p>
        </div>
        <div className="border border-gray-600 hover:bg-gray-600 max-md:bg-gray-600 cursor-pointer transition-all duration-300 flex gap-4 items-center w-full p-4 rounded-xl">
          <Search className="text-blue-500" />
          <p>Trace Transactions</p>
        </div>
        <div className="border border-gray-600 hover:bg-gray-600 max-md:bg-gray-600 cursor-pointer transition-all duration-300 flex gap-4 items-center w-full p-4 rounded-xl">
          <FilePenLine className="text-blue-500" />
          <p>Audit Contract</p>
        </div>
      </div>
    </div>
  );
}
