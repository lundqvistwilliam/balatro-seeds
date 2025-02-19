"use client";

import * as React from "react";
import { ArrowDownAZ, ArrowUpAZ, Hash, Search, X, ArrowDown10 } from "lucide-react";
import cn from "classnames";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllJokers } from "@/helpers/jokerHelper";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import vercel from '../../public/vercel.svg';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

type Joker = {
  id: string;
  joker_number: number;
  name: string;
  image: string;
  rarity: string;
};

type CardSelectProps = {
  onSelectedJokersChange: (jokers: Joker[]) => void;
  selectedJokers: Joker[];
};

type SortType = "id" | "id-desc" | "name-asc" | "name-desc";

const rarityColors = {
  Common: "#0391fa",
  Uncommon: "#36bd85",
  Rare: "#fe4b42",
  Legendary: "#ab5ab6"
};

export function CardSelect({ onSelectedJokersChange, selectedJokers }: CardSelectProps) {
  const [jokers, setJokers] = React.useState<Joker[]>([]);
  // const [selectedJokers, setSelectedJokers] = React.useState<Joker[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedRarities, setSelectedRarities] = React.useState<string[]>([]);
  const [sortType, setSortType] = React.useState<SortType>("id");

  React.useEffect(() => {
    async function fetchJokers() {
      try {
        const { data, error } = await getAllJokers();
        if (error) throw error;
        setJokers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jokers");
      } finally {
        setLoading(false);
      }
    }

    fetchJokers();
  }, []);

  const rarities = React.useMemo(() => Array.from(new Set(jokers.map((joker) => joker.rarity))), [jokers]);

  const filteredAndSortedJokers = React.useMemo(() => {
    const filtered = jokers.filter(
      (joker) =>
        joker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedRarities.length === 0 || selectedRarities.includes(joker.rarity)),
    );

    switch (sortType) {
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "id-desc":
        return filtered.sort((a, b) => b.joker_number - a.joker_number);
      case "id":
      default:
        return filtered.sort((a, b) => a.joker_number - b.joker_number);
    }
  }, [jokers, searchQuery, selectedRarities, sortType]);

  const toggleJoker = (joker: Joker) => {
    const newSelectedJokers = selectedJokers.some((j) => j.id === joker.id)
      ? selectedJokers.filter((j) => j.id !== joker.id)
      : [...selectedJokers, joker];
    onSelectedJokersChange(newSelectedJokers);
  };

  const removeJoker = (jokerId: string) => {
    const newSelectedJokers = selectedJokers.filter((j) => j.id !== jokerId);
    onSelectedJokersChange(newSelectedJokers);
  };

  const cycleSortType = () => {
    const sortCycle: SortType[] = ["id", "id-desc", "name-asc", "name-desc"];
    const currentIndex = sortCycle.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % sortCycle.length;
    setSortType(sortCycle[nextIndex]);
  };

  const getSortIcon = () => {
    switch (sortType) {
      case "name-asc":
        return <ArrowUpAZ className="h-4 w-4" />;
      case "name-desc":
        return <ArrowDownAZ className="h-4 w-4" />;
      case "id":
        return <Hash className="h-4 w-4" />;
      case "id-desc":
        return <ArrowDown10 className="h-4 w-4" />;
    }
  };

  const getSortTooltip = () => {
    switch (sortType) {
      case "name-asc":
        return "Sorted A to Z";
      case "name-desc":
        return "Sorted Z to A";
      case "id":
        return "Sorted by ID (Ascending)";
      case "id-desc":
        return "Sorted by ID (Descending)";
    }
  };

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
          >
            <span className="text-zinc-400">
              {selectedJokers.length === 0
                ? "Add Joker cards..."
                : `${selectedJokers.length} card${selectedJokers.length === 1 ? "" : "s"} selected`}
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px] bg-zinc-950 border-zinc-900" aria-describedby="Select notable cards">
          <DialogHeader>
            <DialogTitle className="text-white">Select Cards</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-zinc-900 border-zinc-800 text-zinc-400"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ToggleGroup
                type="multiple"
                value={selectedRarities}
                onValueChange={setSelectedRarities}
                className="flex-wrap justify-start"
              >
                {rarities.map((rarity) => (
                  <ToggleGroupItem
                    key={rarity}
                    value={rarity}
                    className="bg-white hover:bg-zinc-100 border-zinc-800 data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400"
                  >
                    {rarity}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <Button
                variant="outline"
                size="icon"
                onClick={cycleSortType}
                className="bg-white border-zinc-800 hover:bg-zinc-300"
                title={getSortTooltip()}
              >
                {getSortIcon()}
              </Button>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8 text-zinc-400">Loading cards...</div>
          ) : error ? (
            <div className="flex items-center justify-center py-8 text-red-400">{error}</div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-4">
                {filteredAndSortedJokers.map((joker) => (
                  <div key={joker.id} className="group relative cursor-pointer" onClick={() => toggleJoker(joker)}>
                    <div
                      className={cn(
                        "relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-colors",
                        selectedJokers.some((j) => j.id === joker.id)
                          ? "border-red-500"
                          : "border-transparent hover:border-zinc-700",
                      )}
                    >
                      <img
                        src={joker.image && joker.image !== "" ? joker.image : vercel.src}
                        alt={joker.name || "Joker card"}
                        className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Checkbox
                          checked={selectedJokers.some((j) => j.id === joker.id)}
                          className="h-6 w-6 border-2"
                        />
                      </div>
                      <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-xs font-mono text-zinc-300">
                        #{joker.joker_number}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium text-zinc-200">{joker.name}</div>
                      <div className="text-zinc-500" style={{ color: rarityColors[joker.rarity] }}>{joker.rarity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          <DialogFooter className="flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <div className="flex flex-wrap gap-2 pb-4 sm:pb-0">
              {selectedJokers.map((joker) => (
                <Badge key={joker.id} variant="outline" className="gap-1 border-zinc-800 text-zinc-400">
                  {joker.name}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeJoker(joker.id);
                    }}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-3 w-3 text-zinc-500 hover:text-zinc-300" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedJokers([])} className="border-zinc-800">
                Clear
              </Button>
              <Button onClick={() => setOpen(false)} className="bg-red-500 text-white hover:bg-red-600">
                Done
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {selectedJokers.map((joker) => (
            <CarouselItem key={joker.id} className="md:basis-1/4 lg:basis-1/4">
              <div className="p-1">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="flex flex-col items-center justify-center p-1 aspect-square relative overflow-hidden">
                    <div className="w-2/3 h-2/3 mb-7">
                      <img
                        src={joker.image || "/placeholder.svg"}
                        alt={`Joker ${joker.name}`}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/90 via-black/80 to-transparent">
                      <span className="text-sm font-semibold text-zinc-200 text-center block">{joker.name}</span>
                      <span
                        className="text-xs text-center block"
                        style={{ color: rarityColors[joker.rarity] }}
                      >
                        {joker.rarity}
                      </span>                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeJoker(joker.id);
                      }}
                      className="absolute top-2 right-2 rounded-full p-1 bg-black/40 hover:bg-black/60 transition-colors"
                    >
                      <X className="h-4 w-4 text-zinc-400 hover:text-zinc-200" />
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {selectedJokers.length > 0 && (
          <>
            <CarouselPrevious className="bg-zinc-700 border-zinc-800 hover:bg-zinc-800" />
            <CarouselNext className="bg-zinc-700 border-zinc-800 hover:bg-zinc-800" />
          </>
        )}
      </Carousel>
    </div>
  );
}

