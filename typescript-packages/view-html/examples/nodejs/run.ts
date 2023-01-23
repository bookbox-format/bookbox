import { writeFileSync } from "fs";
import { createHtmlBook, getBookBoxHtmlDocument } from "../../src";

import elementsSchema from '../elements-list.json';
import simpleSchema from '../simple-list.json';

writeFileSync("./elements-list.html", getBookBoxHtmlDocument({ bookData: createHtmlBook({ schema: elementsSchema }) }));
writeFileSync("./simple-list.html", getBookBoxHtmlDocument({ bookData: createHtmlBook({ schema: simpleSchema }) }));
