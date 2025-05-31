import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'https://api.hackathon-fiipractic.octavianregatun.com/v3/api-docs',
    output: {
      mode: 'tags-split',
      target: './src/generated-api',
      schemas: './src/generated-api/schemas',
    },
  },
});
