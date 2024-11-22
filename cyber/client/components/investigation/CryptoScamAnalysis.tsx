import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Shield,
  Link,
  Wallet,
  Users,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const CryptoScamAnalysis = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 5;

  return (
    <div className="min-h-screen w-full max-w-4xl bg-background text-foreground p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-500" />
            Crypto Scam Investigation Guide
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of potential cryptocurrency scams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(currentStep / totalSteps) * 100} className="mb-4" />
          <div className="flex items-center gap-2 mb-4">
            {[...Array(totalSteps)].map((_, index) => (
              <Button
                key={index}
                variant={currentStep === index + 1 ? "default" : "outline"}
                size="sm"
                className="bg-slate-100 rounded text-black hover:bg-white hover:text-black"
                onClick={() => setCurrentStep(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Tabs defaultValue="phishing" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="phishing">Phishing</TabsTrigger>
              <TabsTrigger value="ponzi">Ponzi Schemes</TabsTrigger>
              <TabsTrigger value="fake-icos">Fake ICOs</TabsTrigger>
              <TabsTrigger value="impersonation">Impersonation</TabsTrigger>
            </TabsList>

            <TabsContent value="phishing" className="mt-4">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
                      Initial Analysis
                    </Badge>
                    <CardTitle>Domain and Website Investigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <Link className="h-6 w-6 mb-2 text-blue-500" />
                        <h3 className="font-semibold">Domain Analysis</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>WHOIS information</li>
                          <li>Registration date</li>
                          <li>SSL certificate</li>
                          <li>Similar domains</li>
                        </ul>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
                      Technical Analysis
                    </Badge>
                    <CardTitle>Infrastructure Investigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning Signs</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-4 mt-2">
                          <li>Suspicious hosting providers</li>
                          <li>Known malicious IPs</li>
                          <li>Automated scripts</li>
                          <li>Data collection forms</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
                      Content Analysis
                    </Badge>
                    <CardTitle>Message and Design Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h3 className="font-semibold">Red Flags</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Urgency messaging</li>
                          <li>Poor grammar/spelling</li>
                          <li>Copied legitimate sites</li>
                          <li>Suspicious URLs</li>
                        </ul>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
                      Wallet Analysis
                    </Badge>
                    <CardTitle>Transaction Investigation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <Wallet className="h-6 w-6 mb-2 text-green-500" />
                        <h3 className="font-semibold">Transaction Patterns</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Fund flow analysis</li>
                          <li>Connected wallets</li>
                          <li>Exchange interactions</li>
                          <li>Victim patterns</li>
                        </ul>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 5 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2 bg-slate-100 rounded text-black hover:bg-white hover:text-black">
                      Response
                    </Badge>
                    <CardTitle>Mitigation and Reporting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <Users className="h-6 w-6 mb-2 text-purple-500" />
                        <h3 className="font-semibold">Action Steps</h3>
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Report to authorities</li>
                          <li>Alert exchanges</li>
                          <li>Warn communities</li>
                          <li>Document evidence</li>
                        </ul>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Similar content structure for other tabs... */}
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            className="bg-slate-100 rounded text-black hover:bg-white hover:text-black"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button
            className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black   "
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            className="flex-1 bg-slate-100 rounded text-black hover:bg-white hover:text-black"
            onClick={() => setCurrentStep(1)}
          >
            Start Over
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
