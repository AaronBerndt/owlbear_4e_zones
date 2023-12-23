import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface MutateProps {
  _id: string;
  combatantsInZoneToChange: any;
}

export default function useUpdateZone() {
  const createZone = (props: MutateProps) =>
    axios.post("http://localhost:3000/api/updateZone", props);

  return useMutation({
    mutationFn: createZone,
  });
}
