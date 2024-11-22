import { moduleSpecific } from "@/types/quizzes";
import {
  Trophy,
  Clock,
  Book,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const QuizCard = ({ quiz }: { quiz: moduleSpecific }) => (
  <div className="mb-4 p-4 bg-card rounded shadow-main">
    <div className="w-full">
      <div className="flex justify-between items-start">
        <div className="text-slate-200">
          <div className="text-xl mb-2">{quiz?.title}</div>
          <div>{quiz?.description}</div>
        </div>
        <div
          className={`ml-2 border px-2 py-1 text-sm rounded border-gray-500 ${
            quiz?.completed ? "bg-transparent" : "bg-gray-500"
          }`}
        >
          {quiz?.completed ? "Completed" : "Available"}
        </div>
      </div>
    </div>
    <div>
      <div className="grid gap-4">
        <div className="flex mt-3 flex-wrap gap-2">
          {quiz?.topics?.map((topic, index) => (
            <div
              key={index}
              className="bg-background text-xs text-color1 rounded px-2 py-1"
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="flex gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Book className="w-4 h-4" />
            {quiz.questions} Questions
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {quiz.timeLimit} Minutes
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            {quiz.difficulty}
          </div>
        </div>

        {quiz.completed ? (
          <div className="flex items-center text-sm gap-2 text-green-600">
            <CheckCircle size={16} />
            <span>Score: {quiz.score}%</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm items-center">
            <span className="flex items-center gap-2 text-blue-500">
              <XCircle size={16} />
              Not attempted yet
            </span>
            <Link
              href={`/test/` + quiz.link}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Start Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);
