"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllSeeds, getSeedsWithJokers } from "@/helpers/seedHelper";
import { Copy, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTimestamp } from "@/lib/utils";

// Temporary data
// first one is an actual code of mine
const seedsData = [
  {
    id: 1,
    code: "LABBEPM9",
    description: "Mime PhotoChad combo with great extra jokers",
    rating: 42,
    version: "1.0.0",
    tags: ["Legendary", "Baron"],
    createdAt: "2024-02-14",
  },
  {
    id: 2,
    code: "62CUB91A",
    description: "Chad + S&B by round 3. Mime, Hologram, Photograph, Steel Joker",
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
  const [newSeeds, setNewSeeds] = useState([]);

  async function fetchData() {
    const { data, error } = await getSeedsWithJokers();
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }
    setNewSeeds(data);
    console.log("seeds data", data);
  }


  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleLike = (id: number) => {
    setSeeds(seeds.map((seed) => (seed.id === id ? { ...seed, rating: seed.rating + 1 } : seed)));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newSeeds.map((seed) => (
        <Card key={seed.id} className="bg-zinc-950 border-zinc-900">
          <CardHeader>
            <CardTitle className="font-mono text-red-500">{seed.seed_code}</CardTitle>
            <CardDescription className="text-zinc-400">
              Uploaded {formatTimestamp(seed.created_at)} by W
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">{seed.description}</p>
            <p className="text-zinc-300">Jokers: {seed.seed_jokers.map((joker) => joker.joker.name).join(", ")}</p>
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
              {seed.rating ?? 0}
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
      {/*  
      {seeds.map((seed) => (
        <Card key={seed.id} className="bg-zinc-950 border-zinc-900">
          <CardHeader>
            <CardTitle className="font-mono text-red-500">{seed.code}</CardTitle>
            <CardDescription className="text-zinc-400">
              Uploaded {seed.createdAt} by W
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
        */}
    </div>
  );
}

