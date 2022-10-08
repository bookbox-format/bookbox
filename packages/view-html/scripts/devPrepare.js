import { exec, execSync } from "child_process";
import { readFileSync } from "fs";

const config = JSON.parse(readFileSync("./scripts/prepare.json").toString());

const onChangeList = config.copy.map((path) => `'${path}'`).join(" ");
const execStr = `npx onchange -d 3000 --no-exclude ${onChangeList} -- npm run prepare`;

console.log(execStr);

function wait() {
//   console.log("wait prepare");
  setTimeout(wait, 3000);
}
wait();

exec(execStr, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });;
