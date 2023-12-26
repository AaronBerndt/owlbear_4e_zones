import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import { range } from "lodash";
import useCreateZone from "../hooks/useCreateZone";
import { useCombat } from "../hooks/useCombat";
import AddEffectForm from "./AddEffectForm";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function CreateZoneForm() {
  const [selectedEffectIndex, setSelectedEffectIndex] = useState<null | number>(
    null
  );
  const { data: combat, isLoading } = useCombat("65885770b1681c621a7d34b5");
  const { mutate: createZone } = useCreateZone();

  const zoneTypesList = ["Zone", "Aura", "Wall"];

  if (isLoading || !combat) {
    return <LinearProgress />;
  }

  return (
    <Formik
      initialValues={{
        type: "zone",
        effects: [],
        size: 1,
        origin: "none",
      }}
      onSubmit={(values, { setSubmitting }) => {
        createZone(values);
      }}
    >
      {({ handleSubmit, values }) => (
        <Container style={{ padding: 10 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel shrink id="type">
                  Zone Type
                </InputLabel>
                <Field as={Select} name="type">
                  {zoneTypesList.map((zoneType: any, i: number) => (
                    <MenuItem value={zoneType.toLowerCase()} key={i}>
                      {zoneType}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel shrink id="size">
                  Zone Size
                </InputLabel>
                <Field as={Select} name="size">
                  {range(1, 11).map((zoneSize: any, i: number) => (
                    <MenuItem value={zoneSize} key={i}>
                      {zoneSize}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel shrink id="origin">
                  Zone Origin
                </InputLabel>
                <Field as={Select} name="origin">
                  <MenuItem value={"none"}>None</MenuItem>
                  {combat.combatants
                    .filter((combatant) => combatant)
                    .map(({ name, _id }: any, i: number) => (
                      <MenuItem value={_id} key={i}>
                        {name}
                      </MenuItem>
                    ))}
                </Field>
              </FormControl>
              <FieldArray
                name="effects"
                render={(arrayHelpers) => (
                  <div>
                    {values.effects && values.effects.length > 0 ? (
                      <>
                        {selectedEffectIndex !== null ? (
                          <AddEffectForm
                            effect={values.effects[selectedEffectIndex]}
                            effectId={selectedEffectIndex}
                            setSelectedEffectIndex={setSelectedEffectIndex}
                          />
                        ) : (
                          values.effects.map((effect, i) => (
                            <div key={i}>
                              <Button
                                onClick={() => {
                                  setSelectedEffectIndex(i);
                                }}
                              >
                                Effect {i + 1}
                              </Button>
                              <IconButton
                                style={{ color: "red" }}
                                onClick={() => arrayHelpers.remove(i)}
                              >
                                <TiDelete />
                              </IconButton>
                            </div>
                          ))
                        )}

                        <Stack>
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                afterEffectProperties: [],
                                effectProperties: [],
                                duration: "whileInZone",
                                effectTrigger: "enterZone",
                              })
                            }
                          >
                            Add a effect
                          </Button>
                        </Stack>
                      </>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            afterEffectProperties: [],
                            effectProperties: [],
                            duration: "whileInZone",
                            effectTrigger: "enterZone",
                          });
                          setSelectedEffectIndex(null);
                        }}
                      >
                        Add a effect
                      </Button>
                    )}
                  </div>
                )}
              />
            </Stack>

            <Stack>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Container>
      )}
    </Formik>
  );
}