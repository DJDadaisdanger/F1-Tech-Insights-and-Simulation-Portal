import { config } from 'dotenv';
config();

import '@/ai/flows/predict-race-outcome.ts';
import '@/ai/flows/summarize-race-telemetry.ts';
import '@/ai/flows/generate-starting-strategy.ts';