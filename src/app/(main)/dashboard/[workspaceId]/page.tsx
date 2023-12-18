import TeamSwitcher from "@/components/workspace-switcher";
import { getAllWorkspaces } from "@/lib/server-actions/workspace-actions";
import { Workspace } from "@/lib/supabase/database.types";
import React from "react";

const WorkspacePage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const { data, error } = await getAllWorkspaces();
  if (error)
    return (
      <div>
        Something went wrong while fetching your workspaces. Please try again
      </div>
    );

//   console.log(data);

  // Check the type of workspaces and update it if necessary
  // Example: const workspaces: InferSelectModel<...> = ...
  const workspaces: Workspace[] = data;
//   console.log(workspaces);

  return (
    <div className="flex flex-row h-screen">
      <div className="sidebar flex flex-col b-2 border border-teal-500">
        <TeamSwitcher workspaces={workspaces} />
      </div>
      <div className="workspace flex-1">WorkspacePage {params.workspaceId}</div>
    </div>
  );
};

export default WorkspacePage;
