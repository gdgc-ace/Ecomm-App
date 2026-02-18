import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env") });

const dbType = process.env.DATABASE_TYPE || "sqlite";

let dbUrl: string;
if (dbType === "sqlite") {
  dbUrl = "file:./dev.db";
} else {
  dbUrl = process.env.DATABASE_URL || "";
}

const schemaFile = "prisma/schema.prisma";

export default defineConfig({
  schema: schemaFile,
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: dbUrl,
  },
});
