import { workspaces } from "../../../migrations/schema";
import { Subscription, Workspace } from "./database.types";
import db from "./db";

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
