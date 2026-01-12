import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  // Dummy data for the dashboard
  const stats = [
    { title: "Total Workflows", value: "12", description: "Active automations" },
    { title: "Tasks Completed", value: "1,247", description: "This month" },
    { title: "Success Rate", value: "98.5%", description: "All time average" },
    { title: "Time Saved", value: "156h", description: "This month" },
  ];

  const recentActivity = [
    { name: "Email Notification Flow", status: "Completed", time: "2 minutes ago" },
    { name: "Data Sync Automation", status: "Running", time: "5 minutes ago" },
    { name: "Report Generator", status: "Completed", time: "1 hour ago" },
    { name: "Backup Workflow", status: "Completed", time: "3 hours ago" },
    { name: "API Integration Flow", status: "Failed", time: "5 hours ago" },
  ];

  return (
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20 overflow-scroll ">
      <div className="flex flex-col gap-4 relative">
        <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
          Dashboard
        </h1>
        
        <div className="px-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest workflow executions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : activity.status === "Running"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Overview of your automation performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Most Used Integration</p>
                  <p className="text-2xl font-bold">Google Drive</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Average Execution Time</p>
                  <p className="text-2xl font-bold">2.4s</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Active Connections</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Error Rate</p>
                  <p className="text-2xl font-bold">1.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
