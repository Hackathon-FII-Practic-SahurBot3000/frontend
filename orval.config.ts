import { defineConfig } from "orval";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export default defineConfig({
  api: {
    input: `${process.env.NEXT_PUBLIC_API_URL}/v3/api-docs`,
    output: {
      client: "react-query",
      mode: "tags-split",
      target: "./src/generated-api",
      schemas: "./src/generated-api/schemas",
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  },
});
