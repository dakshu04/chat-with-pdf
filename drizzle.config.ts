import { defineConfig, Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the .env file');
}

const config: Config = {
  dialect: 'postgresql',
  schema: './src/lib/db/schema.ts', // Adjust path as per your project structure
  out: './drizzle', // Folder for migrations
  dbCredentials: {
    url: databaseUrl,
  },
};

export default defineConfig(config);
