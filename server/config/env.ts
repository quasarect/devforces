import { config } from 'dotenv';
import { z } from 'zod'

config();

const environmentSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']).default('production'),
  PORT: z.number({ coerce: true }).default(3000),
  MONGODB_URI: z.string(),
})

export default environmentSchema.parse(process.env)

