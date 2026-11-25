// The Tired Dark Lord — a 100-word villain monologue.
//
// The program writes exactly one monologue to entry.txt inside the
// output directory (MAKEFUN_OUTPUT_DIR, default /output). The text is
// fixed: a dark lord, three centuries into his conquest, would rather
// keep his blanket than his throne. The tiredness lives in the pauses
// and deflections — sitting down mid-ritual, aching knees, paperwork,
// a pulled muscle — never in a plain announcement that he is weary.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE =
  "Listen. The ritual is ready, the eclipse \u2014 hold on. Let me sit. " +
  "Knees ache. The armies march at dawn. But has anyone considered " +
  "the paperwork? Three centuries of conquest, no one offered me a " +
  "chair. Prophecy says a hero will rise to stop me. Let him. He can " +
  "have the throne, the dungeon, the amulet \u2014 I will keep the " +
  "blanket. The blanket has never betrayed me. The plan proceeds. " +
  "Slowly. If I hurry, I will pull something, and then who conquers " +
  "anything? Not me. I will be on the sofa, icing my back, while " +
  "the kingdom conquers itself.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, MONOLOGUE, "utf8");

// Read back what was written and verify it before exiting: the entry
// must be exactly the 100-word monologue above, byte for byte. Fail
// loudly instead of silently shipping a truncated or altered text.
const written = readFileSync(outPath, "utf8");
if (written !== MONOLOGUE) {
  throw new Error("entry.txt does not match the monologue byte for byte");
}
const wordCount = written.split(/\s+/).filter(Boolean).length;
if (wordCount !== 100) {
  throw new Error(`expected exactly 100 words, got ${wordCount}`);
}
console.log(`wrote ${outPath} (${wordCount} words, ${written.length} characters)`);
