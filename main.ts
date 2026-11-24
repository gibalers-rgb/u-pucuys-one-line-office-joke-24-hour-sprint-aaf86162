// One-Line Office Joke: 24-Hour Sprint
// Writes a single office-life joke (one line, <= 200 chars) to /output/entry.txt.
//
// The joke: a meeting that should have been an email, told as a loop — the
// meeting's only outcome is scheduling a follow-up meeting about the email
// it replaced. One sentence, one specific office detail (the follow-up
// meeting), and a punchline that lands on the last word.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  "The meeting that should've been an email ended by scheduling a follow-up meeting to discuss the email it replaced.";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  const text = JOKE.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, text, "utf8");
  // Read it back: the grader gates on the exact bytes, so fail loudly here
  // instead of shipping a truncated or mangled file.
  const roundTrip = readFileSync(OUT_FILE, "utf8");
  if (roundTrip !== text) {
    throw new Error("read-back mismatch: entry.txt does not match the joke");
  }
  console.log(`wrote ${text.length} chars to ${OUT_FILE}`);
}

main();
