import { useEffect, useState } from "react";
import { isShape } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { isCollision } from "./utils/collision";
import { Button, Container, Stack } from "@mui/material";
import useCreateZone from "./hooks/useCreateZone";
import useUpdateZone from "./hooks/useUpdateZone";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [ready, setReady] = useState(false);
  const { mutate: createZone } = useCreateZone();
  const { mutate: updateZone } = useUpdateZone();

  const checkForCollision = async () => {
    await OBR.scene.items.getItems();
    OBR.scene.items.onChange(async (items) => {
      const zones = items.filter(({ metadata }) => metadata.type === "zone");
      const characters = items.filter(({ layer }) => layer === "CHARACTER");
      for (let zone of zones) {
        const zoneBounds = await OBR.scene.items.getItemBounds([zone.id]);
        let inZoneList = await Promise.all(
          characters.map(async ({ id }) => {
            const characterBounds = await OBR.scene.items.getItemBounds([id]);
            if (isCollision(characterBounds, zoneBounds)) {
              return id;
            }
            return null;
          })
        );
        inZoneList = inZoneList.filter((id) => id);

        updateZone({
          _id: zone.id,
          combatantsInZoneToChange: inZoneList,
        });
      }
    });
  };

  const onSubmit = async () => {
    const shapes = await OBR.scene.items.getItems(isShape);
    // const items = await OBR.scene.items.getItems();

    // createZone({
    //   combatId: "test",
    //   effect: "test",
    //   effectTrigger: "onEnter",
    // });
  };

  useEffect(() => {
    console.log(OBR.isReady);
    if (OBR.isReady) {
      checkForCollision();
    }
  }, [OBR.isReady]);

  return (
    <Stack>
      <Container>
        <Button onClick={onSubmit}>Submit</Button>
      </Container>
    </Stack>
  );
}

export default App;
