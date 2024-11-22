"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BookOpen, GraduationCap, PlayCircle } from "lucide-react";
// import ScrollReveal from "../ScrollReveal";
// import Header from "../Header";

import Timeline from "@/components/modules/Timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { quizData } from "@/data/quizData";
import Test from "@/components/modules/Test";

export default function Page() {
  const Quiz = quizData[0];
  const data = {
    header: {
      h1: "Blockchain Fundamentals",
      h2: "Master the Basics of Blockchain Technology",
      h3: "Learn the core concepts of blockchain, cryptocurrencies, and decentralized systems",
    },
    timeline: [
      {
        heading: "Introduction to Blockchain",
        content: (
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Understanding Blockchain Technology
              </CardTitle>
              <CardDescription>
                Core concepts and fundamental principles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Key Topics</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>What is blockchain technology?</li>
                    <li>Decentralization and its importance</li>
                    <li>Basic cryptography concepts</li>
                    <li>Understanding distributed ledgers</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Badge className="rounded-full bg-background text-primary-text !border border-border">
                  30 minutes
                </Badge>
                <Badge className="rounded-full text-black bg-primary-text">
                  Beginner
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
                Video Guide: Blockchain Basics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/21b5QF-b0rE?si=XP7voT6li6LS2yXx"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Video Topics:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>History of blockchain</li>
                  <li>How blocks are created and linked</li>
                  <li>Real-world applications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ),
      },
      {
        heading: "Additional Concepts",
        content: (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Deep Dive: Blockchain Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-muted">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Blocks</h3>
                    <p className="text-sm">
                      Understanding the basic unit of a blockchain, including
                      headers, timestamps, and data storage.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Consensus Mechanisms</h3>
                    <p className="text-sm">
                      Introduction to how blockchain networks reach agreement on
                      the state of the system.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Cryptographic Hashing</h3>
                    <p className="text-sm">
                      Basic overview of how hashing ensures data integrity in
                      the blockchain.
                    </p>
                  </div>
                </div>
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
