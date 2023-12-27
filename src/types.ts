export type EffectProperty = {
  name:
    | "Dazed"
    | "Dominated"
    | "Dying"
    | "Buff"
    | "Debuff"
    | "Grabbed"
    | "Hidden"
    | "Immobilized"
    | "Deafened"
    | "Helpless"
    | "Blinded"
    | "Petrified"
    | "Removed from play"
    | "Restrained"
    | "Unconscious"
    | "Weakened"
    | "Prone"
    | "Stunned"
    | "Surprised"
    | "Slowed"
    | "Combat Advantage"
    | "Ongoing Damage";

  effectedAttribute?:
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma"
    | "ac"
    | "fortitude"
    | "reflex"
    | "attackRoll"
    | "damage"
    | "vulnerable"
    | "resist"
    | "immune"
    | "savingThrows"
    | "deathSaves"
    | "skillCheck"
    | "abilityCheck"
    | "speed";
  value?: number;
  damageType?: string;
  duration?: Duration;
  zoneId?: string;
  effectTrigger?: string;
};
export type Duration =
  | "saveEnds"
  | "endOfEncounter"
  | "trigger"
  | "enterZone"
  | "leaveZone"
  | "startOfEffectersTurn"
  | "endOfEffectersTurn"
  | "startOfEffectedTurn"
  | "endOfEffectedTurn"
  | "nextAttack"
  | "permanent";

export type Effect = {
  combatId: string;
  effectProperties: EffectProperty[];
  duration: Duration;
  effecterId: string;
  source: string;
  effecterName: string;
  afterEffectProperties: EffectProperty[];
};
