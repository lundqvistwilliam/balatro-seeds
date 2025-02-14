import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WalletCardsIcon as Cards } from "lucide-react";
import Link from "next/link";

export default function Upload() {
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
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seed">Seed Code</Label>
                <Input id="seed" placeholder="BALT-XXXX-YYYY-ZZZZ" className="font-mono bg-zinc-900 border-zinc-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what makes this seed interesting..."
                  className="bg-zinc-900 border-zinc-800"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="version">Game Version</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0.0">1.0.0</SelectItem>
                      <SelectItem value="1.0.1">1.0.1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Select>
                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
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
              <Button type="submit" className="w-full bg-red-500 text-white hover:bg-red-600">
                Share Seed
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
    </div>
  );
}

