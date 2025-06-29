import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

config({ path: ".env" }); // or .env.local

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  max: 100,
});

const db = drizzle(client, { schema });
export { db };
