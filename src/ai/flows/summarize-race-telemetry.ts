// SummarizeRaceTelemetry
'use server';
/**
 * @fileOverview A race telemetry summarization AI agent.
 *
 * - summarizeRaceTelemetry - A function that handles the race telemetry summarization process.
 * - SummarizeRaceTelemetryInput - The input type for the summarizeRaceTelemetry function.
 * - SummarizeRaceTelemetryOutput - The return type for the summarizeRaceTelemetry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRaceTelemetryInputSchema = z.object({
  telemetryData: z
    .string()
    .describe(
      'Race telemetry data, in a format such as CSV or JSON.  Include all relevant data such as speed, acceleration, braking, and lap times.'
    ),
  carSetup: z.string().describe('Description of the car setup used during the race.'),
  drivingStyle: z.string().describe('Description of the driving style used during the race.'),
});
export type SummarizeRaceTelemetryInput = z.infer<typeof SummarizeRaceTelemetryInputSchema>;

const SummarizeRaceTelemetryOutputSchema = z.object({
  summary: z.string().describe('A summary of key performance metrics from the race telemetry data.'),
  improvementAreas: z
    .string()
    .describe('Identified areas for improvement in car setup or driving style.'),
  potentialIssues: z
    .string()
    .describe('Potential mechanical issues identified from the race telemetry data.'),
});
export type SummarizeRaceTelemetryOutput = z.infer<typeof SummarizeRaceTelemetryOutputSchema>;

export async function summarizeRaceTelemetry(input: SummarizeRaceTelemetryInput): Promise<SummarizeRaceTelemetryOutput> {
  return summarizeRaceTelemetryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRaceTelemetryPrompt',
  input: {schema: SummarizeRaceTelemetryInputSchema},
  output: {schema: SummarizeRaceTelemetryOutputSchema},
  prompt: `You are an expert race engineer, skilled at analyzing race telemetry data to improve performance.

  Analyze the provided race telemetry data, car setup, and driving style to identify key performance metrics, areas for improvement, and potential mechanical issues.

  Telemetry Data: {{{telemetryData}}}
  Car Setup: {{{carSetup}}}
  Driving Style: {{{drivingStyle}}}

  Provide a summary of key performance metrics, highlight areas for improvement in car setup or driving style, and identify potential mechanical issues based on the telemetry data.
  Follow the schema and ensure that the response can be parsed by JSON.parse.
  `,
});

const summarizeRaceTelemetryFlow = ai.defineFlow(
  {
    name: 'summarizeRaceTelemetryFlow',
    inputSchema: SummarizeRaceTelemetryInputSchema,
    outputSchema: SummarizeRaceTelemetryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
