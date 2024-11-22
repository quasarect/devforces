import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";

const DiffViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data - replace with your actual code comparisons
  const codeDiffs = [
    {
      id: 1,
      correct: "All entries are marked as Rug Pulls or Scams.",
      wrong:
        "There is no Evidence to classify any project in the dataset as valid unless additional info suggests recovery or continuity.",
      explanation:
        "The Scam tag confirms it should be classified as vulnerable.",
    },
    {
      id: 2,
      correct:
        "It has a history of fraudulent activities, including using a Ponzi-like scheme that led to significant investor losses",
      wrong:
        "The project Thodex, marked as a Rug Pull, should not be considered valid or legitimate, as this tag indicates it abandoned investors. Misclassifying it as valid would misrepresent the project’s clear involvement in fraud.",
      explanation:
        "A project labeled as a rug pull implies fraudulent actions where developers withdrew funds.",
    },
    {
      id: 3,
      correct:
        "assuming the absence of valid data aligns with the dataset’s purpose, as all projects listed experienced fraudulent activities.",
      wrong:
        "The Scam designation confirms it engaged in deceptive practices, and assuming otherwise would ignore the fraud record documented in the dataset",
      explanation:
        "Projects labeled as Scam in this dataset have been flagged for fraudulent behavior, meaning they actively deceived investors. Without any recovery or proof of investor protection, they cannot be assumed valid.",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % codeDiffs.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + codeDiffs.length) % codeDiffs.length);
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Code Difference Analyzer
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Correct Code Card */}
              <Card className="bg-card border-green-500/20 border-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Check className="text-green-500 mr-2" />
                    <h2 className="text-lg font-semibold text-green-500">
                      Correct Implementation
                    </h2>
                  </div>
                  <pre className="bg-background p-4 rounded border overflow-x-auto">
                    <code className="text-green-400">
                      {codeDiffs[currentIndex].correct}
                    </code>
                  </pre>
                </CardContent>
              </Card>

              {/* Wrong Code Card */}
              <Card className="bg-card border-red-500/20 border-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <X className="text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold text-red-500">
                      Incorrect Implementation
                    </h2>
                  </div>
                  <pre className="bg-background p-4 rounded border overflow-x-auto">
                    <code className="text-red-400">
                      {codeDiffs[currentIndex].wrong}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* Explanation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card mb-8">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-2 text-yellow-500">
                    Explanation
                  </h2>
                  <p className="text-gray-300">
                    {codeDiffs[currentIndex].explanation}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button variant="outline" onClick={handlePrevious} className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Previous
          </Button>

          <span className="text-gray-400">
            {currentIndex + 1} / {codeDiffs.length}
          </span>

          <Button variant="outline" onClick={handleNext} className="group">
            Next
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
