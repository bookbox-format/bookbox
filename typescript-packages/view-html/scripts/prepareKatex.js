import { readFileSync } from 'fs';
import { writeCssTs } from './css2js.js';

const DIST = '../node_modules/katex/dist';

const katexCss = readFileSync(`${DIST}/katex.min.css`).toString();
const fontRegex = /@font-face{[^}]+}/g;

const fonts = katexCss.match(fontRegex);

const fontsByName = new Map();

const allFonts = [];
for (const font of fonts) {
  const [, name] = font.match(/font-family:"?(([A-Za-z0-9_-])+)"?;/);
  const [, path] = font.match(/url\((.+)\) format\("woff2"\)/);
  const fontData = readFileSync(`${DIST}/${path}`).toString('base64');

  const url = `data:font/woff2;base64,${fontData}`;

  const fontCss = font
    .replace(/,url\(.+\) format\("woff"\),url\(.+\) format\("truetype"\)/, '')
    .replace(/url\(.+\.woff2\)/, `url(${url})`);

  allFonts.push(fontCss);

  if (!fontsByName.has(name)) fontsByName.set(name, []);
  fontsByName.get(name).push(fontCss);

}

const css = katexCss.replace(fontRegex, '');
writeCssTs('katex', css);

const allFontsCss = allFonts.join('\n\n');
writeCssTs('katexFontsAll', allFontsCss);
