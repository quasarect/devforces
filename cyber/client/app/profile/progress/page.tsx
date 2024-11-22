"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Clock,
  Award,
  Target,
  Zap,
  BookOpen,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample activity data for the chart
const activityData = [
  { day: "Mon", hours: 2.5, cases: 3 },
  { day: "Tue", hours: 4.0, cases: 5 },
  { day: "Wed", hours: 3.0, cases: 4 },
  { day: "Thu", hours: 5.0, cases: 6 },
  { day: "Fri", hours: 3.5, cases: 4 },
  { day: "Sat", hours: 1.5, cases: 2 },
  { day: "Sun", hours: 2.0, cases: 3 },
];

interface Module {
  id: number;
  name: string;
  progress: number;
  totalCases: number;
  completedCases: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  lastAccessed: string;
}

const modules: Module[] = [
  {
    id: 1,
    name: "Cryptocurrency Transaction Analysis",
    progress: 75,
    totalCases: 10,
    completedCases: 7,
    difficulty: "Intermediate",
    estimatedTime: "8 hours",
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    name: "Blockchain Forensics",
    progress: 45,
    totalCases: 8,
    completedCases: 4,
    difficulty: "Advanced",
    estimatedTime: "12 hours",
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    name: "Crypto Wallet Investigation",
    progress: 90,
    totalCases: 6,
    completedCases: 5,
    difficulty: "Beginner",
    estimatedTime: "6 hours",
    lastAccessed: "5 hours ago",
  },
];

export default function ProgressTrackingPage() {
  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            Progress Tracking
          </h1>
          <p className="text-gray-400">
            Monitor your learning journey and case completion statistics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Cases",
              value: "16/24",
              icon: Target,
              color: "text-blue-500",
            },
            {
              title: "Hours Spent",
              value: "21.5",
              icon: Clock,
              color: "text-purple-500",
            },
            {
              title: "Certificates",
              value: "2",
              icon: Award,
              color: "text-yellow-500",
            },
            {
              title: "Current Streak",
              value: "5 days",
              icon: Zap,
              color: "text-green-500",
            },
          ].map((stat, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activity Chart */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-green-500" />
              Weekly Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your learning activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Hours Spent"
                  />
                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Cases Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Module Progress */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold text-white">
              Module Progress
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {modules.map((module) => (
              <Card key={module.id} className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-white">
                          {module.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-zinc-800 text-green-500 border-green-500"
                          >
                            {module.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            Last accessed {module.lastAccessed}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {module.estimatedTime}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Progress: {module.completedCases}/{module.totalCases}{" "}
                          cases
                        </span>
                        <span className="text-green-500">
                          {module.progress}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={module.progress}
                          className="h-2 bg-zinc-800"
                        />
                        <style jsx>{`
                          :global(.progress-indicator) {
                            background-color: rgb(34 197 94) !important;
                          }
                        `}</style>
                      </div>
                    </div>

                    {module.progress === 100 && (
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">Module Completed!</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
