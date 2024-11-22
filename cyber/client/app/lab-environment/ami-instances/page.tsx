"use client";

import React, { useState } from "react";
import { Plus, Play, Loader2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import DemoCode from "@/components/AWS/DemoCode";

function Terminal({
  id,
  onDelete,
}: {
  id: number;
  onDelete: (id: number) => void;
}) {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [height, setHeight] = useState("100px");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCommand(e.target.value);
    // Automatically adjust height based on content
    // const lines = e.target.value.split("\n").length;
    // setHeight(`${Math.max(100, lines * 24)}px`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  const handleRun = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND+"/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: command }),
      });

      const data = await response.json();
      setResult(data.output || "No output");
    } catch (error) {
      setResult(`Error: ${(error as Error)?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-[#2d2d2d] border-b border-gray-700">
        <span className="text-sm text-gray-400">In [{id}]:</span>
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={!command.trim() || isLoading}
            className={`p-1 rounded hover:bg-gray-700 ${
              !command.trim() || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            title="Run"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 rounded hover:bg-gray-700"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <textarea
        value={command}
        onChange={handleInputChange}
        style={{ height: "100px" }}
        onKeyDown={handleKeyDown} // Attach the new handler here
        className="w-full bg-transparent p-4 focus:outline-none resize-none font-mono"
        placeholder="Type your command here..."
      />

      {result && (
        <div className="border-t border-gray-700">
          <div className="p-2 text-gray-400 text-sm">Out [{id}]:</div>
          <pre className="p-4 whitespace-pre-wrap font-mono text-sm">
            {result}
          </pre>
        </div>
      )}
    </Card>
  );
}

function Page() {
  const [terminals, setTerminals] = useState([{ id: 1 }]);

  const addTerminal = () => {
    const newId = Math.max(0, ...terminals.map((t) => t.id)) + 1;
    setTerminals([...terminals, { id: newId }]);
  };

  const deleteTerminal = (id: number) => {
    setTerminals(terminals.filter((terminal) => terminal.id !== id));
  };

  return (
    <div className="container mx-auto relative p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Code Terminal</h1>
      </div>

      <DemoCode />

      <div className="space-y-4">
        {terminals.map((terminal) => (
          <Terminal
            key={terminal.id}
            id={terminal.id}
            onDelete={deleteTerminal}
          />
        ))}
      </div>

      <div className="w-full mt-4 flex items-center justify-center">
        <div className="h-[1px] w-full absolute z-[-1] bg-border" />
        <button
          onClick={addTerminal}
          className="p-2 rounded-full bg-background border hover:bg-gray-100"
          title="Add new terminal"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {terminals.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No terminals open. Click the + button to add one.
        </div>
      )}
    </div>
  );
}

export default Page;
