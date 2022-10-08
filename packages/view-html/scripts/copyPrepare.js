import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const config = JSON.parse(readFileSync("./scripts/prepare.json").toString());

for (const path of config.copy) {
    const relativePath = path.split('/').slice(1).join('/');
    const relativeTarget = config.targets[relativePath] || relativePath;
    const target = `/${relativeTarget}`;
    const isFile = /\.(ts|js|css|html)$/.test(relativePath);
    execSync(`cp -Rf ${path} scripts${isFile ? target : '/lib'}`);
}

// clear fonts — woff2 only
const katexCss = readFileSync('scripts/lib/katex.css').toString();
writeFileSync('scripts/lib/katex.css', katexCss.replace(/(src: url\(.+\) format\('woff2'\)).*;/g, '$1;'));