import supabase from "../../config/supabase_config";

export const getAllSeeds = async () => {
  try {
    const { data, error } = await supabase
      .from('seeds')
      .select(`
        *,
        seed_jokers (*)
      `);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSeedsWithJokers = async () => {
  try {
    const { data, error } = await supabase
      .from('seeds')
      .select(`
        *,
        seed_jokers (
          *,
          joker (
            id,
            name
          )
        )
      `);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
