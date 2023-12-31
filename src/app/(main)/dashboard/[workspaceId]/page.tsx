import NovelEditor from "@/components/editor";
import Logout from "@/components/logout";
import TurboBuilder from "@/components/turbo/builder";
import { UserNav } from "@/components/user-nav";
import TeamSwitcher from "@/components/workspace-switcher";
import { getCurrentUserAction } from "@/lib/server-actions/auth-actions";
import {
  createWorkspace,
  getAllWorkspaces,
  getUserWorkspaces,
} from "@/lib/server-actions/workspace-actions";
import { Workspace } from "@/lib/supabase/database.types";
import { Search } from "lucide-react";
import React from "react";

const WorkspacePage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const { data, error } = await getCurrentUserAction();
  if (error) {
    console.log(error);
  }
  if (!data.user) {
    return <div>Loading...</div>;
  }

  const { data: workspaces, error: workspaceError } = await getUserWorkspaces(
    data.user.id
  );
  if (!workspaces) {
    return <div>Loading workspace...</div>;
  }

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b border-slate-500">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher
            workspaces={workspaces}
            createWorkspace={createWorkspace}
          />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
        <TurboBuilder />
    </div>
  );
};

export default WorkspacePage;
