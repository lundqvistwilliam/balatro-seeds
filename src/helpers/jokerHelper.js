import supabase from "../../config/supabase_config";

export const getAllJokers = async () => {
  try {
    const { data, error } = await supabase
      .from('joker')
      .select('*');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};