import { z } from 'zod';

const envMapping = {
  API_URL: 'VITE_API_URL',
} as const;
export const envSchema = z.object({
  API_URL: z.url('API_URL must be a valid URL'),
});
const parseEnv = () => {
  const rawEnv: Record<string, string | undefined> = {};
  for (const [cleanKey, viteKey] of Object.entries(envMapping)) {
    rawEnv[cleanKey] = import.meta.env[viteKey];
  }
  try {
    return envSchema.parse(rawEnv);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const env = parseEnv();
