'use server';

/**
 * @fileOverview AI-driven race outcome prediction flow.
 *
 * - predictRaceOutcome - A function that predicts race outcomes based on historical data, car specs, and track conditions.
 * - PredictRaceOutcomeInput - The input type for the predictRaceOutcome function.
 * - PredictRaceOutcomeOutput - The return type for the predictRaceOutcome function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRaceOutcomeInputSchema = z.object({
  historicalData: z.string().describe('Historical race data including past results and car performance.'),
  carSpecifications: z.string().describe('Current car specifications including engine, aerodynamics, and weight.'),
  trackConditions: z.string().describe('Track conditions including temperature, humidity, and tire wear.'),
});
export type PredictRaceOutcomeInput = z.infer<typeof PredictRaceOutcomeInputSchema>;

const PredictRaceOutcomeOutputSchema = z.object({
  predictedWinner: z.string().describe('The predicted winner of the race.'),
  topThree: z.array(z.string()).describe('The predicted top three finishers of the race.'),
  keyFactors: z.string().describe('Key factors influencing the race outcome.'),
});
export type PredictRaceOutcomeOutput = z.infer<typeof PredictRaceOutcomeOutputSchema>;

export async function predictRaceOutcome(input: PredictRaceOutcomeInput): Promise<PredictRaceOutcomeOutput> {
  return predictRaceOutcomeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRaceOutcomePrompt',
  input: {schema: PredictRaceOutcomeInputSchema},
  output: {schema: PredictRaceOutcomeOutputSchema},
  prompt: `You are an AI expert in Formula 1 racing, specializing in predicting race outcomes.

  Based on the historical data, car specifications, and track conditions provided, predict the race outcome, 
  including the winner, top three finishers, and key influencing factors.

  Historical Data: {{{historicalData}}}
  Car Specifications: {{{carSpecifications}}}
  Track Conditions: {{{trackConditions}}}

  Ensure that the predictedWinner field contains the name of the predicted winner.
  Ensure that the topThree field contains an array of the top three finishers.
  Ensure that the keyFactors field contains the key factors that influenced the outcome.
  `,
});

const predictRaceOutcomeFlow = ai.defineFlow(
  {
    name: 'predictRaceOutcomeFlow',
    inputSchema: PredictRaceOutcomeInputSchema,
    outputSchema: PredictRaceOutcomeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
