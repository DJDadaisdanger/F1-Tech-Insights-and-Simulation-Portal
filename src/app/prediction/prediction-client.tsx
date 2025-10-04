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
import { Loader2, Trophy, Zap, Users, WandSparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const predictionSchema = z.object({
  historicalData: z.string().min(10, 'Please provide more detailed historical data.'),
  carSpecifications: z.string().min(10, 'Please provide more detailed car specifications.'),
  trackConditions: z.string().min(10, 'Please provide more detailed track conditions.'),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

const samplePrompts: PredictionFormValues[] = [
  {
    historicalData:
      'In recent races at Silverstone, Mercedes has shown strong performance due to the track\'s high-speed corners. Max Verstappen has won 2 of the last 3 races here.',
    carSpecifications:
      'Ferrari is introducing a new front wing design for better aerodynamic balance. Red Bull Racing has a power unit upgrade, expected to boost top speed on the straights.',
    trackConditions:
      'Dry conditions expected for the race. Air temperature at 22°C, track temperature around 35°C. Medium to high tire degradation is anticipated.',
  },
  {
    historicalData:
      "Monaco is a circuit where qualifying position is king. Overtaking is notoriously difficult. Charles Leclerc has secured pole position in the last two events here but has had bad luck in the races. Red Bull has a strong record of converting good grid positions into wins.",
    carSpecifications:
      "The McLaren has shown exceptional agility in slow-speed corners this season. Mercedes is bringing a shorter wheelbase car which should excel here. Maximum downforce packages will be used by all teams.",
    trackConditions:
      "Classic sunny Monaco weather. Track temperature will be high, leading to thermal degradation. The track surface is smooth, so tire wear is less of a concern than managing temperature.",
  },
  {
    historicalData:
      "Spa-Francorchamps is a circuit that rewards bravery and power. Rain is a common feature and often shuffles the pack. Last year's race saw a surprise winner from the midfield after a late-race downpour.",
    carSpecifications:
      "The Williams car has a very efficient low-drag setup, making it incredibly fast on the straights. The Aston Martin has struggled with tire warm-up in cool conditions.",
    trackConditions:
      "High chance of rain (80%) for the race. The temperature is cool, around 15°C. If it rains, the track will be treacherous, especially through Eau Rouge and Raidillon. Visibility will be poor.",
  },
];


export function PredictionClient() {
  const [prediction, setPrediction] = useState<PredictRaceOutcomeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: samplePrompts[0],
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

  const loadSample = (sample: PredictionFormValues) => {
    form.reset(sample);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Race Prediction</CardTitle>
          <CardDescription>Fill in the details below to get an AI-powered race outcome prediction, or load a sample scenario.</CardDescription>
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

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center"><WandSparkles className="mr-2 h-4 w-4" /> Sample Scenarios</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Button type="button" variant="outline" onClick={() => loadSample(samplePrompts[0])}>Silverstone</Button>
                  <Button type="button" variant="outline" onClick={() => loadSample(samplePrompts[1])}>Monaco</Button>
                  <Button type="button" variant="outline" onClick={() => loadSample(samplePrompts[2])}>Wet Spa</Button>
                </div>
              </div>
              
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
