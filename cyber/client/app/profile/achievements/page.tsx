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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Star,
  Shield,
  Target,
  Award,
  Zap,
  Crown,
  Clock,
  BookOpen,
} from "lucide-react";

interface Achievement {
  id: number;
  name: string;
  description: string;
  category: "Skills" | "Milestones" | "Special";
  icon: any;
  progress: number;
  totalRequired: number;
  completed: boolean;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  dateEarned?: string;
  xpReward: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: "Blockchain Explorer",
    description: "Complete 10 blockchain analysis investigations",
    category: "Skills",
    icon: Shield,
    progress: 7,
    totalRequired: 10,
    completed: false,
    rarity: "Common",
    xpReward: 100,
  },
  {
    id: 2,
    name: "Crypto Detective",
    description: "Successfully trace 5 cryptocurrency fraud cases",
    category: "Skills",
    icon: Target,
    progress: 5,
    totalRequired: 5,
    completed: true,
    dateEarned: "2024-03-15",
    rarity: "Rare",
    xpReward: 250,
  },
  {
    id: 3,
    name: "First Case Solved",
    description: "Complete your first investigation case",
    category: "Milestones",
    icon: Star,
    progress: 1,
    totalRequired: 1,
    completed: true,
    dateEarned: "2024-02-10",
    rarity: "Common",
    xpReward: 50,
  },
  {
    id: 4,
    name: "Master Investigator",
    description: "Achieve 100% accuracy in 3 consecutive cases",
    category: "Special",
    icon: Crown,
    progress: 2,
    totalRequired: 3,
    completed: false,
    rarity: "Legendary",
    xpReward: 500,
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "text-gray-400 bg-gray-400/10";
    case "Rare":
      return "text-blue-400 bg-blue-400/10";
    case "Epic":
      return "text-purple-400 bg-purple-400/10";
    case "Legendary":
      return "text-yellow-400 bg-yellow-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            Achievements
          </h1>
          <p className="text-gray-400">
            Track your accomplishments and earn rewards
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Achievements",
              value: "12/25",
              icon: Trophy,
              color: "text-yellow-500",
            },
            {
              title: "Current Level",
              value: "15",
              icon: Star,
              color: "text-purple-500",
            },
            {
              title: "Total XP",
              value: "2,450",
              icon: Zap,
              color: "text-blue-500",
            },
            {
              title: "Time Invested",
              value: "45h",
              icon: Clock,
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

        {/* Achievements Tabs */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              Achievement Collection
            </CardTitle>
            <CardDescription className="text-gray-400">
              Unlock achievements by completing various tasks and challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-zinc-800/50">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="milestones"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  Milestones
                </TabsTrigger>
                <TabsTrigger
                  value="special"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  Special
                </TabsTrigger>
              </TabsList>

              {["all", "skills", "milestones", "special"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {achievements
                      .filter(
                        (achievement) =>
                          tab === "all" ||
                          achievement.category.toLowerCase() === tab
                      )
                      .map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border ${
                            achievement.completed
                              ? "bg-zinc-800/50"
                              : "bg-zinc-900"
                          } border-zinc-800`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-lg ${getRarityColor(
                                achievement.rarity
                              )}`}
                            >
                              <achievement.icon className="w-6 h-6" />
                            </div>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                                    {achievement.name}
                                    {achievement.completed && (
                                      <Trophy className="w-4 h-4 text-yellow-500" />
                                    )}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {achievement.description}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`${getRarityColor(
                                    achievement.rarity
                                  )} border-current`}
                                >
                                  {achievement.rarity}
                                </Badge>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">
                                    Progress: {achievement.progress}/
                                    {achievement.totalRequired}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-blue-500" />
                                    <span className="text-blue-500">
                                      {achievement.xpReward} XP
                                    </span>
                                  </div>
                                </div>
                                <Progress
                                  value={
                                    (achievement.progress /
                                      achievement.totalRequired) *
                                    100
                                  }
                                  className="h-2 bg-zinc-800"
                                />
                              </div>

                              {achievement.completed &&
                                achievement.dateEarned && (
                                  <p className="text-sm text-gray-400">
                                    Earned on{" "}
                                    {new Date(
                                      achievement.dateEarned
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Level 15</span>
                <span className="text-gray-400">2,450 / 3,000 XP</span>
              </div>
              <Progress value={81.6} className="h-2 bg-zinc-800" />
              <p className="text-sm text-gray-400">
                450 XP needed for next level
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
