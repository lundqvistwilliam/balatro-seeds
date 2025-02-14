"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ThumbsUp } from "lucide-react";
import { useState } from "react";

// Temporary data
const seedsData = [
  {
    id: 1,
    code: "BALT-XXXX-YYYY-ZZZZ",
    description: "Great starting hand with multiple Jokers. Perfect for Steel stake runs.",
    rating: 42,
    version: "1.0.0",
    tags: ["Steel Stake", "Jokers", "Easy"],
    createdAt: "2024-02-14",
  },
  {
    id: 2,
    code: "BALT-AAAA-BBBB-CCCC",
    description: "Incredible Planet seed with early Meteor card. Guaranteed Celestial pack by round 3.",
    rating: 89,
    version: "1.0.0",
    tags: ["Planet", "Celestial", "Challenge"],
    createdAt: "2024-02-14",
  },
  {
    id: 3,
    code: "BALT-DDDD-EEEE-FFFF",
    description: "Multiple Gold Seals in shop. Great for achievement hunting.",
    rating: 65,
    version: "1.0.0",
    tags: ["Gold Seal", "Achievements", "Shop"],
    createdAt: "2024-02-14",
  },
];

export function Seeds() {
  const [seeds, setSeeds] = useState(seedsData);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleLike = (id: number) => {
    setSeeds(seeds.map((seed) => (seed.id === id ? { ...seed, rating: seed.rating + 1 } : seed)));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {seeds.map((seed) => (
        <Card key={seed.id} className="bg-zinc-950 border-zinc-900">
          <CardHeader>
            <CardTitle className="font-mono text-red-500">{seed.code}</CardTitle>
            <CardDescription className="text-zinc-400">
              Version {seed.version} • {seed.createdAt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">{seed.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {seed.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-red-500/50 text-red-400">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-red-400"
              onClick={() => handleLike(seed.id)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {seed.rating}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-red-400"
              onClick={() => handleCopy(seed.code)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Seed
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

