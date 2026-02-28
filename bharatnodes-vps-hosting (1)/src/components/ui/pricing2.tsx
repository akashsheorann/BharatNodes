"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Switch } from "@/src/components/ui/switch";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing2 = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",
  plans = [
    {
      id: "plus",
      name: "Plus",
      description: "For personal use",
      monthlyPrice: "$19",
      yearlyPrice: "$15",
      features: [
        { text: "Up to 5 team members" },
        { text: "Basic components library" },
        { text: "Community support" },
        { text: "1GB storage space" },
      ],
      button: {
        text: "Purchase",
        url: "https://www.shadcnblocks.com",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals",
      monthlyPrice: "$49",
      yearlyPrice: "$35",
      features: [
        { text: "Unlimited team members" },
        { text: "Advanced components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
        url: "https://www.shadcnblocks.com",
      },
    },
  ],
}: Pricing2Props) => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl text-white">
            {heading}
          </h2>
          <p className="text-zinc-400 lg:text-xl">{description}</p>
          <div className="flex items-center gap-3 text-lg text-white">
            <span 
              className={`transition-opacity cursor-pointer ${!isYearly ? "opacity-100 font-medium" : "opacity-50"}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            <span 
              className={`transition-opacity cursor-pointer ${isYearly ? "opacity-100 font-medium" : "opacity-50"}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
            </span>
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row justify-center w-full">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex w-full md:w-80 flex-col justify-between text-left bg-zinc-900/50 border-zinc-800 backdrop-blur-sm text-white"
              >
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-zinc-400">
                    {plan.description}
                  </p>
                  <span className="text-4xl font-bold mt-2 block">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-sm font-normal text-zinc-500 ml-1">
                      / {isYearly ? "year" : "month"}
                    </span>
                  </span>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6 bg-zinc-800" />
                  {plan.id === "pro" && (
                    <p className="mb-3 font-semibold text-zinc-200">
                      Everything in Plus, and:
                    </p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-zinc-300">
                        <CircleCheck className="size-4 text-emerald-500" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full bg-white text-black hover:bg-zinc-200">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };
