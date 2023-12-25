import {
  Button,
  Container,
  FormControl,
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

export default function CreateZoneForm() {
  const {
    data: combat,
    isLoading,
    isSuccess,
  } = useCombat("65885770b1681c621a7d34b5");
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
        console.log(values);
        // createZone({
        //   combatId: "test",
        //   effect: "test",
        //   effectTrigger: "onEnter",
        // });
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
                      values.effects.map((effect, index) => (
                        <div key={index}>
                          <AddEffectForm effect={effect} />
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            afterEffectProperties: [],
                            effectProperties: [],
                            duration: "",
                          })
                        }
                      >
                        {/* show this when user has removed all friends from the list */}
                        Add a effect
                      </button>
                    )}
                    <div>
                      <button type="submit">Submit</button>
                    </div>
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
