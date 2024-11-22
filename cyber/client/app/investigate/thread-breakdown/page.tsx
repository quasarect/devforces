"use client";
import React, { useEffect, useState } from "react";
import GuideLineComponent from "@/components/GuideLine/GuideLineComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowUpRight,
  Info,
  Shield,
  TrendingUp,
} from "lucide-react";
// import ScrollReveal from "../ScrollReveal";
// import Header from "../Header";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DiffViewer from "@/components/GuideLine/DiffViewer";
import Test from "@/components/modules/Test";
import { CryptoScamAnalysis } from "@/components/investigation/CryptoScamAnalysis";
export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = {
    level: "Beginner Level Questions",
    questions: [
      {
        id: 1,
        question: "What is a rug pull scam?",
        options: [
          "A project that delivers promised returns",
          "A sudden withdrawal of all funds by developers, leaving investors with worthless assets",
          "A type of NFT sale where tokens are guaranteed",
        ],
        correctAnswer: "B",
        explanation:
          "A rug pull scam occurs when developers withdraw all funds, leaving investors with worthless assets.",
      },
      {
        id: 2,
        question:
          "Which year saw an increase in rug pull scams, especially in NFTs?",
        options: ["2018", "2020", "2021"],
        correctAnswer: "C",
        explanation:
          "2021 saw a significant increase in rug pull scams, particularly in the NFT space.",
      },
      {
        id: 3,
        question:
          "In which environments do cryptocurrency rug pulls most commonly occur?",
        options: [
          "DeFi (Decentralized Finance) platforms",
          "Traditional banking platforms",
          "Retail investment accounts",
        ],
        correctAnswer: "A",
        explanation:
          "Rug pulls most commonly occur in DeFi platforms, where the decentralized nature can make scams easier to execute.",
      },
      {
        id: 4,
        question: "What is a key red flag in rug pull scams?",
        options: [
          "High developer transparency",
          "Anonymous project creators",
          "Detailed project audits",
        ],
        correctAnswer: "B",
        explanation:
          "Anonymous project creators are a common red flag in rug pull scams.",
      },
      {
        id: 5,
        question: "Why are NFTs vulnerable to rug pull scams?",
        options: [
          "They involve high regulatory oversight",
          "They are easy to create and can be hyped quickly",
          "They require physical assets",
        ],
        correctAnswer: "B",
        explanation:
          "NFTs are vulnerable because they are easy to create and can generate hype quickly, attracting unwary investors.",
      },
      {
        id: 6,
        question: "What is an effective way to verify a project's legitimacy?",
        options: [
          "Check if it is promoted by influencers",
          "Verify if it has undergone a security audit",
          "Look for high social media following",
        ],
        correctAnswer: "B",
        explanation:
          "Security audits are a reliable way to verify a project's legitimacy, as they help identify potential vulnerabilities.",
      },
      {
        id: 7,
        question:
          "How can time-locks in contracts help prevent rug pull scams?",
        options: [
          "By allowing instant withdrawal of funds",
          "By securing funds for a set period, reducing immediate withdrawal risk",
          "By generating additional interest for developers",
        ],
        correctAnswer: "B",
        explanation:
          "Time-locks in contracts secure funds for a set period, reducing the risk of immediate rug pulls.",
      },
      {
        id: 8,
        question: "Which of the following describes a “liquidity pull” scam?",
        options: [
          "Investors slowly receive returns over time",
          "Developers remove all liquidity, collapsing token value",
          "Projects limit access to token transactions",
        ],
        correctAnswer: "B",
        explanation:
          "A liquidity pull occurs when developers withdraw liquidity, causing the token value to collapse.",
      },
      {
        id: 9,
        question:
          "What should you do if a project offers “guaranteed” high returns quickly?",
        options: [
          "Invest more to maximize returns",
          "Proceed with caution and investigate further",
          "Avoid the project, as it could be a scam",
        ],
        correctAnswer: "C",
        explanation:
          "Promises of 'guaranteed' high returns are a common scam tactic. Avoid such projects.",
      },
      {
        id: 10,
        question: "Why should investors monitor a project’s liquidity pools?",
        options: [
          "High liquidity means the project is safe",
          "Limited control over liquidity by developers reduces the risk of a rug pull",
          "It ensures investors will receive guaranteed profits",
        ],
        correctAnswer: "B",
        explanation:
          "Monitoring liquidity pools is essential as limited developer control reduces rug pull risks.",
      },
    ],
  };

  // Sample data - in real application, this would come from your backend
  const transactionData = [
    {
      date: "2012",
      normalVolume: 20,
      suspiciousVolume: 15,
      totalWallets: 5,
    },
    {
      date: "2016",
      normalVolume: 11,
      suspiciousVolume: 9,
      totalWallets: 5,
    },
    {
      date: "2017",
      normalVolume: 5,
      suspiciousVolume: 8,
      totalWallets: 6,
    },
    {
      date: "2018",
      normalVolume: 4,
      suspiciousVolume: 3,
      totalWallets: 8,
    },
    {
      date: "2019",
      normalVolume: 4,
      suspiciousVolume: 5,
      totalWallets: 7,
    },
    {
      date: "2020",
      normalVolume: 3,
      suspiciousVolume: 3,
      totalWallets: 14,
    },
    {
      date: "2021",
      normalVolume: 4,
      suspiciousVolume: 3,
      totalWallets: 15,
    },
    {
      date: "2022",
      normalVolume: 1,
      suspiciousVolume: 1,
      totalWallets: 16,
    },
  ];

  const threatIndicators = [
    { indicator: "Multichain Exploiters", count: 23, risk: "High" },
    { indicator: "Malicious Actors", count: 44, risk: "Medium" },
    { indicator: "Heist Labels on Etherscan", count: 11, risk: "High" },
    { indicator: "Sparse Notes", count: 29, risk: "Medium" },
  ];
  return (
    <section className="w-full px-2 relative sm:px-4 text-slate-100 items-center pb-20 bg-transparent flex flex-col">
      <div className="bg-transparent text-2xl px-4 py-20 w-full text-center flex items-center gap-2 flex-col">
        <div className="">
          <span className="">Explore deceptive tactics in DeFi scams </span>
          <span className="leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            their impact, and strategies
          </span>
        </div>

        <div className="">for safeguarding digital assets.</div>
      </div>
      <CryptoScamAnalysis />

      <div className="relative flex flex-col items-left z-[10] justify-center w-full">
        <div className="absolute z-[-2] w-[3px] left-[40px] md:left-[50px] [mask:linear-gradient(0deg,transparent,white_20%,white_80%,transparent)] h-full bg-[_theme(colors.slate.900/.88)]">
          <div className="fixed left-auto top-0 right-auto bottom-[50vh] z-[-1] w-[3px] h-[50vh] bg-white bg-[linear-gradient(180deg,_theme(colors.indigo.500)_50%,_theme(colors.blue.300),_theme(colors.indigo.500))]"></div>
        </div>

        <GuideLineComponent
          time="Introduction"
          heading="Introduction"
          content={
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center text-xl gap-2">
                  <Info className="h-5 w-5" />
                  Malicious Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                Smart contracts are self-executing programs that run on
                blockchains, but they can also be misused. Malicious smart
                contracts are designed to exploit vulnerabilities or deceive
                users, leading to financial loss, fraud, or operational
                disruption. This report provides an in-depth analysis of a
                dataset containing such malicious contracts, highlighting
                patterns and giving insights into mitigating the risks.
              </CardContent>
            </Card>
          }
        />

        <GuideLineComponent
          time="Introduction"
          heading="Scam Analysis"
          content={
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Transaction Volume Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={transactionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="normalVolume"
                            stroke="#8884d8"
                            name="Normal Volume"
                          />
                          <Line
                            type="monotone"
                            dataKey="suspiciousVolume"
                            stroke="#ff7300"
                            name="Suspicious Volume"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wallet Activity Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  {isClient && (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transactionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="totalWallets"
                            fill="#82ca9d"
                            name="Active Wallets"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          }
        />

        <GuideLineComponent
          time="Introduction"
          heading="Threat Breakdown"
          content={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Key Threat Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {threatIndicators.map((indicator, index) => (
                    <Alert
                      key={index}
                      className={`border-l-4 ${
                        indicator.risk === "High"
                          ? "border-l-red-500"
                          : "border-l-yellow-500"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{indicator.indicator}</h3>
                          <AlertDescription>
                            Count: {indicator.count} | Risk Level:{" "}
                            {indicator.risk}
                          </AlertDescription>
                        </div>
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          }
        />

        <GuideLineComponent
          time="Introduction"
          heading="Prevention Guidelines"
          content={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Prevention Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Prevention Insights */}
                  <div>
                    <h2 className="text-xl font-semibold text-primary-text mb-4">
                      Prevention Insight
                    </h2>
                    <ul className="list-disc pl-5 text-text space-y-2">
                      <li>
                        <span className="font-semibold">Code Audits:</span>{" "}
                        Thorough audits to identify vulnerabilities.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Use Verified Contracts:
                        </span>{" "}
                        Engage with contracts marked as safe by trusted
                        platforms like Etherscan.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Real-time Monitoring:
                        </span>{" "}
                        Tools to detect suspicious activities promptly.
                      </li>
                      <li>
                        <span className="font-semibold">
                          Community Reporting:
                        </span>{" "}
                        Encourage users to report scams and maintain a
                        blacklist.
                      </li>
                    </ul>
                  </div>

                  {/* Quizzes Section */}
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-primary-text mb-4">
                      Quizzes
                    </h2>
                    <ul className="list-decimal pl-5 space-y-4 text-text">
                      <li>
                        What is a rug pull scam?
                        <br />
                        <span>A) A project that delivers promised returns</span>
                        <br />
                        <span>
                          B) A sudden withdrawal of all funds by developers,
                          leaving investors with worthless assets (Answer)
                        </span>
                        <br />
                        <span>
                          C) A type of NFT sale where tokens are guaranteed
                        </span>
                      </li>
                      <li>
                        Which year saw an increase in rug pull scams, especially
                        in NFTs?
                        <br />
                        <span>A) 2018</span>
                        <br />
                        <span>B) 2020</span>
                        <br />
                        <span>C) 2021 (Answer)</span>
                      </li>
                      {/* Add other questions similarly */}
                    </ul>
                  </div>

                  {/* Key Points for Verification and Security */}
                  <div className="space-y-4">
                    <Alert>
                      <AlertDescription>
                        <h3 className="font-bold text-primary-text mb-2">
                          1. Verify Transaction Patterns
                        </h3>
                        <ul className="list-disc pl-4 text-text">
                          <li>Monitor for sudden large volume changes</li>
                          <li>Check for unusual timing patterns</li>
                          <li>Verify recipient wallet history</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <AlertDescription>
                        <h3 className="font-bold text-primary-text mb-2">
                          2. Wallet Security
                        </h3>
                        <ul className="list-disc pl-4 text-text">
                          <li>Enable multi-factor authentication</li>
                          <li>Use hardware wallets for large holdings</li>
                          <li>Regular security audits</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <AlertDescription>
                        <h3 className="font-bold text-primary-text mb-2">
                          3. Red Flags
                        </h3>
                        <ul className="list-disc pl-4 text-text">
                          <li>Promises of guaranteed returns</li>
                          <li>Pressure to act quickly</li>
                          <li>Unsolicited investment opportunities</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        />

        <GuideLineComponent
          time="Introduction"
          heading="Quiz"
          content={<Test {...data} />}
        />

        <GuideLineComponent
          time="Introduction"
          heading="Quiz"
          content={<DiffViewer />}
        />
      </div>
    </section>
  );
}