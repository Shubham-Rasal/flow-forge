"use server";
import { workspaces } from "../../../migrations/schema";
import { Subscription, Workspace } from "../supabase/database.types";
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

//get user workspaces
export const getUserWorkspaces = async (userId: string) => {
  try {
    const data = await db.query.workspaces.findMany({
      where: ({ workspaceOwner }: any, { eq }: any) => eq(workspaceOwner, userId),
    });
    return { data: data as Workspace[], error: null };
  } catch (error) {
    return { data: [], error: error };
  }
};

//get all collaborators
export const getAllCollaborators = async () => {
  try {
    const data = await db.query.collaborators.findMany();
    return { data: data, error: null };
  } catch (error) {
    return { data: [], error: error };
  }
};

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: ({ id }: any, { eq }: any) => eq(id, userId),
    });

    if (data) return { data: data as Subscription, error: null };

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

//get default workspace
export const getDefaultWorkspace = async (userId: string) => {
  try {
    const data = await db.query.workspaces.findFirst({
      where: ({ user_id }: any, { eq }: any) => eq(user_id, userId),
    });
    return { data: data as Workspace, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
