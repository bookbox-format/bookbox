import { execSync } from "child_process";
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./prepare.json").toString());

for (const path of config.copy) {
  const relativePath = path.split("/").slice(1).join("/");
  const relativeTarget = config.targets[relativePath] || relativePath;
  const isFile = /\.(ts|js|css|html)$/.test(relativePath);
  if (isFile) {
    execSync(`rm -Rf ${relativeTarget}`);
  }
}
execSync(`rm -Rf lib`);
