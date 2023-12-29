"use client";
import React from "react";
import { useSupabaseUser } from "@/components/providers/user-provider";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { createWorkspace } from "@/lib/server-actions/workspace-actions";
import CreateWorkspace from "@/components/create-workspace";
import { useRouter } from "next/navigation";
import { SkeletonDemo } from "@/components/loader-skeleton";
const DashboardPage = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();
  const { user } = useSupabaseUser();

  if (!user) return <SkeletonDemo />;

  if (!workspace)
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
        <p className="text-lg text-center">
          You don&apos;t have any workspaces yet. Create one to get started.
        </p>
        <CreateWorkspace createWorkspace={createWorkspace} />
      </div>
    );
  else {
    router.push(`/dashboard/${workspace.id}`);
    return <div>Redirecting...</div>;
  }
};

export default DashboardPage;
