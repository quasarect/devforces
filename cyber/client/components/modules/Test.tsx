"use client";

import React, { useRef, useState } from "react";
import { Award, CheckCircle2, Download, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MintButton from "./MintButton";

export default function Test(props: {
  title: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string | number;
    explanation: string;
  }[];
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number | undefined>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowNameDialog(true);
  };

  const getAnswerStatus = (questionIndex: number, optionIndex: number) => {
    if (!submitted) return "default";

    const isSelected = selectedAnswers[questionIndex] === optionIndex;
    const isCorrect =
      props.questions[questionIndex].correctAnswer === optionIndex;

    if (isSelected && isCorrect) return "correct";
    if (isSelected && !isCorrect) return "wrong";
    if (!isSelected && isCorrect) return "correct-unselected";
    return "default";
  };

  const getScoreCount = () => {
    let correct = 0;
    props.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleCertificateGeneration = () => {
    setShowNameDialog(false);
    setShowCertificate(true);
    setCertificateGenerated(true);
  };

  const viewCertificate = () => {
    setShowCertificate(true);
  };

  const downloadCertificate = () => {
    if (certificateRef.current) {
      // In a real application, you'd want to use a library like html2canvas or similar
      // to properly generate a PDF or image file. This is a simplified example.
      const certificateContent = certificateRef.current.innerText;
      const blob = new Blob([certificateContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${userName.replace(/\s+/g, "_")}_certificate.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const score = getScoreCount();
  const percentage = Math.round((score / props.questions.length) * 100);

  const Certificate = () => (
    <div
      ref={certificateRef}
      className="max-w-3xl mx-auto my-8 p-12 bg-white text-black rounded-lg shadow-xl border-8 border-double border-gray-300"
    >
      <div className="text-center space-y-6">
        <div className="text-4xl font-serif mb-8">
          Certificate of Completion
        </div>

        <div className="text-xl">This is to certify that</div>
        <div className="text-3xl font-bold text-blue-600 my-4">{userName}</div>

        <div className="text-xl">has successfully completed the</div>
        <div className="text-2xl font-bold my-4">
          {props.title || "Assessment Test"}
        </div>

        <div className="text-xl">with a score of</div>
        <div className="text-3xl font-bold text-green-600 my-4">
          {score} out of {props.questions.length} ({percentage}%)
        </div>

        <div className="mt-16 pt-8 border-t border-gray-300">
          <div className="text-sm text-gray-600">
            Date: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <div className="space-y-6 mx-4 pb-10">
        {props?.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="bg-card shadow-main p-6 rounded">
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{questionIndex + 1}</div>
                  <div className="text-lg font-medium text-primary-text flex-1">
                    {question.question}
                  </div>
                </div>

                <div className="space-y-3 text-text pl-12">
                  {question.options.map((option, optionIndex) => {
                    const status = getAnswerStatus(questionIndex, optionIndex);
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => {
                          if (!submitted) {
                            setSelectedAnswers({
                              ...selectedAnswers,
                              [questionIndex]: optionIndex,
                            });
                          }
                        }}
                        disabled={submitted}
                        className={`w-full text-left p-4 rounded text-sm border transition-all 
                          ${
                            status === "correct"
                              ? "bg-green-100 border-green-500 text-green-800"
                              : status === "wrong"
                              ? "bg-red-100 border-red-500 text-red-800"
                              : status === "correct-unselected"
                              ? "bg-green-50 border-green-300 text-green-800"
                              : "hover:bg-card-hover hover:border-border-card"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border 
                              ${
                                status === "correct"
                                  ? "border-green-500 bg-green-500 text-white"
                                  : status === "wrong"
                                  ? "border-red-500 bg-red-500 text-white"
                                  : status === "correct-unselected"
                                  ? "border-green-500 bg-green-100 text-green-800"
                                  : selectedAnswers[questionIndex] ===
                                    optionIndex
                                  ? "border-blue-600 bg-blue-400 text-white"
                                  : "border-gray-300"
                              }
                            `}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </div>
                          {option}
                          {submitted && (
                            <>
                              {status === "correct" && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                              )}
                              {status === "wrong" && (
                                <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {submitted && question.explanation && (
                  <div className="mt-4 pl-12 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-[#08060e]/90 backdrop-blur border-t z-[60] p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Test</h2>
            {submitted && (
              <p className="text-sm mt-1">
                Score: {getScoreCount()} / {props.questions.length} (
                {Math.round((getScoreCount() / props.questions.length) * 100)}%)
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!submitted && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-slate-200 rounded text-black hover:bg-slate-100"
              >
                Submit Quiz
              </button>
            )}
            {certificateGenerated && (
              <button
                onClick={viewCertificate}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Award className="w-4 h-4" />
                View Certificate
              </button>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {props?.questions.map((_, index) => {
            const isAnswered = selectedAnswers[index] !== undefined;
            const isCorrect =
              submitted &&
              selectedAnswers[index] === props.questions[index].correctAnswer;

            return (
              <div
                key={index}
                className={`w-8 h-8 flex border rounded items-center justify-center
                  ${
                    !submitted
                      ? isAnswered
                        ? "bg-primary border-blue-300"
                        : ""
                      : isCorrect
                      ? "bg-green-100 border-green-500 text-green-500"
                      : "bg-red-100 border-red-500 text-red-500"
                  }
                `}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Name for the Certificate</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleCertificateGeneration}
              disabled={!userName.trim()}
              className="bg-slate-100 hover:bg-slate-50 rounded"
            >
              Generate Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Display */}
      {showCertificate && (
        <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Your Certificate</DialogTitle>
            </DialogHeader>
            <Certificate />
            <DialogFooter className="w-full !justify-between flex">
              {/* <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white rounded">
                Mint Certificate
              </Button> */}
              <MintButton />
              <Button
                onClick={downloadCertificate}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-50 rounded"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
