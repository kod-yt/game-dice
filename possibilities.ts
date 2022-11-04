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
  "the timescale",
  // "the player's x velocity",
  // "the player's y velocity",
  "horizontal movement",
  "vertical movement",
  "the platforms",
  "the enemy's booty",
  "the floor",
  "the ceiling",
  "the wind",
  "light sources",
  "the fog",
  "the player's hair color",
  "all friction",
  "the player's dashes",
  "gravity",
  "the player's stamina",
  "dangerous enemies",
  "all gold",
  "the cost of items/upgrades",
  // "the ultimate ability",
  "the path the player took",
  "the floor beneath the player",
  "the nearest wall",
  "the nearest water source",
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
  "slows down time",
  "speeds up time",
  "stops time",
  "spawns enemies",
  "deletes platforms",
  "creates new platforms",
  "becomes invisible",
  "becomes visible",
  "becomes breakable",
  "becomes solid",
  // "becomes liquid",
  // "becomes gaseous",
];

export type Data = { occurrences: Occurrence; nouns: string[]; verbs: string[]; [k: string]: any };

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
  "double jumps",
  "ground pounds",
  "wall hops",
  "walks right",
  "walks left",
  "jumps up",
  "lands on the ground",
  "grabs a wall",
  "climbs the wall",
  // "gets a power-up",
  "picks up a coin",
  "picks up health",
  "walks by a bush",
  "talks to an NPC",
  "gets injured",
  "kills an enemy",
  "dies",
  "respawns",
  "approaches a light",
  "enters a shadow",
  "starts a new level",
  "bounces off a trampoline",
  "approaches a ledge",
]);

addOccurrence("player's gun", ["fires", "reloads", "aims"]);
addOccurrence("time", ["passes"]);
addOccurrence("camera", ["pans right", "pans left"]);
addOccurrence("music", ["starts playing", "stops playing"]);

export default data;
