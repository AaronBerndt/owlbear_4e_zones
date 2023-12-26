import OBR, { buildShape } from "@owlbear-rodeo/sdk";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { range } from "lodash";

interface MutateProps {
  effect: string;
  effectTrigger: string;
  type: string;
  effects: any[];
  size: number;
  origin: string;
}

export default function useCreateZone() {
  const createZone = (props: MutateProps) =>
    axios.post("http://localhost:3000/api/createZone", props);

  return useMutation({
    mutationFn: createZone,
    onSuccess: async ({ data }, props) => {
      const returnFormatedNumber = () => {
        let number = props.size;
        if (props.type === "wall") number = 1;
        else if (props.type === "aura") number = number + 1;

        return number * 5;
      };

      props.size * 5;

      const item = buildShape()
        .width(30 * returnFormatedNumber())
        .height(30 * returnFormatedNumber())
        .strokeColor("#1a6aff")
        .fillOpacity(0.5)
        .fillColor("#1a6aff")
        .shapeType("RECTANGLE")
        .metadata({
          zoneId: data.zoneId,
          type: "zone",
        })
        .build();

      await OBR.scene.items.addItems(
        props.type === "wall" ? range(props.size).map(() => item) : [item]
      );
    },
  });
}
