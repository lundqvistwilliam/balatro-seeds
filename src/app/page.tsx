'use client';

import { Seeds } from "@/components/seeds";
import { Button } from "@/components/ui/button";
import { WalletCardsIcon as Cards } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllJokers } from '@/helpers/jokerHelper';


export default function Home() {
  const [data, setData] = useState(null);

  async function fetchData() {
    const { data, error } = await getAllJokers();
    if (error) {
      console.error('Error fetching data:', error);
      return;
    }
    setData(data);
  }

  /*
  useEffect(() => {
    fetchData();
  }, []);
  */
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Cards className="h-6 w-6 text-red-500" />
            <Link href="/">
              <h1 className="text-2xl font-bold">Balatro Seeds</h1>
            </Link>
          </div>
          <nav>
            <Link href="/upload">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-950 hover:text-red-400">
                Upload
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold">Popular Seeds</h2>
          <p className="text-zinc-400">Browse and discover interesting Balatro seeds shared by the community.</p>
        </div>
        <Seeds />
      </main>
      <footer className="border-t border-white/10">
        <div className="container py-6 text-center text-sm text-zinc-500">
          This is a fan-made site. Not affiliated with Balatro or LocalThunk.
        </div>
      </footer>
    </div>
  );
}

