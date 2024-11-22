"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Code, PlayCircle, Server, Shield } from "lucide-react";
// import ScrollReveal from "../ScrollReveal";
// import Header from "../Header";

import Timeline from "@/components/modules/Timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { quizData } from "@/data/quizData";
import Test from "@/components/modules/Test";

export default function Page() {
  const Quiz = quizData[1];
  const data = {
    header: {
      h1: "Blockchain Intermediate",
      h2: "Deepen Your Understanding of Blockchain Mechanisms",
      h3: "Explore key concepts like consensus algorithms, smart contracts, and privacy.",
    },
    timeline: [
      {
        heading: "Consensus Mechanisms",
        content: (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Exploring Consensus Algorithms
              </CardTitle>
              <CardDescription>
                Core protocols for blockchain network agreement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Key Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Proof of Work (PoW)</li>
                    <li>Proof of Stake (PoS)</li>
                    <li>Delegated Proof of Stake (DPoS)</li>
                    <li>Practical Byzantine Fault Tolerance (PBFT)</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  45 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Intermediate
                </Badge>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Smart Contracts",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Smart Contracts: Automated Agreements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="bg-muted">
                <AlertTitle>Core Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>What are Smart Contracts?</li>
                    <li>How Smart Contracts are Executed</li>
                    <li>
                      Popular Platforms for Smart Contracts (Ethereum, EOS)
                    </li>
                    <li>Risks and Limitations of Smart Contracts</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  30 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Intermediate
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
                Video Guide: Advanced Blockchain Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/advanced-blockchain"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Video Topics:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Consensus and Mining Techniques</li>
                  <li>Use Cases of Smart Contracts</li>
                  <li>Future Trends in Blockchain</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Privacy in Blockchain",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Ensuring Privacy and Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-muted">
                <AlertTitle>Privacy Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Privacy Coins and Anonymity</li>
                    <li>Zero-Knowledge Proofs</li>
                    <li>Ring Signatures</li>
                    <li>Challenges in Maintaining Privacy</li>
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
