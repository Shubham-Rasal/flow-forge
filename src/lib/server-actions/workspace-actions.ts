"use server";
import { workspaces } from "../../../migrations/schema";
import { Workspace } from "../supabase/database.types";
import db from "../supabase/db";

export const createWorkspace = async (workspace: Workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: response.count, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

//get all workspaces
export const getAllWorkspaces = async () => {
  try {
    const data = await db.query.workspaces.findMany();
    return { data: data as Workspace[], error: null };
  } catch (error) {
    return { data: [], error: error };
  }
};
