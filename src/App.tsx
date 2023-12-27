import { groupBy, uniq } from "lodash";
import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { isCollision } from "./utils/collision";
import { Card, Stack } from "@mui/material";
import useUpdateZone from "./hooks/useUpdateZone";
import CreateZoneForm from "./components/CreateZoneForm";

function App() {
  const [ready, setReady] = useState(false);
  const { mutate: updateZone } = useUpdateZone();

  const checkForCollision = async () => {
    await OBR.scene.items.getItems();
    OBR.scene.items.onChange(async (items) => {
      const zones = items.filter(({ metadata }) => metadata.type === "zone");
      const characters = items.filter(({ layer }) => layer === "CHARACTER");
      for (const [NAME, VALUES] of Object.entries(
        groupBy(zones, "metadata.zoneId")
      )) {
        const inZoneList: string[][] = await Promise.all(
          VALUES.map(async (zone) => {
            const zoneBounds = await OBR.scene.items.getItemBounds([zone.id]);

            const collisionList = await Promise.all(
              characters.map(async ({ id }) => {
                const characterBounds = await OBR.scene.items.getItemBounds([
                  id,
                ]);
                if (isCollision(characterBounds, zoneBounds)) {
                  return id;
                }
                return "";
              })
            );

            return collisionList.filter((id) => id);
          })
        );

        const finalList: string[] = uniq(inZoneList.flat());

        updateZone({
          _id: NAME,
          combatantsInZoneToChange: finalList,
        });
      }
    });
  };

  useEffect(() => {
    if (OBR.isAvailable && !OBR.isReady) {
      OBR.onReady(() => setReady(true));
    }

    if (OBR.isReady) {
      checkForCollision();
    }
  }, [ready]);

  return (
    <Stack>
      <Card>
        <CreateZoneForm />
      </Card>
    </Stack>
  );
}

export default App;
