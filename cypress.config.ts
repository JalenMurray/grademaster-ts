import { defineConfig } from 'cypress';
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

export default defineConfig({
  projectId: 'vmbuen',
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
