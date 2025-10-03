'use server';

/**
 * @fileOverview Generates a race strategy based on car specifications, track conditions, and desired risk level.
 *
 * - generateStartingStrategy - A function that generates a race strategy.
 * - GenerateStartingStrategyInput - The input type for the generateStartingStrategy function.
 * - GenerateStartingStrategyOutput - The return type for the generateStartingStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStartingStrategyInputSchema = z.object({
  carSpecifications: z
    .string()
    .describe('Specifications of the car, including engine, aerodynamics, and weight.'),
  trackConditions: z
    .string()
    .describe('Conditions of the track, including temperature, humidity, and tire degradation.'),
  riskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The desired risk level for the race strategy.'),
});
export type GenerateStartingStrategyInput = z.infer<typeof GenerateStartingStrategyInputSchema>;

const GenerateStartingStrategyOutputSchema = z.object({
  strategy: z.string().describe('The generated race strategy, including pit stop timing, tire choices, and fuel management.'),
});
export type GenerateStartingStrategyOutput = z.infer<typeof GenerateStartingStrategyOutputSchema>;

export async function generateStartingStrategy(
  input: GenerateStartingStrategyInput
): Promise<GenerateStartingStrategyOutput> {
  return generateStartingStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStartingStrategyPrompt',
  input: {schema: GenerateStartingStrategyInputSchema},
  output: {schema: GenerateStartingStrategyOutputSchema},
  prompt: `You are an expert race strategist who knows how to create the optimal race strategy based on the car specifications, track conditions, and desired risk level.

Car Specifications: {{{carSpecifications}}}
Track Conditions: {{{trackConditions}}}
Risk Level: {{{riskLevel}}}

Based on the information above, generate a race strategy that includes pit stop timing, tire choices, and fuel management. Consider the risk level when generating the strategy, where a low risk strategy should be conservative, and a high risk strategy should be aggressive.`,
});

const generateStartingStrategyFlow = ai.defineFlow(
  {
    name: 'generateStartingStrategyFlow',
    inputSchema: GenerateStartingStrategyInputSchema,
    outputSchema: GenerateStartingStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
