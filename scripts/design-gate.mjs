#!/usr/bin/env node
/**
 * design-gate.mjs — mechanical enforcement of DESIGN_SYSTEM.md.
 * Runs before every `next build` (see package.json). Fails the build on:
 *
 *  1. PILL_SHAPE      `rounded-full` anywhere in app/ or components/.
 *                     Genuine circles (status dots, avatar dots) must carry
 *                     an `@allow-circle` comment on the same line.
 *  2. RAW_HEX         Hardcoded hex colors in TSX/TS outside the token file
 *                     (globals.css) — use var(--color-*) tokens instead.
 *  3. INLINE_EASE     Framer Motion easing arrays (`ease: [`) outside
 *                     lib/motion.ts — import { EASE } from "@/lib/motion".
 *
 * The WIP /system and /experience trees (branches system-loop/experience-3d)
 * are excluded until they are migrated.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIRS = ["app", "components"].map((d) => path.join(root, d));
const EXCLUDE = [
  `${path.sep}system${path.sep}`,
  `${path.sep}experience${path.sep}`,
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}.next${path.sep}`,
];

// Hexes that are structural, not palette (pure black/white + the select-option bg)
const HEX_ALLOWLIST = new Set(["#000", "#000000", "#fff", "#ffffff", "#0e0e0e"]);

const errors = [];

function scan(file) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const loc = `${rel}:${i + 1}`;

    if (line.includes("rounded-full") && !line.includes("@allow-circle")) {
      errors.push(`${loc} [PILL_SHAPE] rounded-full is banned — use rounded-(--radius-sm|md|lg); genuine circles need an @allow-circle comment`);
    }

    for (const m of line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const hex = m[0].toLowerCase();
      if (!HEX_ALLOWLIST.has(hex) && !/^#[0-9a-f]{8}$/.test(hex)) {
        errors.push(`${loc} [RAW_HEX] hardcoded color ${m[0]} — use a var(--color-*) token from app/globals.css`);
      }
    }

    if (/ease:\s*\[/.test(line) && !rel.endsWith(`lib${path.sep}motion.ts`)) {
      errors.push(`${loc} [INLINE_EASE] inline easing array — import { EASE } from "@/lib/motion"`);
    }
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (EXCLUDE.some((ex) => (full + path.sep).includes(ex))) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) scan(full);
  }
}

for (const dir of SCAN_DIRS) if (fs.existsSync(dir)) walk(dir);

if (errors.length) {
  console.error(`\n✗ design-gate: ${errors.length} violation(s)\n`);
  for (const e of errors) console.error("  " + e);
  console.error("");
  process.exit(1);
}
console.log("✓ design-gate: clean");
