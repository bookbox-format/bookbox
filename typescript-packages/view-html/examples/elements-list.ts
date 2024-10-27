import { BookApi, getBookSchema } from '@bookbox/generator-js';
import { writeFileSync } from 'fs';

export const elementsListBook = (_: BookApi) => _.book.root`
${_.resource.path`/video.mp4`.src('./resources/video.mp4')}
${_.resource.path`/audio.mp3`.src('./resources/audio.mp3')}
${_.resource.path`/image.svg`.src('./resources/image.svg')}

${_.title`Examples: elements`}

${_.authors`author1, author2, author3`}


${_.header.level(2)`Header level 2`}


${_.strong`Strong`}


${_.em`Em`}


${_.code.lang('javascript')`const x = 1 + Math.random();`}

${_.code.lang('javascript')`const x = 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong'`}

${_.code.lang('typescript').key('code')`
import { HtmlToken } from "./model";
import hljs from 'highlight.js';

interface CodeOptions {
  text: string;
  lang?: string;
}

export function renderColorCode(options: CodeOptions): HtmlToken {
  const {text, lang} = options;
  let preparedCode = text;
  if (lang) {
      try {
        preparedCode = hljs.highlight(preparedCode, {language: lang}).value;
      } finally {}
  }
  return preparedCode;
}
`}

${_.code.lang('html')`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>%TITLE</title>
    <link rel="stylesheet" href="./htmlBook.css" />
    <link rel="stylesheet" href="./code.css" />
    <link rel="stylesheet" href="./lib/katex.css" />
    %FONT_STYLE
    <script src="./prepare.ts" type="module"/>
    %INLINE_HEAD
  </head>
  <body>
    %BOOK
  </body>
</html>
`}

${_.code.lang('json')`
{
    "copy": [
      "src/bookTemplate.html",
      "src/htmlBook.css",
      "src/code.css",
      "src/prepare.ts",
      "src/goto.ts",
      "src/navigation.ts",
      "node_modules/katex/dist"
    ],
    "targets": {
      "bookTemplate.html": "index.html"
    }
}
`}

${_.code.lang('css')`
.book-box_theme-dark {
    --book-box-color-code-type: var(--book-box-color-name-yellow-light);
    --book-box-color-code-variable-constant: var(--book-box-color-name-yellow-light);
    --book-box-color-code-class: var(--book-box-color-name-yellow-light);
}

.book-box-code code {
    color: var(--book-box-color-text);
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    tab-size: 4;
    hyphens: none;
}
`}


${_.tooltip.content('tooltip text')`tooltip label`}


${_.label.ref('code')`label`}


${_.link.href('https://ya.ru')`yandex link`}


${_.math.block()`a^n + b^{n^n} = c^n`}
${_.math.block()`\\sqrt{2}`}


${_.draft`draft`}


${_.external`external`}


${_.image.src('/image.svg').alt('test image')`image`}


${_.video.src('/video.mp4')``}


${_.audio.src('/audio.mp3')``}


${_.list.order()`
${_.item`item a`}
${_.item`item b`}
${_.item`item c`}
`}


${_.separator``}

${_.counter.start`example`}
Счётчик с числами

+ ${_.counter.use`example`}

+ ${_.counter.use`example`}

+ ${_.counter.use`example`}

last ${_.counter.last`example`}


${_.counter.start`exampler`.type('roman')}
Счётчик с римскими числами

+ ${_.counter.use`exampler`}

+ ${_.counter.use`exampler`}

+ ${_.counter.use`exampler`}

+ ${_.counter.use`exampler`}

last ${_.counter.last`exampler`}


${_.counter.start`example2`.type('latin')}
Счётчик с латинскими буквами

+ ${_.counter.use`example2`}

+ ${_.counter.use`example2`}

+ ${_.counter.use`example2`}

last ${_.counter.last`example2`}

last ${_.counter.last`example2`}


${_.counter.start`example3`.type('cyrillic')}
Счётчик с рускими буквами

+ ${_.counter.use`example3`}

+ ${_.counter.use`example3`}

+ ${_.counter.use`example3`}

last ${_.counter.last`example3`}

last ${_.counter.last`example3`}


${_.counter.start`example4`.type('char').initial('α')}
Счётчик с символами юникода

+ ${_.counter.use`example4`}

+ ${_.counter.use`example4`}

+ ${_.counter.use`example4`}

+ ${_.counter.use`example4`}

last ${_.counter.last`example4`}

last ${_.counter.last`example4`}


Поведение прорутки смотрите в ${_.label.ref('table-example')`длинной таблице`}

${_.table`
${_.row.head(true)`
${_.cell`A`}
${_.cell`!A`}
`}
${_.row`
${_.cell`0`}
${_.cell`1`}
`}
${_.row`
${_.cell`1`}
${_.cell`0`}
`}
Таблица истинности для отрицания
`}

${_.table.key`table-example``
  ${_.row.head(true)`
  ${_.cell`A`}
  ${_.cell`!A`}
  ${_.cell`!!A`}
  ${_.cell`!!!A`}
  ${_.cell`!!!!A`}
  ${_.cell`!!!!!A`}
  ${_.cell`!!!!!!A`}
  ${_.cell`!!!!!!!A`}
  ${_.cell`!!!!!!!!A`}
  ${_.cell`!!!!!!!!!A`}
  ${_.cell`!!!!!!!!!!A`}
  ${_.cell`!!!!!!!!!!!A`}
  `}
  ${_.row`
  ${_.cell`0`}
  ${_.cell`1`}
    ${_.cell`0`}
  ${_.cell`1`}
    ${_.cell`0`}
  ${_.cell`1`}
    ${_.cell`0`}
  ${_.cell`1`}
    ${_.cell`0`}
  ${_.cell`1`}
    ${_.cell`0`}
  ${_.cell`1`}
  `}
  ${_.row`
  ${_.cell`1`}
  ${_.cell`0`}
  ${_.cell`1`}
  ${_.cell`0`}
  ${_.cell`1`}
  ${_.cell`0`}
  ${_.cell`1`}
  ${_.cell`0`}
  ${_.cell`1`}
  ${_.cell`0`}
  ${_.cell`1`}
  ${_.cell`0`}
  `}
  Очень широкая таблица истинности для отрицания с многократным дублированием колонок
  `}


${_.header.level(2)`Long text`}


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex est, efficitur in sagittis sed, malesuada vel lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse pulvinar odio ut metus sollicitudin euismod. Ut a arcu dui. Morbi mauris magna, pharetra eu elit nec, hendrerit blandit nisl. Suspendisse laoreet tellus eget ex efficitur, sit amet pretium mauris ultricies. Suspendisse potenti. Suspendisse sapien augue, vulputate quis sodales ac, vehicula nec lacus. Donec vitae laoreet massa. Vestibulum pretium sodales nunc. Nam dapibus tristique quam eu venenatis. Donec nibh risus, laoreet eget mattis nec, aliquam dignissim urna. Vestibulum eget commodo turpis.

${_.separator}

Duis rutrum dignissim magna quis viverra. Praesent pellentesque scelerisque quam ac mattis. Proin nunc metus, pellentesque at tellus in, fringilla lacinia dui. Duis dolor ligula, fermentum ac velit eu, tempor porta urna. Nullam ornare nisi vitae orci fermentum, vitae pretium neque tempor. Maecenas vitae sagittis urna. In ac luctus libero, ut aliquet lectus. Nunc turpis felis, efficitur facilisis congue vitae, aliquam eget mi. In rutrum tempor bibendum. Vestibulum posuere lacinia ipsum quis bibendum. Nullam laoreet aliquam dolor, a dignissim elit. Cras nec nisl venenatis, interdum purus eu, volutpat orci. Duis fermentum ut nisl a pharetra. Duis vehicula nisi vitae justo viverra, sit amet porta sem euismod.


Vestibulum eleifend dolor sed mauris posuere, at elementum velit suscipit. Fusce pharetra fringilla elit, semper volutpat risus euismod ac. Cras mattis ligula orci, non venenatis dui congue quis. Suspendisse tincidunt eget diam in fringilla. Pellentesque hendrerit ultrices orci, eu lobortis nisi condimentum eget. Nulla sit amet erat tincidunt, imperdiet mauris in, sollicitudin risus. Proin dolor justo, vestibulum mollis euismod in, ultricies non enim. Vestibulum vulputate elementum metus vitae accumsan. Etiam facilisis mauris a enim condimentum tempus.


Fusce volutpat, nulla in semper blandit, purus magna rhoncus ipsum, et finibus mauris enim eu arcu. Phasellus luctus rutrum malesuada. Etiam sed diam mi. Donec a dolor quis purus convallis accumsan nec sed quam. In tristique malesuada magna tristique dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam pulvinar viverra mi, at consectetur leo.


Sed congue ornare tortor in hendrerit. Quisque malesuada eu arcu ut tempus. In at eros lobortis tortor pellentesque laoreet at et mauris. Quisque quis nulla dictum, consectetur arcu id, gravida turpis. Etiam pellentesque ligula dolor, id placerat orci porttitor nec. Cras ac arcu vestibulum metus hendrerit commodo. Praesent vel rutrum turpis, quis faucibus orci. Praesent non libero eget dolor maximus sollicitudin in vitae nunc. Fusce non nulla massa. Donec elementum nibh eget porttitor eleifend. Fusce tempus tristique ex, eget scelerisque tellus efficitur non.


Proin at tellus sit amet erat volutpat efficitur. Morbi et sapien dui. Cras et tincidunt velit. Etiam cursus ultricies libero. Nullam non semper urna. In viverra cursus elit. Quisque sed mauris et dui mollis vehicula. Etiam eleifend eleifend sem. Nam pellentesque, purus eu elementum euismod, ante nisl aliquam massa, eget fermentum nisl velit non turpis. Nullam congue dictum est, ac hendrerit turpis dictum commodo. Nam vestibulum porta placerat. Nulla eget lobortis lacus. In quam magna, luctus vitae imperdiet in, tincidunt in nisl. Nam bibendum quam in nibh tristique eleifend.


Vivamus vel venenatis neque, sit amet mattis ante. Vivamus interdum ut ante tincidunt congue. Etiam pretium magna a turpis congue congue. Vestibulum dapibus imperdiet varius. Donec in velit pharetra, pretium orci non, porta ligula. Pellentesque convallis feugiat enim, ac vulputate ligula aliquet sit amet. Proin ac aliquet felis. Cras venenatis turpis libero, in pellentesque velit rutrum non.


Duis facilisis velit eget est feugiat, et scelerisque nisl facilisis. Donec malesuada nisi erat, sed malesuada orci cursus a. Praesent et placerat nisi. Duis ex lorem, aliquet sit amet turpis vel, aliquet condimentum ipsum. Proin in erat blandit, vestibulum nunc suscipit, tincidunt orci. Suspendisse ultrices massa vel turpis commodo fringilla. Vivamus ultrices est ut gravida ultrices. Morbi quis tellus mauris. Donec tristique leo a odio pellentesque efficitur. Quisque tincidunt, purus sed scelerisque fermentum, velit quam venenatis est, auctor blandit diam nunc nec justo. Donec porttitor vitae urna in blandit. Aenean rhoncus posuere volutpat. Aliquam erat volutpat. Pellentesque quis augue id erat lacinia luctus ut placerat libero.


Maecenas tristique et nulla nec elementum. Donec egestas at erat eget tincidunt. Ut sem lectus, porta ut dui non, aliquam rutrum risus. Donec tincidunt leo ut arcu auctor, id euismod mi cursus. Vestibulum vehicula turpis at venenatis lacinia. Nullam lobortis dolor eu lectus feugiat ultrices. Praesent volutpat iaculis tellus, dapibus ullamcorper justo blandit et. Cras vestibulum congue enim, et mattis arcu dapibus a. In placerat consectetur quam, in vulputate nulla tincidunt non. Aliquam dapibus eget mauris sit amet porttitor. Integer vel odio finibus, ornare ex eget, accumsan purus. Donec placerat erat id turpis laoreet venenatis. Phasellus quam enim, imperdiet vel blandit id, porta nec felis. Proin rhoncus eros in massa cursus finibus. Phasellus mollis odio nec mi efficitur consequat. Interdum et malesuada fames ac ante ipsum primis in faucibus.


Vivamus gravida consequat dignissim. Morbi mauris enim, consectetur nec tempus vitae, scelerisque ac mauris. Nam at orci vitae diam consequat scelerisque. Phasellus vel elit in lorem ullamcorper euismod. Suspendisse eu est at eros ullamcorper ultricies. Etiam tempus, ligula non consectetur sodales, urna nunc sagittis risus, et varius libero diam eget justo. Integer consequat eget eros ac maximus. In fringilla, neque at porttitor porttitor, neque magna varius augue, vitae consectetur lacus nibh eget ex. Pellentesque lacinia vitae nibh id congue. Integer nisi nunc, pellentesque vitae molestie nec, dictum ultricies arcu. Ut ut rutrum ipsum. Donec facilisis nisi ac maximus convallis.


Ut imperdiet ex eu velit elementum elementum. Donec id diam nisi. Quisque sagittis accumsan iaculis. Aliquam porttitor condimentum nibh sed semper. In quam mauris, placerat a porta id, luctus ac diam. Integer nulla magna, dapibus ut nisi in, accumsan accumsan est. Phasellus condimentum arcu sed erat fringilla commodo.


Curabitur nibh ex, egestas vitae placerat eget, ultrices eu libero. Pellentesque eu bibendum metus. Sed malesuada cursus velit, ut faucibus odio convallis sed. Suspendisse potenti. Donec lobortis aliquet quam, ac pulvinar ligula commodo vel. Ut tempor enim lectus, et vestibulum dolor hendrerit ac. Nulla facilisi. Aenean massa risus, dapibus vitae condimentum ac, ultrices vel lacus. Duis quis laoreet arcu. Nam at justo mollis, tristique lorem non, laoreet neque.


Quisque accumsan turpis in felis lacinia sollicitudin. Etiam sit amet eros quis diam tincidunt mattis. Morbi ac tincidunt sapien, non cursus eros. Nulla rutrum malesuada ligula. Fusce euismod orci a consequat euismod. Mauris varius vel lectus vel rhoncus. Sed et mollis libero. Quisque tristique erat eget arcu tincidunt mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In convallis bibendum fringilla. Vestibulum vulputate lacus at pharetra dignissim. Donec blandit ex sed dui iaculis, in sodales sapien vulputate. Cras tempor nibh sed massa mollis condimentum.


Maecenas a odio hendrerit, porttitor tellus nec, blandit ante. Aenean libero metus, malesuada ut malesuada nec, rhoncus et lacus. Nulla facilisi. In lobortis varius sollicitudin. Nulla facilisi. Curabitur cursus faucibus hendrerit. Mauris viverra quam eget dolor consequat posuere. Nam pharetra tincidunt orci. Mauris sodales ultrices odio quis mattis. Nam sit amet consequat ex, quis facilisis leo. Integer maximus tellus et bibendum condimentum. Aenean ac quam sed nisi imperdiet egestas eget nec sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent molestie mi ac aliquet molestie.


Phasellus mollis mauris nulla, in auctor turpis malesuada consequat. Pellentesque sodales ornare tellus ac iaculis. Cras dui ipsum, faucibus eget quam at, gravida ornare massa. Duis lacinia tortor sem. Nam tempor, eros et volutpat consequat, elit velit malesuada sapien, quis efficitur nibh tortor in tortor. Morbi tristique odio ut ipsum congue, quis convallis lorem porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.


Suspendisse placerat non velit a fermentum. Donec interdum, arcu condimentum sodales consectetur, erat sapien varius orci, sit amet pretium sapien justo non enim. Sed hendrerit, nibh a condimentum imperdiet, sem velit rhoncus sem, eget venenatis nunc magna ac turpis. Cras id urna id est mattis ultricies. Duis rutrum tellus nibh, eget sollicitudin eros maximus rutrum. Donec in mauris nisl. Nunc consectetur sapien quis justo volutpat sodales. Suspendisse molestie, felis sit amet lacinia ultricies, ligula ex commodo velit, non egestas libero est et felis. In sed magna laoreet ipsum volutpat pharetra. Donec eu libero condimentum, imperdiet arcu in, sollicitudin dolor.


In convallis magna sed nunc accumsan, quis vulputate mauris ultrices. Nunc cursus tortor id est rutrum, non venenatis lacus ullamcorper. In neque tellus, commodo a bibendum at, tempor at nisl. In ac commodo dolor, ac rhoncus felis. Vivamus scelerisque eros nunc, eu ultricies dui tincidunt sit amet. Maecenas ipsum dui, auctor in arcu ut, ornare tempor augue. Etiam eget urna velit. Sed quis varius nunc. Ut metus dui, convallis vitae suscipit vel, ultrices non dolor. Nam sed eros a lacus euismod commodo. Ut scelerisque sit amet dui nec euismod. Etiam bibendum, lacus eget congue vehicula, mi velit volutpat sapien, vitae feugiat velit felis quis neque. Quisque faucibus ultrices justo, et tempor ligula pretium consectetur. Suspendisse eu lorem vestibulum, condimentum velit sit amet, dictum arcu. Integer eget dignissim elit.


Duis rutrum, urna vel feugiat sagittis, urna enim eleifend purus, id finibus urna lectus id lacus. Integer semper scelerisque sapien eget ultrices. Nulla dapibus dui et est tincidunt, eget sollicitudin leo rhoncus. Aenean commodo mi metus, sed interdum lorem condimentum quis. Fusce cursus nunc eget neque consequat tincidunt. Morbi id nunc vehicula, iaculis tortor in, placerat ligula. Pellentesque nec ipsum in quam semper interdum. Donec aliquet non sem sit amet consequat. Nulla iaculis elit non ante dapibus dapibus. Cras hendrerit et risus nec vehicula. Nunc at malesuada sapien.

Morbi tellus velit, maximus ut ornare in, maximus eget libero. Cras venenatis, erat in tincidunt porta, eros magna condimentum sapien, vitae porta nisl lorem sit amet leo. Aenean euismod eros a efficitur porttitor. Cras sed nunc fringilla, bibendum velit fermentum, facilisis felis. Nulla lobortis tempus elementum. Aliquam ligula nisi, molestie at accumsan in, dictum id metus. In hendrerit dictum neque, eu finibus lectus porta et. In hac habitasse platea dictumst. Nam sed ornare dui, at tempus arcu.

Cras nibh diam, imperdiet ac magna eu, consectetur hendrerit sem. Duis vitae ipsum nibh. Mauris luctus metus et odio sodales convallis. Morbi ut turpis urna. In in ultrices magna. Pellentesque vel erat quis velit venenatis volutpat sed ac nunc. Aenean ac dui ac magna mollis scelerisque ac non sem. In et velit vitae mi dapibus consequat non in nisl. Praesent mollis maximus condimentum. Morbi felis felis, elementum at feugiat ac, malesuada vel urna. In vel mi nec velit ultrices pharetra. Suspendisse fermentum rutrum congue. Vivamus tempus, lacus id gravida tempus, tortor lorem dapibus risus, in pretium justo magna sit amet risus. Donec aliquam, mi sit amet vehicula lobortis, ante enim porttitor metus, id pharetra eros enim vel est. Sed quis velit ornare, bibendum neque in, pellentesque enim.

Nullam bibendum quam eget orci rhoncus, a feugiat erat ultrices. In ut diam efficitur, vehicula ipsum et, bibendum ex. Vestibulum sed ultrices est. Morbi malesuada enim sit amet sem tristique eleifend. Suspendisse pellentesque augue ut venenatis eleifend. Etiam eget aliquam urna. Integer blandit nisi ut purus ornare tempus. Curabitur blandit nibh sit amet arcu luctus fermentum. Mauris nec metus porta mauris tempus eleifend. Maecenas feugiat quam vel est mollis dictum. Ut efficitur diam sapien, sollicitudin dictum ante placerat gravida.

Mauris fermentum enim in volutpat consectetur. Curabitur tellus felis, mattis at sem et, faucibus iaculis enim. Ut faucibus sed neque in imperdiet. Pellentesque libero magna, maximus vitae sapien a, consectetur sodales nunc. Vivamus ac orci diam. Etiam hendrerit, risus nec facilisis tempor, risus tellus luctus neque, at maximus quam dolor non urna. Mauris eu augue sem. Vivamus porttitor nulla lorem, sit amet porta nulla luctus at. Integer eu nulla eu magna porta convallis. Nulla mollis imperdiet est sed gravida. Sed et fringilla sapien.

Etiam feugiat eleifend congue. Fusce vestibulum arcu non est semper viverra. Morbi sodales rutrum ante, non tincidunt sapien molestie quis. Mauris nec lacus eget augue congue tempor et vitae ante. Aliquam non venenatis sem, facilisis lobortis enim. Sed ac pretium sem. Donec vehicula nisl tempus ligula porttitor mollis. Integer libero sapien, feugiat sed quam vel, tristique congue mauris.

Sed blandit nibh vel purus fermentum, sed pharetra turpis vehicula. Aenean eget velit varius, luctus neque molestie, mollis dui. Vestibulum nec dui urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum scelerisque lacus at mi finibus molestie condimentum eget dolor. Nulla sagittis erat vel diam mattis, eu aliquet lorem aliquam. Mauris volutpat felis condimentum eros scelerisque, convallis dignissim diam iaculis. Duis suscipit metus vehicula eros porttitor tristique. Proin orci quam, convallis sed imperdiet eu, pellentesque id purus. Duis bibendum interdum lectus. Integer magna ex, finibus ut dolor et, aliquam bibendum massa. Etiam ornare, magna quis viverra pretium, nibh nisi euismod augue, vulputate tincidunt eros dui mattis turpis.

Vivamus in sapien nec erat fermentum fermentum a at justo. Sed eu mauris tortor. Nunc euismod vulputate tristique. Pellentesque fermentum rutrum nunc, et placerat felis. Quisque cursus non sem et suscipit. Duis tempor pellentesque turpis sit amet facilisis. In id facilisis leo. Curabitur ultricies risus non est tincidunt, at fermentum eros molestie. Praesent nec arcu at justo tristique semper. In hac habitasse platea dictumst. Nam dapibus accumsan sem ac facilisis. Proin volutpat varius scelerisque.

Morbi maximus dui a elementum porta. Pellentesque sollicitudin pharetra augue non porta. In et tincidunt lectus, iaculis accumsan lacus. Etiam in consequat dolor. Vestibulum sodales orci bibendum, porttitor nunc eu, facilisis turpis. Mauris vitae lorem sollicitudin, placerat ante ut, pulvinar nibh. Ut nec mauris blandit, venenatis turpis in, molestie lacus. Aliquam interdum, ligula nec iaculis placerat, diam nisl iaculis dolor, sed porttitor neque orci sed nisl.

Ut vitae congue arcu, eu rhoncus ante. Vestibulum quis arcu ac ex vehicula sagittis. Integer volutpat tristique nisl, sodales consectetur enim rhoncus eu. Vivamus fermentum laoreet tincidunt. Mauris ac orci rutrum, faucibus arcu eu, sodales arcu. Aliquam facilisis risus vitae metus scelerisque, efficitur dignissim tortor congue. Fusce tincidunt turpis sed ornare faucibus. Sed nisl velit, vestibulum et tincidunt et, interdum quis magna. Cras a mi at augue varius faucibus egestas id nulla. Donec posuere ante imperdiet nibh laoreet, viverra cursus magna lobortis.

Integer convallis, leo ut suscipit luctus, nisi quam venenatis ligula, nec molestie magna mi et nisi. Morbi nisl erat, viverra ac mattis sit amet, mattis fermentum arcu. Curabitur congue, neque nec consectetur pharetra, magna lacus placerat magna, id dapibus ligula enim quis nisi. Aliquam elementum tellus eu vehicula vestibulum. Phasellus sollicitudin sodales dui, ac feugiat lorem pulvinar ut. Maecenas quis metus lorem. In vitae convallis ante. Morbi sagittis eros metus, quis commodo nulla faucibus bibendum. Nullam pharetra scelerisque massa eget pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Curabitur feugiat sem elit, sit amet vulputate eros dapibus nec. Morbi volutpat aliquam nunc ut ornare. In id massa ac dolor molestie cursus in id leo. Morbi non ornare orci. In in diam consequat, hendrerit felis non, accumsan dolor. Nam eget tellus ut nisl aliquam lacinia. Vestibulum tristique pretium lorem, ut vestibulum lorem aliquam non. Donec sollicitudin turpis non erat pretium maximus.

In ac venenatis odio. Nulla eleifend lacus ut sagittis convallis. Sed mollis odio ut nunc vestibulum ullamcorper eget sed mi. Donec eget elit eget velit consequat auctor at et erat. Fusce ac nibh tristique, tempus tellus vel, sollicitudin nisi. Proin turpis odio, auctor id erat nec, egestas ornare eros. Aenean sollicitudin tincidunt elit, vehicula pretium eros ultricies sed.

Morbi finibus volutpat sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et convallis leo. Integer nec cursus libero. Duis id lectus elit. Sed vel magna eget leo rutrum tristique quis maximus est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas sem lectus, imperdiet nec maximus in, pretium in massa. Fusce accumsan facilisis euismod. Suspendisse vel massa sed massa vehicula hendrerit sit amet eget orci. Fusce consectetur tincidunt varius.

Nam ipsum nulla, aliquet eget tristique vel, maximus et eros. Curabitur aliquet, ligula non porttitor placerat, felis enim tempor enim, eu egestas metus nunc non lorem. Duis id nisl scelerisque, convallis massa in, ornare tortor. Nunc scelerisque nisi a lectus sodales vulputate. Sed blandit justo sem, in suscipit augue tempus a. Phasellus imperdiet aliquet orci. Pellentesque blandit vulputate tempus. In tempor ante in lacus ullamcorper, in consectetur diam consectetur. Morbi luctus sapien non accumsan molestie. Integer felis ante, viverra vitae ornare eget, egestas non eros. Curabitur eleifend est convallis, ullamcorper ligula ac, aliquet quam. Vestibulum placerat tellus a massa finibus, nec iaculis sapien euismod. Fusce accumsan dolor purus, a fermentum sapien placerat id.

Maecenas ultricies neque et mauris scelerisque volutpat. Mauris hendrerit nulla dictum nunc ultrices tincidunt. Nulla maximus elit et quam dignissim, et cursus ante aliquet. Aenean pellentesque suscipit suscipit. Pellentesque interdum consequat nunc et pulvinar. Integer congue interdum mattis. Proin ut risus sapien.

Donec porta, eros vitae interdum gravida, justo nunc malesuada arcu, ac euismod erat tortor tempor augue. Suspendisse tempor porta lorem vitae viverra. Maecenas scelerisque vel elit vitae mollis. Nulla convallis euismod eros, vel suscipit odio malesuada a. Donec maximus mauris vitae ligula tristique vehicula. Phasellus aliquet iaculis odio, ac efficitur elit eleifend non. Aliquam accumsan felis quis consectetur porta. Suspendisse eget purus nec risus bibendum feugiat. Morbi posuere, leo non aliquet posuere, dolor mauris condimentum augue, quis vestibulum metus dui nec elit. Maecenas sit amet risus quis dolor finibus gravida a ac dolor. Praesent aliquet vel elit nec dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam lectus risus, commodo ac purus id, lobortis mattis diam. Donec pellentesque imperdiet tincidunt. Phasellus magna orci, sagittis sagittis augue quis, tempus varius enim. Nunc id sem vel odio faucibus mattis.

Integer eget porttitor mi, molestie dapibus diam. Sed et placerat tortor. Quisque nec euismod ligula. Praesent elit ipsum, dictum ac ipsum at, auctor interdum enim. Nulla eu venenatis nibh, a vestibulum turpis. Vivamus ut odio blandit, pretium justo ut, elementum metus. Maecenas et ante sed ante rhoncus consectetur vel non odio. In auctor lectus id felis suscipit, et faucibus neque gravida. Curabitur sagittis turpis in mi vehicula, sit amet lobortis ex laoreet. Aenean sagittis, tellus ac venenatis sodales, arcu est porta mauris, a pharetra arcu ipsum nec enim. Mauris eu pellentesque quam. Morbi cursus posuere tempus. Vivamus ac lacinia felis. Nam vitae sapien augue. Suspendisse potenti.

Cras tempus orci quis lacinia tempus. Sed at rutrum dui. Vestibulum tincidunt efficitur enim a rutrum. Nulla quis ligula eget felis convallis sodales. Phasellus auctor placerat pretium. Nunc neque dui, luctus id luctus eu, aliquam tincidunt nibh. Nulla nec porttitor elit.

Pellentesque luctus, odio at aliquam cursus, ipsum tellus condimentum arcu, at varius orci sapien sed enim. Donec tempus consequat elit sed rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque condimentum pharetra. In in commodo sapien, in porta justo. Proin nec arcu turpis. Etiam augue ipsum, tincidunt sit amet mollis eu, mollis in urna. In congue viverra nunc. Etiam auctor diam commodo, condimentum nunc ac, elementum dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sit amet dictum sem. Integer ac nisi semper libero scelerisque gravida. Pellentesque faucibus a nulla et volutpat. Quisque sed nunc nec diam elementum aliquet.

Proin ut libero eu elit suscipit convallis ut in metus. Nullam eget lacus quis sem rhoncus gravida laoreet eu dui. Integer vehicula rhoncus commodo. Morbi nisi erat, fringilla ut posuere ut, aliquet et tellus. Sed vitae laoreet nisl. In suscipit bibendum mi et fermentum. Phasellus vulputate a massa quis ornare. Curabitur pellentesque hendrerit tempus. Suspendisse potenti. Maecenas consequat neque quis est ultrices, volutpat faucibus nulla tincidunt. Sed finibus sollicitudin quam a aliquam. Curabitur pulvinar varius diam id tempor.

Cras et risus a nunc pharetra egestas. Nullam aliquet nunc nisl, sed pellentesque sapien feugiat viverra. Sed suscipit ligula sit amet massa convallis, ut luctus erat sagittis. Aliquam mollis sem urna, eu scelerisque mi laoreet nec. Etiam elit sem, pharetra a vulputate eu, posuere nec nisl. Nullam fringilla, lacus eget fringilla porta, ligula odio suscipit erat, scelerisque gravida metus eros quis velit. Duis fermentum lectus vel purus vehicula, eu lacinia erat dictum. Fusce elit mi, fermentum vel ligula convallis, iaculis volutpat mi. Quisque aliquet enim eget dictum aliquam. Phasellus hendrerit accumsan nisi. Nam ultricies, tortor et fermentum ultrices, enim magna tempor urna, nec lacinia purus purus sit amet tortor.

Suspendisse non lacus sodales, tempus enim vitae, aliquam justo. Fusce a gravida velit, eu sagittis tellus. Donec nec turpis vehicula, maximus felis a, pulvinar ipsum. Sed eu porta eros. Duis at vehicula tellus, vel ornare diam. Vivamus facilisis neque a egestas vulputate. Mauris vitae congue justo, egestas semper felis. Maecenas iaculis metus dignissim, semper lectus facilisis, auctor sapien. Maecenas efficitur, tortor eget aliquet aliquam, elit leo aliquam metus, eu consequat turpis ligula ut nulla. Cras et quam sed felis congue gravida. Phasellus venenatis dapibus nunc, tincidunt faucibus quam rutrum at.

Nullam suscipit sem quam, sed finibus elit ornare in. Aenean vehicula ipsum nisi, sed consectetur dolor pharetra et. Donec ut erat ut enim iaculis faucibus. Sed rhoncus sem id felis viverra scelerisque. Nam fringilla vestibulum nulla vitae molestie. Fusce viverra arcu et quam tincidunt ornare. Donec nec erat ac sapien semper imperdiet. Fusce vehicula, neque vitae finibus sodales, urna libero placerat nulla, at viverra sem lacus nec leo. Donec finibus nulla ut tincidunt facilisis. Donec ante sapien, pharetra a condimentum quis, ultricies ac elit.

Nulla massa tortor, rhoncus sit amet mattis non, convallis ut nulla. Morbi nisl arcu, imperdiet et urna id, bibendum mattis lectus. Cras sed leo odio. Donec eget vulputate dui. Maecenas elementum commodo nisi tincidunt dictum. Aliquam erat volutpat. Pellentesque at felis turpis. Curabitur a auctor orci. Phasellus eget malesuada purus.

Vestibulum blandit pharetra urna, eget aliquam justo porta convallis. Suspendisse vitae congue neque. Aliquam venenatis porttitor mauris, quis sollicitudin lectus ultrices quis. Morbi libero sapien, consectetur nec ante ac, condimentum volutpat augue. Maecenas porta viverra convallis. Nullam sed pulvinar ipsum. Maecenas suscipit interdum tincidunt. Proin dignissim luctus orci, eu faucibus sem lobortis vel. Suspendisse auctor euismod ultrices. Cras et lectus vel orci molestie vehicula id at lorem. Fusce convallis placerat urna quis euismod. Nam ac purus nec nunc pellentesque congue. Fusce interdum pharetra ligula sit amet blandit. Aliquam at hendrerit arcu, at hendrerit dolor.

Donec semper, augue vitae luctus scelerisque, nibh ante dignissim urna, vitae placerat eros est eget lacus. Nunc fermentum ornare eros sit amet euismod. Donec porttitor venenatis arcu, at tincidunt sem tempus eu. Morbi egestas mi feugiat lectus eleifend, at rutrum orci tempor. Nam in arcu congue, consequat massa vitae, sodales ante. Pellentesque ac eleifend neque, a cursus justo. Etiam sed posuere mauris, vel scelerisque lectus. Phasellus sollicitudin molestie enim, a ultrices est aliquam in. Maecenas dui elit, condimentum maximus ornare ac, tempor at eros. Fusce condimentum ultricies placerat.

Sed placerat, diam id luctus lacinia, nisi odio venenatis nisi, vel scelerisque elit eros quis lectus. Aenean aliquet massa id metus rhoncus luctus. Aliquam fringilla quam mi, eu convallis nisi viverra eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin eu elit a turpis congue lobortis id non velit. Pellentesque non sem non erat aliquet egestas. Nunc quis dolor massa.

Nulla cursus eleifend nisi, at porttitor libero fringilla non. Proin viverra laoreet ligula ac elementum. Vestibulum fermentum, ipsum sed imperdiet auctor, est lacus efficitur mauris, vitae consectetur risus nibh non ex. Praesent enim dolor, ullamcorper nec ultricies at, cursus vel ipsum. Proin non nulla ut justo egestas interdum ut sodales lorem. Nunc facilisis aliquam pellentesque. Quisque ornare posuere est ac vulputate. Vivamus ac luctus metus, ac finibus mauris. Suspendisse gravida eros felis, id iaculis tortor luctus a. Morbi vitae dolor libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed aliquet dolor a orci cursus, vitae porta eros laoreet. Nam suscipit gravida ex at malesuada. Quisque bibendum neque at lorem dignissim hendrerit. Sed at magna quis velit rhoncus tristique vitae ac ipsum.

Proin sed diam sit amet erat lobortis ornare non sit amet quam. Nunc id metus non tellus venenatis convallis in eu velit. Ut semper imperdiet gravida. Curabitur convallis hendrerit metus ut tristique. Nam sed augue in eros lobortis vehicula. Ut finibus ultrices massa, ut volutpat lectus. Nam et ultrices metus, a fermentum neque. Ut congue rhoncus turpis, ac malesuada lectus interdum nec. Suspendisse in sodales sem, id sodales massa. Sed eu erat ornare, aliquet massa pulvinar, finibus ipsum. Ut porta posuere lobortis. Donec vehicula purus non dui vestibulum, eu congue dolor maximus.

Etiam sodales massa et augue ultrices, id elementum sem accumsan. Donec eget lorem mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque et efficitur enim, a auctor elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum semper ultrices laoreet. Pellentesque in sapien odio. Nulla at purus nec velit finibus vulputate. Duis vehicula diam vulputate, ultricies nisl ut, posuere sapien. Suspendisse at nibh at ex consequat semper. Phasellus ante dui, rutrum ac mattis ut, lacinia sit amet augue. Aenean nisi est, interdum vitae hendrerit ut, faucibus eu nibh. Aliquam congue felis et purus bibendum, et ornare nibh imperdiet. Nam risus ante, convallis vitae justo non, dictum ultrices sapien. Integer metus enim, luctus ut erat eu, feugiat interdum enim. Phasellus nec hendrerit elit, a fringilla nibh.

Nunc commodo nulla eu metus facilisis tempor. Aenean malesuada dapibus elit in tempor. Etiam lacinia risus at consectetur egestas. Quisque feugiat molestie orci eu lacinia. Sed aliquam interdum blandit. Ut fringilla nulla mi, nec sagittis sem molestie id. Duis et turpis quis eros posuere ullamcorper. Nullam viverra odio tempor odio elementum, eget dignissim neque suscipit.

Fusce tristique scelerisque nisl at efficitur. Cras ac mi nec erat sollicitudin venenatis. Nam suscipit risus et est posuere viverra. Nunc mi mi, suscipit eget commodo vitae, mattis id dui. Aliquam sollicitudin vehicula eros, ac interdum mi. Fusce sit amet massa et ipsum tempor gravida. Maecenas quis iaculis elit. Quisque lacus erat, consectetur et sagittis ac, luctus a nibh. In venenatis eros purus, non rhoncus mi tempor at.

Nam nulla lorem, imperdiet quis mauris id, lobortis tincidunt eros. Nam id consectetur lacus. Maecenas vestibulum leo ac accumsan egestas. Vivamus quis condimentum augue. Suspendisse sollicitudin est ut magna pellentesque tristique. Donec quam turpis, tristique ut eros quis, pellentesque fringilla ante. Nam nec odio faucibus, vulputate metus ut, dignissim neque. Aenean a risus quis lacus sagittis fringilla. Nulla porta ex eget tincidunt commodo. Mauris elementum mauris metus, quis vestibulum est hendrerit ut. In scelerisque nisi in aliquam aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed elementum urna eu placerat convallis.

Cras lobortis arcu nisi, eu venenatis purus auctor ut. Donec feugiat ultricies pharetra. Vivamus fermentum aliquet enim, in viverra mi. Vestibulum orci magna, tempus ac lacus at, euismod ultrices odio. Aenean quis mollis purus. Integer condimentum semper lobortis. Mauris bibendum fringilla libero, quis congue turpis convallis id. Nullam et felis venenatis odio fringilla pulvinar. In ac efficitur mauris. Pellentesque aliquet commodo ex, eget fermentum magna tempus rhoncus. Sed eget elementum nisi. Donec ac imperdiet velit.

${_.separator}
`;

const { schema } = getBookSchema({ book: elementsListBook });

writeFileSync('./elements-list.json', JSON.stringify(schema, null, 2));
