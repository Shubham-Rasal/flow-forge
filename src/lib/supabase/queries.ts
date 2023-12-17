import { workspaces } from "../../../migrations/schema";
import { Subscription, Workspace } from "./database.types";
import db from "./db";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });

    if (data) return { data: data as Subscription, error: null };

    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: error};
  }
};


export const createWorkspace = async (workspace: Workspace) => {
    try {
      const response = await db.insert(workspaces).values(workspace);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: 'Error' };
    }
  };