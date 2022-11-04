type Occurrence = {
  [k: string]: string[];
};

const nouns = [
  "the player's hair",
  "timescale",
  "gravity strength",
  "ammo supply",
  "the sun",
  "the grass",
  "all audio",
  "the platforms",
  "the enemy's booty",
  "the ceiling",
  "the wind",
  "light sources",
  "the fog",
  "the player's hair color",
  "all friction",
  "the player's dashes",
  "gravity",
  "the player's stamina",
];

const verbs = [
  "dies",
  "doubles",
  "halves",
  "becomes deadly",
  "burns",
  "stops",
  "inflates",
  "deflates",
  "disappears",
  "heals",
  "burns ",
  "echoes",
  "becomes bouncy",
  "becomes sticky",
  "gets blocked",
  "reflects light",
  "ignites",
  "freezes",
  "becomes unmoveable",
  "defies gravity",
  "changes color",
  "blocks the player",
  "shrinks the player",
];

export type Data = { occurrences: Occurrence; nouns: string[]; verbs: string[] };

const data: Data = {
  occurrences: {},
  nouns,
  verbs,
};

const addOccurrence = (k: string, v: string[]) => {
  data.occurrences[k] = v;
};

addOccurrence("player", [
  "fires a weapon",
  "dashes",
  "climbs",
  "walks right",
  "walks left",
  "jumps up",
  "lands on the ground",
  "grabs a wall",
  "gets a power-up",
  "picks up health",
  "walks by a bush",
  "talks to an NPC",
  "gets injured",
  "kills an enemy",
  "dies",
  "respawns",
]);
addOccurrence("gun", ["fires", "reloads"]);
addOccurrence("time", ["passes"]);

export default data;
