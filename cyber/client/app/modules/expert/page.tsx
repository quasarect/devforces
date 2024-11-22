"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Network, PlayCircle, Scale, Shield } from "lucide-react";
// import ScrollReveal from "../ScrollReveal";
// import Header from "../Header";

import Timeline from "@/components/modules/Timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { quizData } from "@/data/quizData";
import Test from "@/components/modules/Test";

export default function Page() {
  const Quiz = quizData[3];
  const data = {
    header: {
      h1: "Blockchain Expert",
      h2: "Explore Cutting-Edge Blockchain Innovations",
      h3: "Engage with complex cryptoeconomics, advanced security, and blockchain scalability solutions.",
    },
    timeline: [
      {
        heading: "Cryptoeconomics and Game Theory",
        content: (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Advanced Cryptoeconomic Models
              </CardTitle>
              <CardDescription>
                Exploring the interplay between cryptography, economic
                incentives, and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Key Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Mechanism Design in Blockchain</li>
                    <li>Game Theory and Nash Equilibrium</li>
                    <li>Tokenomics and Incentive Models</li>
                    <li>Stablecoin Design and Governance</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  90 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Expert
                </Badge>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Blockchain Scalability & Interoperability",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Advanced Blockchain Scalability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-muted">
                <AlertTitle>Core Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Interoperability Solutions (Polkadot, Cosmos)</li>
                    <li>Cross-chain Protocols</li>
                    <li>Scalability Trilemma</li>
                    <li>Sharding vs Layer 2 Scaling</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  75 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Expert
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
                Video Guide: Advanced Blockchain Security and Auditing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/expert-blockchain-security"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Video Topics:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Auditing Complex Smart Contracts</li>
                  <li>Zero-Knowledge Proofs and Privacy</li>
                  <li>Advanced Governance Models</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Privacy and Zero-Knowledge Proofs",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Deep Dive: Zero-Knowledge Proofs (ZKPs)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-muted">
                <AlertTitle>Key Concepts</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Types of ZKPs: zk-SNARKs, zk-STARKs</li>
                    <li>Use Cases in Privacy and Security</li>
                    <li>Implementation Challenges</li>
                    <li>Privacy-preserving Applications</li>
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
