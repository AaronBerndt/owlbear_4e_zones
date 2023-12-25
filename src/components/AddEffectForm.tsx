import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { FieldArray, Field } from "formik";
import { values, orderBy, range } from "lodash";
import { TiDelete } from "react-icons/ti";
import { conditions, damageTypes } from "../constants";
import { EffectProperty } from "../types";

export default function AddEffectForm({ effect }: Props) {
  const effectPropertyWithDamageTypeList = [
    "Vulnerable",
    "Resist",
    "Immune",
    "Ongoing Damage",
  ];

  const effectPropertyWithValueList = [
    ...conditions
      .filter(({ name }) => name.includes("Modify"))
      .map(({ name }) => name),
    ...effectPropertyWithDamageTypeList.filter((name) => name !== "Immune"),
  ];

  const durationObject = {
    "Save Ends": "saveEnds",
    "Enter Zone": "enterZone",
    "Leave Zone": "leaveZone",
    "End of Encoutner": "endOfEncounter",
    "End of Round": "endOfRound",
    "Next Attack": "nextAttack",
    "Start of your Turn": "startOfEffectersTurn",
    "End of your turn": "endOfEffectersTurn",
    "Start of their Turn": "startOfEffectedsTurn",
    "End of their turn": "endOfEffectedsTurn",
    "Next Attack Roll": "nextAttackRoll",
    "Next Damage Roll": "nextDamageRoll",
    "Next Skill Roll": "nextSkillRoll",
    Permanent: "permanent",
  };

  return (
    <>
      <FieldArray
        name="effectProperties"
        render={(arrayHelpers) => (
          <>
            {effect.effectProperties.map(
              (effectProperty: EffectProperty, i: number) => (
                <Stack direction="row" spacing={2} key={i}>
                  <FormControl fullWidth>
                    <InputLabel shrink id="name">
                      Name
                    </InputLabel>
                    <Field
                      as={Select}
                      name={`effects.${effect}.effectProperties.${i}.name`}
                    >
                      {orderBy(conditions, ["name"]).map(
                        (condition: any, i: number) => (
                          <MenuItem value={condition.name} key={i}>
                            {condition.name}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </FormControl>
                  {effectPropertyWithValueList.includes(
                    effectProperty.name
                  ) && (
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="value">
                        Value
                      </InputLabel>

                      <Field
                        as={Select}
                        name={`effects.${effect}.effectProperties.${i}.value`}
                      >
                        {range(-51, 51).map((damageValue, i) => (
                          <MenuItem value={damageValue} key={i}>
                            {damageValue}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  )}
                  {effectPropertyWithDamageTypeList.includes(
                    effectProperty.name
                  ) && (
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="damageType">
                        Damage Type
                      </InputLabel>
                      <Field
                        as={Select}
                        name={`effects.${effect}.effectProperties.${i}.damageType`}
                      >
                        {damageTypes.map((damageType, i) => (
                          <option value={damageType} key={i}>
                            {damageType}
                          </option>
                        ))}
                      </Field>
                    </FormControl>
                  )}
                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => arrayHelpers.remove(i)}
                  >
                    <TiDelete />
                  </IconButton>
                </Stack>
              )
            )}
            <Stack>
              <Button
                type="button"
                onClick={() => arrayHelpers.push({ name: "Blinded" })}
              >
                Add Effect
              </Button>
            </Stack>
          </>
        )}
      />
      <FormControl fullWidth>
        <InputLabel shrink id="duration">
          Duration
        </InputLabel>
        <Field as={Select} name={`effects.${effect}.duration`}>
          {Object.entries(durationObject).map(
            ([NAME, VALUE]: any, i: number) => (
              <MenuItem value={VALUE} key={i}>
                {NAME}
              </MenuItem>
            )
          )}
        </Field>
      </FormControl>

      <Divider />
      <FieldArray
        name="afterEffectProperties"
        render={(arrayHelpers) => (
          <>
            {effect.afterEffectProperties.map(
              (effectProperty: EffectProperty, i) => (
                <Stack direction="row" spacing={2} key={i}>
                  <FormControl fullWidth>
                    <InputLabel shrink id="name">
                      Name
                    </InputLabel>
                    <Field
                      as={Select}
                      name={`effects.${effect}.afterEffectProperties.${i}.name`}
                    >
                      {orderBy(conditions, ["name"]).map(
                        (condition: any, i: number) => (
                          <option value={condition.name} key={i}>
                            {condition.name}
                          </option>
                        )
                      )}
                    </Field>
                  </FormControl>
                  {effectPropertyWithValueList.includes(
                    effectProperty.name
                  ) && (
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="value">
                        Value
                      </InputLabel>

                      <Field
                        as={Select}
                        name={`effects.${effect}.afterEffectProperties.${i}.value`}
                      >
                        {range(1, 51).map((damageValue, i) => (
                          <MenuItem value={damageValue} key={i}>
                            {damageValue}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  )}
                  {effectPropertyWithDamageTypeList.includes(
                    effectProperty.name
                  ) && (
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="damageType">
                        Damage Type
                      </InputLabel>
                      <Field
                        as={Select}
                        name={`effects.${i}.afterEffectProperties.${i}.damageType`}
                      >
                        {damageTypes.map((damageType, i) => (
                          <MenuItem value={damageType} key={i}>
                            {damageType}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  )}
                  <FormControl fullWidth>
                    <InputLabel shrink id="duration">
                      Duration
                    </InputLabel>
                    <Field
                      as={Select}
                      name={`effects.${effect}.afterEffectProperties.${i}.dutaion`}
                    >
                      {Object.entries(durationObject).map(
                        ([NAME, VALUE]: any, i: number) => (
                          <MenuItem value={VALUE} key={i}>
                            {NAME}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </FormControl>

                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => arrayHelpers.remove(i)}
                  >
                    <TiDelete />
                  </IconButton>
                </Stack>
              )
            )}
            <Button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  name: "Blinded",
                  duration: "saveEnds",
                })
              }
            >
              Add Affereffect
            </Button>
          </>
        )}
      />
    </>
  );
}
