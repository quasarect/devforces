"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Lock, PlayCircle, Server, TrendingUp } from "lucide-react";
// import ScrollReveal from "../ScrollReveal";
// import Header from "../Header";

import Timeline from "@/components/modules/Timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { quizData } from "@/data/quizData";
import Test from "@/components/modules/Test";

export default function Page() {
  const Quiz = quizData[2];
  const data = {
    header: {
      h1: "Blockchain Advanced",
      h2: "Master Advanced Blockchain Techniques",
      h3: "Dive into complex topics like consensus, scaling solutions, and smart contract security.",
    },
    timeline: [
      {
        heading: "Advanced Consensus Mechanisms",
        content: (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Exploring Advanced Consensus Algorithms
              </CardTitle>
              <CardDescription>
                In-depth study of modern consensus techniques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Key Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Proof of Authority (PoA)</li>
                    <li>Proof of Burn (PoB)</li>
                    <li>Hybrid Consensus Models</li>
                    <li>Delegated Byzantine Fault Tolerance (dBFT)</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  60 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Advanced
                </Badge>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Scaling Solutions",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Blockchain Scaling Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-muted">
                <AlertTitle>Core Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Layer 1 Scaling: Sharding</li>
                    <li>Layer 2 Scaling: State Channels</li>
                    <li>Sidechains and Plasma</li>
                    <li>Rollups (Optimistic & ZK-Rollups)</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  45 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Advanced
                </Badge>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Video Lesson",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Video Guide: Blockchain Security & Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/advanced-blockchain-security"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Video Topics:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Security Threats in Blockchain</li>
                  <li>Governance Models in Blockchain</li>
                  <li>Regulatory Challenges</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Smart Contract Security",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Ensuring Smart Contract Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-muted">
                <AlertTitle>Security Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Common Vulnerabilities (Reentrancy, Overflow)</li>
                    <li>Security Tools (Mythril, Slither)</li>
                    <li>Formal Verification</li>
                    <li>Auditing Standards</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Knowledge Check",
        content: <Test {...Quiz} />,
      },
    ],
  };

  // Similar structure would follow for intermediate, advanced, and expert levels

  return <Timeline {...data} />;
}
