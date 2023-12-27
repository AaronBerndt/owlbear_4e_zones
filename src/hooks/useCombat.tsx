import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const KEY = "Fetch Combats";
export const FETCH_COMBAT_KEY = "Fetch Combat";

export function useCombat(combatId?: string) {
  const fetchCombat = () =>
    axios.get(`https://4e-pwa.vercel.app/api/combats?_id=${combatId}`);
  return useQuery({
    queryKey: [FETCH_COMBAT_KEY, combatId],
    queryFn: fetchCombat,
    select: ({ data }) => data,
  });
}
