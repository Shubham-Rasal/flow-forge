import NovelEditor from "@/components/editor";
import Logout from "@/components/logout";
import TeamSwitcher from "@/components/workspace-switcher";
import {
  createWorkspace,
  getAllWorkspaces,
} from "@/lib/server-actions/workspace-actions";
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
  return (
    <div className="flex flex-row max-h-screen">
      <div className="sidebar flex flex-col b-2 border border-teal-500">
        <TeamSwitcher
          workspaces={workspaces}
          createWorkspace={createWorkspace}
        />
        <Logout />
      </div>
      <div className="workspace flex-1">
       <NovelEditor />
      </div>
    </div>
  );
};

export default WorkspacePage;
