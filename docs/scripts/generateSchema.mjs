import { getBookSchema } from "@bookbox/preset-web";

import { writeFileSync } from "fs";
import YAML from 'yaml'

const { SOURCE = "index.js", TARGET_PREFIX = "index" } = process.env;

async function generate() {
  const fbook = await import(SOURCE);
  const { schema } = getBookSchema({ book: fbook.default });

  writeFileSync(TARGET_PREFIX + '.json', JSON.stringify(schema, null, 2));
  writeFileSync(TARGET_PREFIX + '.yaml', YAML.stringify(schema));
}

generate();