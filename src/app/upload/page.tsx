'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitSeed } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WalletCardsIcon as Cards } from "lucide-react";
import Link from "next/link";
import { CardSelect } from "@/components/card-select";
import { useToast } from '@/hooks/use-toast';
import { Toaster } from "@/components/ui/toaster";



export default function Upload() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    seedCode: "",
    description: "",
    gameVersion: "",
    tags: [] as string[],
    selectedJokers: [] as any[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitSeed({
        seedCode: formData.seedCode,
        description: formData.description,
        gameVersion: formData.gameVersion,
        tags: formData.tags,
        jokers: formData.selectedJokers,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Success!",
        description: "Your seed has been shared with the community.",
      });

      // Redirect to home page after successful submission
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit seed. Please try again. Error: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJokersChange = (jokers: any[]) => {
    setFormData((prev) => ({ ...prev, selectedJokers: jokers }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Cards className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold">Balatro Seeds</h1>
          </Link>
        </div>
      </header>
      <main className="container py-8">
        <Card className="mx-auto max-w-2xl bg-zinc-950 border-zinc-900">
          <CardHeader>
            <CardTitle>Share a Seed</CardTitle>
            <CardDescription>Share an interesting seed you&apos;ve discovered with the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seed" className="text-zinc-400">
                  Seed Code
                </Label>
                <Input
                  id="seed"
                  placeholder="Seed, XXXXXXXX"
                  className="font-mono bg-zinc-900 border-zinc-800 text-zinc-400"
                  value={formData.seedCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, seedCode: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-400">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what makes this seed interesting..."
                  className="bg-zinc-900 border-zinc-800 text-zinc-400"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-400">Jokers</Label>
                <CardSelect onSelectedJokersChange={handleJokersChange} selectedJokers={formData.selectedJokers} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="version" className="text-zinc-400">
                    Game Version
                  </Label>
                  <Select
                    value={formData.gameVersion}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, gameVersion: value }))}
                    required
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-400">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0.0">1.0.0</SelectItem>
                      <SelectItem value="1.0.1">1.0.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-zinc-400">
                    Tags
                  </Label>
                  <Select
                    value={formData.tags[0]}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, tags: [value] }))}
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-400">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jokers">Jokers</SelectItem>
                      <SelectItem value="planet">Planet</SelectItem>
                      <SelectItem value="celestial">Celestial</SelectItem>
                      <SelectItem value="gold-seal">Gold Seal</SelectItem>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600" disabled={isSubmitting}>
                {isSubmitting ? "Sharing..." : "Share Seed"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t border-white/10">
        <div className="container py-6 text-center text-sm text-zinc-500">
          This is a fan-made site. Not affiliated with Balatro or LocalThunk.
        </div>
      </footer>
      <Toaster />
    </div >
  );
}

