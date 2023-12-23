import OBR, { buildShape } from "@owlbear-rodeo/sdk";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface MutateProps {
  combatId: string;
  effect: string;
  effectTrigger: string;
}

export default function useCreateZone() {
  const createZone = (props: MutateProps) =>
    axios.post("http://localhost:3000/api/createZone", props);

  return useMutation({
    mutationFn: createZone,
    onSuccess: async ({ data }) => {
      const item = buildShape()
        .id(data.zoneId)
        .width(30 * 20)
        .height(30 * 20)
        .strokeColor("#1a6aff")
        .fillOpacity(0.5)
        .fillColor("#1a6aff")
        .shapeType("RECTANGLE")
        .metadata({
          type: "zone",
        })
        .build();
      await OBR.scene.items.addItems([item]);
    },
  });
}
