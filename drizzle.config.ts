import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

//check for db url in env
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  throw new Error("DB_URL env variable not found");
}

export default {
    schema : './src/lib/supabase/schema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: dbUrl,
    
    }

} satisfies Config;