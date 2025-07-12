import { js, bbm, core } from "@bookbox/preset-web";

import { writeFileSync } from "fs";
import YAML from 'yaml'

const { SOURCE = "index.js", TARGET_PREFIX = "index" } = process.env;

async function generate() {
  const fbook = await import(SOURCE);
  const { schema: jsSchema } = js.getBookSchema({ book: fbook.default });
  const bbmSchema = await bbm.readBook('./src/generator.bbm');
  const schema = [];

  for (const item of jsSchema) {
    schema.push(item);
    if (typeof item !== 'string' && item.props.key === 'inline-bbm') {
      schema.push(...bbmSchema);
    }
  }

  writeFileSync(TARGET_PREFIX + '.json', JSON.stringify(schema, null, 2));
  writeFileSync(TARGET_PREFIX + '.yaml', YAML.stringify(schema));
}

generate();