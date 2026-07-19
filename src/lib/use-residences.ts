import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RESIDENCES, type Availability, type Residence } from "@/lib/residences";

type Row = { code: string; availability: Availability };

async function fetchAvailability(): Promise<Record<string, Availability>> {
  const { data, error } = await supabase
    .from("residence_availability")
    .select("code, availability");
  if (error) throw error;
  const map: Record<string, Availability> = {};
  for (const row of (data ?? []) as Row[]) map[row.code] = row.availability;
  return map;
}

export function useResidences(): Residence[] {
  const { data } = useQuery({
    queryKey: ["residence-availability"],
    queryFn: fetchAvailability,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
  if (!data) return RESIDENCES;
  return RESIDENCES.map((r) => ({ ...r, availability: data[r.code] ?? r.availability }));
}
