"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bug, Shield, Code2 } from "lucide-react";

// Dynamically import the Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const vulnerableCodeExamples = [
  {
    id: "reentrancy",
    title: "Reentrancy Vulnerability",
    description:
      "A classic vulnerability that allows multiple withdrawals before balance update",
    code: `contract VulnerableBank {
    mapping(address => uint) public balances;

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        
        // Vulnerable: State change after external call
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        
        balances[msg.sender] -= _amount;
    }
}`,
    risk: "Critical",
    impact: "Potential drain of all contract funds",
    fix: `contract SecureBank {
    mapping(address => uint) public balances;

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        
        balances[msg.sender] -= _amount;
        
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }
}`,
  },
  {
    id: "overflow",
    title: "Integer Overflow",
    description: "Arithmetic operations without SafeMath can lead to overflows",
    code: `contract VulnerableToken {
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount) public {
        // Vulnerable: No overflow check
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}`,
    risk: "High",
    impact: "Manipulation of token balances",
    fix: `contract SecureToken {
    using SafeMath for uint256;
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount) public {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[to] = balances[to].add(amount);
    }
}`,
  },
  {
    id: "access",
    title: "Access Control",
    description: "Missing or improper access controls on critical functions",
    code: `contract VulnerableContract {
    address public owner;
    
    function changeOwner(address newOwner) public {
        // Vulnerable: No access control
        owner = newOwner;
    }
}`,
    risk: "High",
    impact: "Unauthorized control of contract",
    fix: `contract SecureContract {
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}`,
  },
];

function Page() {
  const [language, setLanguage] = useState("solidity");
  const [editorContent, setEditorContent] = useState(
    language === "solidity"
      ? "// Start typing your Solidity code here"
      : "// Start typing your Move code here"
  );
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getHeroContent = (lang: string) => {
    if (lang === "solidity") {
      return {
        title: "Welcome to the Solidity Smart Contract Analyzer",
        description:
          "Analyze vulnerabilities in your Solidity smart contracts using our advanced Ethereum-focused analysis tools.",
      };
    }
    return {
      title: "Welcome to the Move Smart Contract Analyzer",
      description:
        "Analyze vulnerabilities in your Move smart contracts using our advanced Aptos-focused analysis tools.",
    };
  };

  const handleLanguageChange = (event: any) => {
    const value = event.target.value;
    setLanguage(value);
    setEditorContent(
      value === "solidity"
        ? "// Start typing your Solidity code here"
        : "// Start typing your Move code here"
    );
  };
  const [selectedExample, setSelectedExample] = useState(null);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const prompt = `
        Language: ${language.toUpperCase()}
        Code: 
        ${editorContent}
        Analyze the given ${language} code and find vulnerabilities. Display vulnerabilities in HTML and inline CSS. I need HTML code only, if possible add small part of code having vulnerabilities, no other text, and make the UI aesthetically pleasing with a black background.
      `;
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const cleanedOutput = data.output
        .replace(/```html/g, "")
        .replace(/```/g, "");

      setResponse(cleanedOutput);
    } catch (error) {
      console.error("Error sending code:", error);
      setResponse("Error: Unable to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  // Get hero content based on selected language
  const heroContent = getHeroContent(language);

  const loadExample = (example) => {
    setSelectedExample(example);
    setEditorContent(example.code);
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 transition-all duration-300 ease-in-out md:mr-0">
        {/* Hero Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4 transition-all duration-300">
            {heroContent.title}
          </h1>
          <p className="text-lg mb-4 transition-all duration-300">
            {heroContent.description}
          </p>
        </section>

        {/* Vulnerable Code Examples Section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-6 w-6 text-red-500" />
                Common Vulnerabilities
              </CardTitle>
              <CardDescription>
                Study these examples to understand common smart contract
                vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="reentrancy" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {vulnerableCodeExamples.map((example) => (
                    <TabsTrigger key={example.id} value={example.id}>
                      {example.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {vulnerableCodeExamples.map((example) => (
                  <TabsContent key={example.id} value={example.id}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{example.title}</CardTitle>
                          <Badge variant="destructive">{example.risk}</Badge>
                        </div>
                        <CardDescription>{example.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Impact</AlertTitle>
                          <AlertDescription>{example.impact}</AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="p-4">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                              <Bug className="h-5 w-5 text-red-500" />
                              Vulnerable Code
                            </h3>
                            <pre className="bg-background border p-4 rounded overflow-x-auto">
                              <code className="text-sm text-slate-50">
                                {example.code}
                              </code>
                            </pre>
                          </Card>

                          <Card className="p-4">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                              <Shield className="h-5 w-5 text-green-500" />
                              Secure Code
                            </h3>
                            <pre className="bg-background border p-4 rounded overflow-x-auto">
                              <code className="text-sm text-slate-50">
                                {example.fix}
                              </code>
                            </pre>
                          </Card>
                        </div>

                        <button
                          onClick={() => loadExample(example)}
                          className="w-full p-2 bg-slate-100 hover:bg-slate-50 text-black rounded flex items-center justify-center gap-2"
                        >
                          <Code2 className="h-4 w-4" />
                          Load in Editor
                        </button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Code Editor Section with Language Selector */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Code Editor</h2>

          {/* Language Selector */}
          <div className="mb-2">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-40 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="solidity">Solidity</option>
              <option value="move">Move (Aptos)</option>
            </select>
          </div>

          {/* Editor Container */}
          <div
            className="editor-container overflow-hidden border border-gray-700 rounded-md"
            style={{
              height: "400px",
            }}
          >
            <MonacoEditor
              height="400px"
              defaultLanguage={language}
              theme="vs-dark"
              value={editorContent}
              onChange={(value) => setEditorContent(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>
          <button
            onClick={handleSendCode}
            className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </section>

        {/* Response Section */}
        {response && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
            <div className="p-4 border border-gray-700 rounded bg-card">
              <div dangerouslySetInnerHTML={{ __html: response }} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Page;
