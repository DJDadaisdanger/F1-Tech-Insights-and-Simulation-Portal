
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, BrainCircuit, Newspaper, Wind } from "lucide-react";

const features = [
  {
    id: "feature-prediction",
    title: "AI Predictions",
    description: "Leverage machine learning to predict race outcomes with stunning accuracy.",
    href: "/prediction",
    icon: BrainCircuit,
  },
  {
    id: "feature-blog",
    title: "Blog",
    description: "Read the latest analysis, strategies, and engineering deep-dives from F1 experts.",
    href: "/blog",
    icon: Newspaper,
  },
  {
    id: "feature-simulation",
    title: "Aero Simulations",
    description: "Interact with a 3D model and visualize airflow dynamics in real-time.",
    href: "/simulation",
    icon: Wind,
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-f1-car');

  return (
    <div className="flex flex-col gap-8">
      <section className="relative w-full h-[50vh] rounded-lg overflow-hidden -m-4 md:-m-8">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-end text-center p-8 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-primary drop-shadow-lg">
            The Ultimate F1 Technical Edge
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
            Dive deep into the world of Formula 1 with AI-powered predictions, interactive simulations, and expert blog content.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <Link href="/blog">
              Read the Blog <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const featureImage = PlaceHolderImages.find(p => p.id === feature.id);
            return (
              <Card key={feature.id} className="flex flex-col hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10 text-primary">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {featureImage && (
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                      <Image
                        src={featureImage.imageUrl}
                        alt={featureImage.description}
                        data-ai-hint={featureImage.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={feature.href}>
                      Go to {feature.title} <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
