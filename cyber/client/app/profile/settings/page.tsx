"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Bell, Key, User, Terminal, Globe } from "lucide-react";

interface ProfileSettings {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export default function ProfilePage() {
  const [settings, setSettings] = useState<ProfileSettings>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/100/100",
    role: "Cybersecurity Investigator",
  });

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-green-500">
              Profile Settings
            </h1>
            <p className="text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10"
          >
            Save Changes
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Card */}
          <Card className="md:col-span-1 bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={settings.avatar} />
                  <AvatarFallback className="bg-green-500/20 text-green-500">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">
                    {settings.name}
                  </h2>
                  <p className="text-sm text-gray-400">{settings.role}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-500 text-green-500 hover:bg-green-500/10"
                >
                  Change Avatar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <Card className="md:col-span-3 bg-zinc-900 border-zinc-800">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4 gap-4 p-4 bg-zinc-800/50">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  <User className="w-4 h-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="api"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  API
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="p-4 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={settings.name}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) =>
                        setSettings({ ...settings, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="p-4">
                <div className="space-y-4">
                  <Card className="bg-zinc-800 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Two-Factor Authentication
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Enable 2FA</span>
                      </div>
                      <Switch className="data-[state=checked]:bg-green-500" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-4">
                <div className="space-y-4">
                  <Card className="bg-zinc-800 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Notification Preferences
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-green-500" />
                          <span className="text-gray-300">
                            Browser Notifications
                          </span>
                        </div>
                        <Switch className="data-[state=checked]:bg-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-4 h-4 text-green-500" />
                          <span className="text-gray-300">
                            Email Notifications
                          </span>
                        </div>
                        <Switch className="data-[state=checked]:bg-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="api" className="p-4">
                <div className="space-y-4">
                  <Card className="bg-zinc-800 border-zinc-700">
                    <CardHeader>
                      <CardTitle className="text-white">API Keys</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage your API keys for the virtual lab environment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Input
                          readOnly
                          value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                          className="bg-zinc-800 border-zinc-700 text-white font-mono"
                        />
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-500 hover:bg-green-500/10"
                        >
                          Generate New Key
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
