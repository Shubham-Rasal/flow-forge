'use client';
import React from 'react';
import { useSupabaseUser } from '@/components/user-provider';
import { useWorkspace } from '@/components/workspace-provider';
import { createWorkspace } from '@/lib/server-actions/workspace-actions';
import CreateWorkspace from '@/components/create-workspace';
import { redirect } from 'next/navigation';
const DashboardPage = () => {

  const {workspace} = useWorkspace();

  const {user} = useSupabaseUser();

  if(!user) return <div>Fetching user...</div>;


  if (!workspace)
    return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Welcome {user.email}</h1>
          <p className="text-lg text-center">
            You don't have any workspaces yet. Create one to get started.
          </p>
        <CreateWorkspace
          createWorkspace={createWorkspace}
        />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;