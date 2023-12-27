import OBR, { buildShape } from "@owlbear-rodeo/sdk";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { range } from "lodash";
import { Effect } from "../types";

interface MutateProps {
  type: string;
  effects: Effect[];
  size: number;
  origin: string;
  combatId: string;
}

export default function useCreateZone() {
  const createZone = (props: MutateProps) =>
    axios.post("https://4e-pwa.vercel.app/api/createZone", props);

  return useMutation({
    mutationFn: createZone,
    onSuccess: async ({ data }, props) => {
      const returnFormatedNumber = (scale?: number) => {
        let number = props.size;
        if (props.type === "wall") number = 1;
        else if (props.type === "aura") {
          number = number * 2 + scale!;
        }

        return number * 5;
      };

      props.size * 5;

      let item = buildShape()
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

      if (props.type === "aura") {
        const originToken = await OBR.scene.items.getItems([props.origin]);
        const { x, y } = originToken[0].position;
        const { x: scale } = originToken[0].scale;

        const width = 30 * returnFormatedNumber(Math.trunc(scale));
        const height = 30 * returnFormatedNumber(Math.trunc(scale));

        item = buildShape()
          .position({
            x: x - width / 2,
            y: y - height / 2,
          })
          .width(width)
          .height(height)
          .strokeColor("#1a6aff")
          .fillOpacity(0.5)
          .fillColor("#1a6aff")
          .shapeType("RECTANGLE")
          .metadata({
            zoneId: data.zoneId,
            type: "zone",
          })
          .attachedTo(props.origin)
          .build();
      }

      console.log(
        props.type === "wall" ? range(props.size).map(() => item) : [item]
      );
      await OBR.scene.items.addItems(
        props.type === "wall"
          ? range(props.size).map(() =>
              buildShape()
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
                .build()
            )
          : [item]
      );
    },
  });
}
