"use client";
import { AuthUser } from "@supabase/supabase-js";
import { Subscription, Workspace } from "@/lib/supabase/database.types";
import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useToast } from "@/components/ui/use-toast";
import {
  getDefaultWorkspace,
  getUserSubscriptionStatus,
} from "@/lib/server-actions/workspace-actions";
import { useSupabaseUser } from "./user-provider";

type WorkspaceCotextType = {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace) => void;
};

const WorkspaceContext = createContext<WorkspaceCotextType>({
  setWorkspace: () => {},
  workspace: null,
});

export const useWorkspace = () => {
  return useContext(WorkspaceContext);
};

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
}) => {
  const { toast } = useToast();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ANON_KEY,
  });


  useEffect(() => {

    async function getWorkspace() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const workspaces = await supabase.from('workspaces').select('*').eq('workspace_owner', user.id)
      if(!workspaces.data) return;
      
      setWorkspace(workspaces.data[0]);
    }
    getWorkspace();
  }, [supabase , toast]);
  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
