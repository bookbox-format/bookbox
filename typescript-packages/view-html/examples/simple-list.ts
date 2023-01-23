import { BookApi, getBookSchema } from "@bookbox/generator-js";
import { writeFileSync } from "fs";

export const elementsListBook = (_: BookApi) => _.book.root`
${_.resource.path`/video.mp4`.src('./resources/video.mp4')}
${_.resource.path`/audio.mp3`.src('./resources/audio.mp3')}
${_.resource.path`/image.svg`.src('./resources/image.svg')}

${_.title`Examples: elements`}

${_.authors`author1, author2, author3`}


${_.header.level(2)`Header level 2`}


${_.strong`Strong`}


${_.em`Em`}



${_.tooltip.content("tooltip text")`tooltip label`}


${_.label.ref("code")`label`}


${_.link.href("https://ya.ru")`yandex link`}

${_.draft`draft`}


${_.external`external`}


${_.image.src("/image.svg").alt("test image")`image`}


${_.video.src("/video.mp4")``}


${_.audio.src("/audio.mp3")``}


${_.list.order()`
${_.item`item a`}
${_.item`item b`}
${_.item`item c`}
`}


${_.separator``}
`;

const { schema } = getBookSchema({ book: elementsListBook });

writeFileSync("./simple-list.json", JSON.stringify(schema, null, 2))

