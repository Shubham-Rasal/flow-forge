import { drizzle } from "drizzle-orm/postgres-js";

import postcss from "postcss";
import * as schema from "../../../migrations/schema";
import * as dotenv from "dotenv";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({
  path: ".env",
});

//check for db url in env
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  throw new Error("DB_URL env variable not found");
}

const client = postgres(dbUrl);
const db = drizzle(client, { schema });

//migrations
const migrateDB = async () => {
  try {
    console.log("Migrating DB");
    await migrate(db, { migrationsFolder: "./migrations" });
    console.log("Migration complete");
  } catch (error) {
    console.error("Error migrating DB", error);
  }
};

export default db;
