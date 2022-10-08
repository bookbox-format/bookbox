import {
  BookBuilderParams,
  BookData,
  createBook,
  CreateBookParams,
  getPartialApply,
  parseNewLines,
} from "@bookbox/core";

import { getPanel } from "./htmlBookSettings";
import { getCssSizeStyle, getLayoutParams, parseSize } from "./layout";
import { HtmlToken, listToHtml } from "./model";
import { renderFormula } from "./math";
import { renderColorCode } from "./code";

const htmlElements: BookBuilderParams<HtmlToken>["elements"] = {
  title:
    ({ key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      return `<h1 class="book-box-title" data-key="${key}" data-name="title" data-layout="top">${childrenHtml}</h1>`;
    },
  authors:
    ({ key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      return `<div class="book-box-authors" data-key="${key}" data-name="authors" data-layout="top">${childrenHtml}</div>`;
    },
  draft:
    ({ key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      return `<div class="book-box-draft" data-key="${key}" data-name="draft" data-layout="top">${childrenHtml}</div>`;
    },
  header:
    ({ level, key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      const elem = `h${level}`;
      return `<div class="book-box-header-container" data-key="${key}" data-name="header" data-layout="top">
                <${elem} class="book-box-header">
                    ${childrenHtml}
                    <div class="book-box-header-mark book-box_clickable" onclick="this.scrollIntoView();">§</div>
                </${elem}>
            </div>`;
    },
  strong:
    ({ key }) =>
    ({ children }) =>
      `<strong data-key="${key}" data-name="strong" data-layout="top">${listToHtml(
        children
      )}</strong>`,
  em:
    ({ key }) =>
    ({ children }) =>
      `<em data-key="${key}" data-name="em" data-layout="top">${listToHtml(
        children
      )}</em>`,
  format: {
    b:
      ({ key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        return `<b data-key="${key}" data-name="format.b" data-layout="top">${childrenHtml}</b>`;
      },
    i:
      ({ key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        return `<i data-key="${key}" data-name="format.i" data-layout="top">${childrenHtml}</i>`;
      },
    sub:
      ({ key }) =>
      ({ children }) =>
        `<sub data-key="${key}" data-name="format.sub" data-layout="top">${listToHtml(
          children
        )}</sub>`,
    sup:
      ({ key }) =>
      ({ children }) =>
        `<sup data-key="${key}" data-name="format.sup" data-layout="top">${listToHtml(
          children
        )}</sup>`,
    pre:
      ({ key }) =>
      ({ children }) =>
        `<span><pre data-key="${key}" data-name="format.pre" style="display: inline-block;margin: 0; padding: 0 4px; line-height: 1em; overflow: unset;">${listToHtml(
          children
        )}</pre></span>`,
    small:
      ({ inline, key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        const elem = inline ? "span" : "div";

        return `<${elem} data-key="${key}" class="book-box-format-small" data-name="format.small" data-layout="top">${childrenHtml}</${elem}>`;
      },
  },
  web: {
    video:
      (props) =>
      ({ children }) => {
        const {
          type,
          src = "",
          alt,
          width,
          height = "50%",
          inline,
          block,
          position,
          key,
        } = props;
        const loadableId = `${key}-loadable`;

        const video = getIframe({
          id: loadableId,
          width,
          height,
          src,
          alt,
          type: "video",
        });
        const content = getFigure(video, listToHtml(children));
        const { view, position: layoutPosition } = getLayoutParams({
          inline,
          block,
          position,
        });
        return `<div
                    class="book-box-web-video book-box_media-${view} book-box_media-${layoutPosition}"
                    data-key="${key}"
                    data-name="web.video"
                    data-layout="top"
                >
                    ${content}
                </div>`;
      },
    audio:
      ({
        src = "",
        alt,
        key = "",
        inline,
        block,
        position,
        width,
        height = "50%",
      }) =>
      ({ children }) => {
        const audio = getIframe({
          id: key,
          width,
          height,
          src,
          alt,
          type: "audio",
        });
        const content = getFigure(audio, listToHtml(children));
        const { view, position: layoutPosition } = getLayoutParams({
          inline,
          block,
          position,
        });
        return `<div class="book-box-web-audio book-box_media-${view} book-box_media-${layoutPosition}" data-key="${key}" data-name="web.audio" data-layout="top">
                    ${content}
                </div>`;
      },
    message:
      ({
        src = "",
        type,
        inline,
        block,
        position,
        width,
        height = "50%",
        alt,
        key = "",
      }) =>
      ({ children }) => {
        const message = getIframe({
          id: key,
          width,
          height,
          src,
          alt,
          type: "message",
        });
        const content = getFigure(message, listToHtml(children));
        const { view, position: layoutPosition } = getLayoutParams({
          inline,
          block,
          position,
        });
        return `<div class="book-box-web-message book-box_media-${view} book-box_media-${layoutPosition}" data-key="${key}" data-name="web.message" data-layout="top">
                    ${content}
                </div>`;
      },
  },
  code:
    ({ lang, key, inline, block, position = 'full' }) =>
    ({ children, store }) => {
      const { view, position: layoutPosition } = getLayoutParams({
        inline,
        block,
        position,
      });
      const langAttribute = lang ? `data-code-language="${lang}"` : "";
      const langMark = lang ? `<div class="book-box-code-lang-mark">${lang}</div>` : "";
      const rawChildren = store.elementsByKeys[key ?? ''].children;
      const colorCodeHtml = renderColorCode({ text: rawChildren.join(""), lang });
      const codeHtml = `<div style="width: 100%">${langMark}<pre><code ${langAttribute}>${colorCodeHtml}</code></pre></div>`;
      const content = position === 'full' ? codeHtml : getFigure(codeHtml, '');
      return `<div class="book-box-code ${lang ? 'book-box-code-with-lang' : ''} book-box_media-${view} book-box_media-${layoutPosition}" data-key="${key}" data-name="code" data-layout="top">${content}</div>`;
    },
  label:
    ({ key, ref = "" }) =>
    ({ children, store }) => {
      const childrenHtml = listToHtml(children);
      const labelId = `label-${key}`;
      const data = store.dataByKeys[ref] ?? [];
      const panel = getPanel({
        prefix: labelId,
        tumbler: {
          content: childrenHtml,
          classes: ["book-box-label-mark"],
          inputClasses: ["book-box-label-input"],
        },
        panel: {
          content: `<div class="book-box-label-panel-content">
          ${listToHtml(data)}
            <div class="book-box-label-panel-goto" onclick="gotoKey('${ref}')">→</div>
            </div>`,
          classes: ["book-box-label-data"],
          name: `<div class="book-box-label-panel-header">label: <div class="book-box-label-panel-mark">${childrenHtml}</div>
          <div class="book-box-label-panel-goto" onclick="gotoKey('${key}')">→</div></div>`,
        },
      });
      return `<div class="book-box-label" data-key="${key}" data-name="label" data-ref="${ref}" data-layout="top">${panel}</div>`;
    },
  tooltip:
    ({ content, key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      const labelId = `label-${key}`;
      const data = [`${content}`];
      const panel = getPanel({
        prefix: labelId,
        tumbler: {
          content: childrenHtml,
          classes: ["book-box-label-mark"],
          inputClasses: ["book-box-label-input"],
        },
        panel: {
          content: `<div class="book-box-label-panel-content">${listToHtml(
            data
          )}</div>`,
          classes: ["book-box-label-data"],
          name: `tooltip: <div class="book-box-label-panel-mark">${childrenHtml}</div>`,
        },
      });
      return `
                <div class="book-box-label" data-key="${key}" data-name="tooltip" data-layout="top">
                    ${panel}
                </div>
            `;
    },
  link:
    ({ ref, href, key }) =>
    ({ children }) => {
      const content = children.length > 0 ? children : [href ?? ref ?? ""];
      const childrenHtml = listToHtml(content);
      return href
        ? `<a class="book-box-link book-box_clickable" href="${href}" data-key="${key}" data-name="link">${childrenHtml}</a>`
        : `<span class="book-box-link book-box_clickable" data-key="${key}" data-name="link" onclick="gotoKey('${ref}')" data-layout="top">${childrenHtml}</span>`;
    },
  image:
    ({
      src = "/~~non-exist.png",
      alt,
      position = "center",
      height = 1,
      width = 1,
      block,
      inline,
      key,
    }) =>
    ({ children }) => {
      const isSvg = src.endsWith(".svg");

      const heightSize = parseSize(height ?? 1);
      const widthSize = parseSize(width ?? 1);

      const sizeBlockStyle = getCssSizeStyle({
        width: widthSize,
        height: heightSize,
      });

      const { view, position: layoutPosition } = getLayoutParams({
        inline,
        block,
        position,
      });

      const svgSource = isSvg
        ? `<source type="image/svg+xml" srcSet="${src}" />`
        : "";
      const image = `<picture style="${sizeBlockStyle}; width: 100%">
                ${svgSource}
                <img style="${sizeBlockStyle}" src="${src}" alt="${alt}" loading="lazy"/>
            </picture>`;

      const content = getFigure(image, listToHtml(children));

      return `<div
                class="book-box-image book-box_media-${view} book-box_media-${layoutPosition}"
                data-key="${key}"
                data-layout="top"
            >
                ${content}
            </div>`;
    },
  video:
    ({
      src,
      alt = "",
      position = "center",
      height = 1,
      width = 1,
      block,
      inline,
      key,
    }) =>
    ({ children }) => {
      const heightSize = parseSize(height);
      const widthSize = parseSize(width);
      const sizeBlockStyle = getCssSizeStyle({
        width: widthSize,
        height: heightSize,
      });

      const { view, position: layoutPosition } = getLayoutParams({
        inline,
        block,
        position,
      });
      const video = `<video src="${src}" data-key="${key}" controls style="${sizeBlockStyle}">${alt}</video>`;

      const content = getFigure(video, listToHtml(children));

      return `<div
                class="book-box-video book-box_media-${view} book-box_media-${layoutPosition}"
                data-name="video"
                data-key="${key}"
                data-layout="top"
            >
                ${content}
            </div>`;
    },
  audio:
    ({ src, alt = "", key, inline, block, position = "center" }) =>
    ({ children }) => {
      const { view, position: layoutPosition } = getLayoutParams({
        inline,
        block,
        position,
      });

      const audio = `<audio controls src="${src}">${alt}</audio>`;
      const content = getFigure(audio, listToHtml(children));
      return `<div
                class="book-box-audio book-box_media-${view} book-box_media-${layoutPosition}"
                data-key="${key}"
                data-name="audio"
                data-layout="top"
            >
                ${content}
            </div>`;
    },
  math:
    ({ key = "", position = "inline", inline, block }) =>
    ({ children, store }) => {
      const { view, position: layoutPosition } = getLayoutParams({
        inline,
        block,
        position,
      });
      const rawChildren = store.elementsByKeys[key].children;

      const content = renderFormula(
        rawChildren.map(String).join(""),
        view === "block"
      );

      return `<div
                class="book-box-math book-box_media-${view} book-box_media-${layoutPosition}"
                data-key="${key}"
                data-name="math"
                data-layout="top"
            >
                ${content}
            </div>`;
    },
  area:
    ({ key, inline = false, meta }) =>
    ({ children }) =>
      `<div class="book-box-area ${
        inline ? "book-box-area-inline" : ""
      }" data-name="area" data-key="${key}" data-layout="top">${listToHtml(
        children
      )}</div>`,
  item:
    ({ key }) =>
    ({ children }) =>
      `<li data-key="${key}" data-name="item" data-layout="top">${listToHtml(
        children
      )}</li>`,
  list:
    ({ order, key }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      const elem = order ? "ol" : "ul";
      return `<${elem}
                data-key="${key}"
                data-name="list"
                class="book-box-list"
                data-layout="top"
            >
                ${childrenHtml}
            </${elem}>`;
    },
  separator:
    ({ key }) =>
    () =>
      `<hr data-key="${key}" data-name="separator" class="book-box-separator" data-layout="top"/>`,
  external:
    ({ scope = "custom", name = "local", params }) =>
    ({ children }) => {
      const childrenHtml = listToHtml(children);
      const paramsStr = params ? JSON.stringify(params) : "";
      return `<div data-name="external" class="book-box-external" style="" data-layout="top">
                <p style="color: gray">
                    External: ${scope}.${name}
                </p>
                ${paramsStr ? `params: <pre>${paramsStr}</pre>` : ""}
                ${childrenHtml}
            </div>`;
    },

  counter:
    () =>
    ({ children }) =>
      `<span>${listToHtml(children)}</span>`,
  use:
    ({ ref = "", path }) =>
    ({ children, store }) => {
      const targetElement = store.elementsByKeys[ref];
      let content = listToHtml(children);
      if (targetElement !== undefined) {
        if (path !== undefined) {
          const metaValue = (targetElement.props.meta ?? ({} as any))[path];
          if (metaValue !== undefined) {
            content = `${metaValue}`;
          }
        } else {
          const targetToken = store.dataByKeys[ref];
          if (targetToken !== undefined) {
            content = listToHtml(targetToken);
          }
        }
      }
      return content;
    },
  resource: () => () => "",
};

export const htmlSynteticElements: BookBuilderParams<HtmlToken>["synteticElements"] =
  {
    text:
      ({ raw = "" }) =>
      () =>
        `${parseNewLines("<br/>")(
          raw.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        ).join("")}`,
    page:
      ({ count, key }) =>
      ({ children }) =>
        `<span
                id="page-${count}"
                class="book-box-page book-box_clickable"
                data-page="${count}"
                data-key="${key}"
                data-name=".page"
                href="#page-${count}"
                onclick="this.scrollIntoView();"
            >${listToHtml(children)}</span>`,
    error:
      ({ props, name, error }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        const propsStr = JSON.stringify(props);
        return `<div data-name=".error" class="book-box--error">
                Error for element <i>${name}</i>:
                <p style="color: red">
                    ${error ?? ""}
                    <pre>${propsStr}</pre>
                </p>
                ${childrenHtml}
            </div>`;
      },
    empty: () => () => "",
  };

const htmlBuilder: BookBuilderParams<HtmlToken> = {
  elements: htmlElements,
  synteticElements: htmlSynteticElements,
};

export const createHtmlBook = getPartialApply<
  CreateBookParams<HtmlToken>,
  "builder",
  BookData<HtmlToken>
>(createBook, { builder: htmlBuilder });

function getFigure(content: string, caption: string): string {
  return `<figure class="book-box_media-figure">
        <div>${content}</div>
        <figcaption class="book-box_media-figure-caption"><div>${caption}</div></figcaption>
    </figure>`;
}

function getIframe({
  id,
  width,
  height,
  src,
  type,
  alt,
}: {
  id: string;
  width?: number | string;
  height?: number | string;
  src: string;
  type: string;
  alt?: string;
}): HtmlToken {
  const heightSize = parseSize(height);
  const widthSize = parseSize(width);
  const sizeBlockStyle = getCssSizeStyle({
    width: widthSize,
    height: heightSize,
  });
  const loadableId = `${id}-loadable`;
  const altText = alt ?? `${type} <a href="${src}" class="book-box-link book-box_clickable">${src}</a>`;
  return `<div style="width: 100%; height:100%; ${sizeBlockStyle}" class="book-box_loadable" id="${loadableId}">
    <iframe
        style="width: 100vw; height:100vh; ${sizeBlockStyle}"
        src=${src}
        class="book-box_loadable-content"
        frameborder="0"
        allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"
        data-alt="${alt}"
        onload="this.parentNode.classList.add('book-box_loadable-loaded')"
        onerror="this.parentNode.classList.add('book-box_loadable-error-loaded')"
    >
    </iframe>
    <script>window.setTimeout(() => document.getElementById('${loadableId}').classList.add('book-box_loadable-loaded'), 5000)</script>
    <div class="book-box_loadable-error">${alt}</div>
    <div class="book-box_loadable-progress" style="width: 100%; height: ${heightSize}vh; ${sizeBlockStyle}">
        <p style="padding: 1rem;">${altText}<p>
        <button onclick="document.getElementById('${loadableId}').classList.add('book-box_loadable-loaded')">Show raw iframe</button>
    </div>
</div>`;
}
