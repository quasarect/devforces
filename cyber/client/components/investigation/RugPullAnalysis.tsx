import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Activity,
  Layers,
  PieChart,
  FileWarning,
  ShieldAlert,
} from "lucide-react";

// Sample data for liquidity changes
const liquidityData = [
  { timestamp: "00:00", value: 1000000, volume: 50000 },
  { timestamp: "04:00", value: 980000, volume: 75000 },
  { timestamp: "08:00", value: 950000, volume: 100000 },
  { timestamp: "12:00", value: 900000, volume: 150000 },
  { timestamp: "16:00", value: 400000, volume: 300000 },
  { timestamp: "20:00", value: 50000, volume: 400000 },
  { timestamp: "24:00", value: 1000, volume: 450000 },
];

const RugPullAnalysis = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 5;

  return (
    <div className="min-h-screen max-w-4xl w-full bg-background text-foreground p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Activity className="h-6 w-6 text-red-500" />
            Rug Pull Investigation Guide
          </CardTitle>
          <CardDescription>
            Step-by-step analysis to identify and investigate potential rug
            pulls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={(currentStep / totalSteps) * 100}
            className="mb-4 bg-black"
          />
          <div className="flex items-center gap-2 mb-4">
            {[...Array(totalSteps)].map((_, index) => (
              <Button
                key={index}
                className="bg-white rounded text-black"
                variant={currentStep === index + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Initial Token Analysis */}
      {currentStep === 1 && (
        <Card className="mb-6">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
              Step 1
            </Badge>
            <CardTitle>Initial Token Analysis</CardTitle>
            <CardDescription>
              Verify basic token information and contract details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Key Checks:</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Contract verification status on block explorer</li>
                <li>Token supply and distribution</li>
                <li>Creation date and initial transactions</li>
                <li>Developer wallet analysis</li>
              </ul>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning Signs</AlertTitle>
              <AlertDescription>
                - Unverified contract code - Large percentage held by single
                wallet - Recently created token - Hidden developer wallets
              </AlertDescription>
            </Alert>

            <Button
              className="w-full bg-slate-100 rounded text-black hover:bg-white hover:text-black"
              onClick={() => setCurrentStep(2)}
            >
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Liquidity Analysis */}
      {currentStep === 2 && (
        <Card className="mb-6">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
              Step 2
            </Badge>
            <CardTitle>Liquidity Pool Analysis</CardTitle>
            <CardDescription>
              Monitor liquidity changes and pool behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liquidityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ff4444"
                    name="Liquidity Value"
                  />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#4444ff"
                    name="Trading Volume"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Analysis Points:</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Monitor liquidity pool size over time</li>
                <li>Track large liquidity removals</li>
                <li>Compare with trading volume</li>
                <li>Check for locked liquidity</li>
              </ul>
            </Card>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Red Flags</AlertTitle>
              <AlertDescription>
                - Sudden drops in liquidity - Unlocked liquidity tokens -
                Suspicious LP token transfers - Correlation with price
                manipulation
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className=" bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </Button>
              <Button
                className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(3)}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Trading Pattern Analysis */}
      {currentStep === 3 && (
        <Card className="mb-6">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
              Step 3
            </Badge>
            <CardTitle>Trading Pattern Analysis</CardTitle>
            <CardDescription>
              Identify suspicious trading activities and wallet behaviors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Key Patterns to Watch:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <PieChart className="h-6 w-6 mb-2 text-blue-500" />
                  <h4 className="font-semibold">Buy/Sell Ratio</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor the balance between buying and selling transactions
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Layers className="h-6 w-6 mb-2 text-green-500" />
                  <h4 className="font-semibold">Wallet Clustering</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify connected wallets and coordinated actions
                  </p>
                </div>
              </div>
            </Card>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Suspicious Patterns</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2">
                  <li>Coordinated buying/selling</li>
                  <li>Wash trading between related wallets</li>
                  <li>Price manipulation attempts</li>
                  <li>Artificial volume creation</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(2)}
              >
                Previous
              </Button>
              <Button
                className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(4)}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card className="mb-6">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
              Step 4
            </Badge>
            <CardTitle>Smart Contract Security Analysis</CardTitle>
            <CardDescription>
              Deep dive into contract functionality and security features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <ShieldAlert className="h-6 w-6 mb-2 text-yellow-500" />
                <h3 className="text-lg font-semibold mb-2">
                  Contract Functions
                </h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Ownership controls</li>
                  <li>Transfer restrictions</li>
                  <li>Fee mechanisms</li>
                  <li>Blacklist capabilities</li>
                </ul>
              </Card>

              <Card className="p-4">
                <FileWarning className="h-6 w-6 mb-2 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Security Checks</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Backdoor functions</li>
                  <li>Hidden minting abilities</li>
                  <li>Arbitrary fee changes</li>
                  <li>Pause/freeze functions</li>
                </ul>
              </Card>
            </div>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Critical Vulnerabilities</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2">
                  <li>Unlimited minting functions</li>
                  <li>Hidden owner privileges</li>
                  <li>Malicious fee collection</li>
                  <li>Trapped user funds</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(3)}
              >
                Previous
              </Button>
              <Button
                className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(5)}
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Response and Reporting */}
      {currentStep === 5 && (
        <Card className="mb-6">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
              Step 5
            </Badge>
            <CardTitle>Response and Reporting</CardTitle>
            <CardDescription>
              Action steps and reporting procedures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Immediate Actions
                </h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Document all findings</li>
                  <li>Alert affected users</li>
                  <li>Contact exchange platforms</li>
                  <li>Preserve transaction evidence</li>
                </ul>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-2">Report To</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Blockchain security firms</li>
                  <li>Relevant authorities</li>
                  <li>Community channels</li>
                  <li>DeFi safety platforms</li>
                </ul>
              </Card>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Best Practices</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 mt-2">
                  <li>Maintain detailed documentation</li>
                  <li>Include transaction hashes</li>
                  <li>Track wallet addresses</li>
                  <li>Follow up on reports</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(4)}
              >
                Previous
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(1)}
              >
                Start Over
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional steps would continue here... */}
    </div>
  );
};

export default RugPullAnalysis;
