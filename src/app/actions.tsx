"use server";

import supabase from '../../config/supabase_config';
import { revalidatePath } from "next/cache";

type SubmitSeedParams = {
  seedCode: string;
  description: string;
  gameVersion: string;
  tags: string[];
  jokers: {
    id: string;
    joker_number: number;
  }[];
};

export async function submitSeed({ seedCode, description, gameVersion, tags, jokers }: SubmitSeedParams) {
  try {
    // Insert the seed
    const { data: seed, error: seedError } = await supabase
      .from("seeds")
      .insert([
        {
          seed_code: seedCode,
          description,
          game_version: gameVersion,
          tags,
        },
      ])
      .select()
      .single();

    if (seedError) {
      console.log("seedError", seedError);
      throw seedError;
    }

    // Insert the joker relationships
    if (jokers.length > 0) {
      console.log("try to insert jokers", jokers);
      const { error: jokersError } = await supabase.from("seed_jokers").insert(
        jokers.map((joker) => ({
          seed_id: seed.id,
          joker_number: joker.joker_number,
          joker: joker.id,
        })),
      );

      if (jokersError) {
        console.log("jokersError", jokersError);
        throw jokersError;
      }

    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {

    console.error("Error submitting seed:", error);
    return { error: "Failed to submit seed" };
  }
}

