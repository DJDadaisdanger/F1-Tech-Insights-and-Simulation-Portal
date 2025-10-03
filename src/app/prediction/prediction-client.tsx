'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { predictRaceOutcome, type PredictRaceOutcomeOutput } from '@/ai/flows/predict-race-outcome';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trophy, Zap, Users } from 'lucide-react';

const predictionSchema = z.object({
  historicalData: z.string().min(10, 'Please provide more detailed historical data.'),
  carSpecifications: z.string().min(10, 'Please provide more detailed car specifications.'),
  trackConditions: z.string().min(10, 'Please provide more detailed track conditions.'),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

export function PredictionClient() {
  const [prediction, setPrediction] = useState<PredictRaceOutcomeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      historicalData: 'Past 5 races at this track show a clear advantage for cars with high straight-line speed. Red team has won 3 of the last 5.',
      carSpecifications: 'Blue team has a new engine upgrade, improving power output by 3%. Red team is running a lower-drag aerodynamic package.',
      trackConditions: 'Dry, sunny, 28°C air temp, 45°C track temp. Low probability of rain.',
    },
  });

  async function onSubmit(data: PredictionFormValues) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictRaceOutcome(data);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate prediction. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Race Prediction</CardTitle>
          <CardDescription>Fill in the details below to get an AI-powered race outcome prediction.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Past race results, team performance..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carSpecifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Specifications</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Engine updates, aero packages..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trackConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Weather, temperature, tarmac details..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full font-bold">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                Predict Outcome
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="sticky top-24">
        {isLoading && (
          <Card className="flex flex-col items-center justify-center p-10 border-dashed">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold">Generating Prediction...</p>
            <p className="text-muted-foreground">The AI is analyzing the data.</p>
          </Card>
        )}
        {prediction && (
          <Card className="animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="font-headline text-primary">Prediction Results</CardTitle>
              <CardDescription>Based on the provided data, here is the AI's prediction.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="flex items-center font-semibold"><Trophy className="mr-2 h-5 w-5 text-amber-400" /> Predicted Winner</h3>
                <p className="text-2xl font-bold font-headline">{prediction.predictedWinner}</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="flex items-center font-semibold"><Users className="mr-2 h-5 w-5 text-muted-foreground" /> Top Three Finishers</h3>
                <ol className="list-decimal list-inside space-y-1 pl-2">
                  {prediction.topThree.map((driver, index) => (
                    <li key={index} className="text-lg">{driver}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center font-semibold"><Zap className="mr-2 h-5 w-5 text-accent" /> Key Factors</h3>
                <p className="text-muted-foreground">{prediction.keyFactors}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
