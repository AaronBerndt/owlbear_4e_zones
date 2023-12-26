import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface MutateProps {
  _id: string;
  combatantsInZoneToChange: any;
}

export default function useUpdateZone() {
  const createZone = (props: MutateProps) =>
    axios.post("https://4e-pwa.vercel.app/api/updateZone", props);

  return useMutation({
    mutationFn: createZone,
  });
}
