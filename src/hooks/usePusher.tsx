import OBR, { buildShape } from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { usePusherContext } from "../context/PusherContext";

export default function usePusher() {
  const { channel } = usePusherContext();

  useEffect(() => {
    channel.bind(``, async (data: any) => {
      console.log(data);
      const returnFormatedNumber = (scale?: number) => {
        let number = data.size;
        if (data.type === "aura") {
          number = number * 2 + data.scale;
        }

        return number * 5;
      };

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

      if (data.type === "aura") {
        const originToken = await OBR.scene.items.getItems([data.origin]);
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
          .attachedTo(data.origin)
          .build();

        await OBR.scene.items.addItems([item]);
      }
    });
  }, [channel]);
}
