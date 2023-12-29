import NovelEditor from "@/components/editor";
import Logout from "@/components/logout";
import { UserNav } from "@/components/user-nav";
import TeamSwitcher from "@/components/workspace-switcher";
import { getCurrentUserAction } from "@/lib/server-actions/auth-actions";
import {
  createWorkspace,
  getAllWorkspaces,
  getUserWorkspaces,
} from "@/lib/server-actions/workspace-actions";
import { Workspace } from "@/lib/supabase/database.types";
import React from "react";

const WorkspacePage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  // const { data, error } = await getAllWorkspaces();
  //get current user
  const { data, error } = await getCurrentUserAction();
  console.log(data);
  if (error)
    return (
      <div>Something went wrong while fetching your user. Please try again</div>
    );

  // console.log(currentUser);
  //get user workspaces
  const userId = data.user.id;

  const { data: workspaces, error: workspaceError } = await getUserWorkspaces(
    userId
  );

  if (workspaceError) {
    return (
      <div>
        Something went wrong while fetching your workspaces. Please try again
      </div>
    );
  }

  console.log(workspaces);

  // Check the type of workspaces and update it if necessary
  // Example: const workspaces: InferSelectModel<...> = ...
  const userWorkspaces = workspaces as Workspace[];
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b border-slate-500">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher
            workspaces={userWorkspaces}
            createWorkspace={createWorkspace}
          />
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
