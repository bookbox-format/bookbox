import { BookHeader, BookItemMeta, BookStore, rootBookHeader } from '@bookbox/core';

import { BookBoxHtmlGenerateParams, BookBoxHtmlParams, HtmlToken, listToHtml } from './model';

export function getBookBoxHtmlSettings({
  bookData,
  settingsOptions,
  layoutOptions,
}: BookBoxHtmlGenerateParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { viewTumbler = true, design = true, media = true, contents = true } = settingsOptions ?? {};
  const { fullPage = false } = layoutOptions ?? {};
  const viewId = `settings-view`;
  return `
  <input type="checkbox" id="${viewId}" style="display: none;" class="book-box_layout-settings-view-tumbler" value="1" ${
    fullPage ? 'checked' : ''
  }/>
    <label for="${viewId}" class="book-box_layout-settings-item book-box_layout-settings-view" ${
    viewTumbler ? '' : `style="display:none"`
  }></label>
    <div class="book-box_layout-settings">
      ${design ? getBookBoxHtmlSettingsDesign({ bookData }) : ''}
      ${media ? getBookBoxHtmlSettingsMedia({ bookData }) : ''}
      ${contents ? getBookBoxHtmlSettingsContents({ bookData }) : ''}
    </div>
    `;
}

export function getBookBoxHtmlSettingsDesign({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { contents } = meta;
  const content = `<div>
  <h2>Theme</h2>
  <div style="display: flex; gap: 16px">
  <div onclick="document.querySelector('.book-box').classList.remove('book-box_theme-dark');localStorage.setItem('book-box-theme', 'light')" class="book-box_layout-settings-design-theme"><div></div>Light</div>
  <div onclick="document.querySelector('.book-box').classList.add('book-box_theme-dark');localStorage.setItem('book-box-theme', 'dark')" class="book-box_layout-settings-design-theme"><div></div>Dark</div>
  </div>
  </div>`;
  const panel = getPanel({
    prefix: 'settings-design',
    tumbler: { content: '🛠', classes: ['book-box_layout-settings-item'] },
    panel: {
      content,
      name: 'Settings',
      classes: ['book-box_layout-settings-panel'],
    },
    fast: true,
  });
  return `<div class="book-box_layout-settings-design">
        ${panel}
    </div>`;
}

function getBookBoxHtmlContentHeader(item: BookHeader<HtmlToken>): HtmlToken {
  const { value, level, key } = item;
  const offset = Math.max(level, 1);
  const offsetCss = `${offset * 2}ch`;
  return `<div
        class="book-box_layout-settings-contents-item"
        style="padding-left: ${offsetCss};"
        data-level="${level}"
        data-ref-key="${key}"
        onclick="gotoKey('${key}')"
    >
        ${listToHtml(value)}
    </div>`;
}

export function getBookBoxHtmlSettingsContents({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { contents } = meta;
  const content = listToHtml(contents.map(getBookBoxHtmlContentHeader));
  const panel = getPanel({
    prefix: 'settings-contents',
    tumbler: { content: '📚', classes: ['book-box_layout-settings-item'] },
    panel: {
      content,
      name: 'Contents',
      classes: ['book-box_layout-settings-panel'],
    },
    fast: true,
  });
  return `<div class="book-box_layout-settings-contents">
        ${panel}
    </div>`;
}

function bookBoxHtmlSettingsMediaBlockGetter(
  mediaMeta: BookItemMeta,
  store: BookStore<HtmlToken>,
  type: 'grid' | 'list',
) {
  return (header: BookHeader<HtmlToken>) => {
    const { key, value } = header;
    const mediaKeys = mediaMeta.keysByHeader[key] ?? [];
    if (mediaKeys.length === 0) {
      return '';
    }
    const mediaValues = mediaKeys
      .map(imgKey => [imgKey, store.dataByKeys[imgKey]] as const)
      .filter(e => Boolean(e[1]))
      .map(
        ([key, imgHtml]) => `<div style="overflow: hidden;" onclick="gotoKey('${key}')">${listToHtml(imgHtml)}</div>`,
      );

    if (mediaValues.length === 0) {
      return '';
    }
    const mediaList = mediaValues;
    const mediaListHtml = listToHtml(mediaList);
    return `<div style="padding: 1rem;">
                <div>${listToHtml(value)}</div>
                <div class="book-box_layout-settings-media-${type}">${mediaListHtml}</div>
            </div>`;
  };
}

export function getBookBoxHtmlSettingsMedia({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { meta, store } = bookData;
  const { contents, media } = meta;
  const mediaId = `panel-media`;
  const getImages = bookBoxHtmlSettingsMediaBlockGetter(media.image, store, 'grid');
  const getAudio = bookBoxHtmlSettingsMediaBlockGetter(media.audio, store, 'list');

  const getVideo = bookBoxHtmlSettingsMediaBlockGetter(media.video, store, 'list');
  const headers = [rootBookHeader, ...contents];

  const imgContent = listToHtml(headers.map(getImages));
  const audioContent = listToHtml(headers.map(getAudio));
  const videoContent = listToHtml(headers.map(getVideo));
  const tabs = getTabs(
    [
      { tab: 'images', content: imgContent },
      { tab: 'video', content: videoContent },
      { tab: 'audio', content: audioContent },
    ].filter(e => e.content !== ''),
    'layout-media',
  );
  const panel = getPanel({
    prefix: 'settings-media',
    tumbler: { content: '🖼', classes: ['book-box_layout-settings-item'] },
    panel: {
      content: tabs,
      name: `Media`,
      classes: ['book-box_layout-settings-panel'],
    },
  });
  return `<div class="book-box_layout-settings-media">
        ${panel}
    </div>`;
}

type HtmlBlock = { content: HtmlToken; classes?: string[] };
export function getPanel({
  prefix,
  tumbler,
  panel,
  fast,
}: {
  prefix: string;
  tumbler: HtmlBlock & { inputClasses?: string[] };
  panel: HtmlBlock & { name?: string };
  fast?: boolean;
}): HtmlToken {
  const id = `${prefix}-panel`;
  return `<input type="checkbox" id="${id}" class="book-box_layout-panel-tumbler ${
    fast ? 'book-box_layout-panel-tumbler-fast' : ''
  } ${(tumbler.inputClasses ?? []).join(' ')}" value="1"/>
    <label for="${id}" class="${(tumbler.classes ?? []).join(' ')}">
        ${tumbler.content}
    </label>
    <div class="book-box_layout-panel ${(panel.classes ?? []).join(' ')}">
        <label for="${id}">&nbsp;</label>
        <div class="book-box_layout-panel-content">
            <div class="book-box_layout-panel-header">
                <div>${panel.name ?? ''}</div>
                <label for="${id}" class="book-box_control-close book-box_clickable">×</label>
            </div>
            ${panel.content
              .replace(/<input type="checkbox" id="(\w+|-)+"/g, `<input type="checkbox"`)
              .replace(/data-layout="top"/g, '')}
        </div>
    </div>`;
}

type TabData = { tab: HtmlToken; content: HtmlToken };
function getTabs(tabsData: TabData[], prefix: string): HtmlToken {
  const tabList = tabsData.map(({ tab }, i) => {
    const id = `${prefix}-tab-${i}`;
    return `<input type="radio" id="${id}" name="tabs-${prefix}" ${
      i === 0 ? 'checked' : ''
    }></input><label for="${id}">${tab}</label>`;
  });
  const contentList = tabsData.map(({ content }, i) => {
    return `<div class="book-box_layout-tabs-content">${content}</div>`;
  });
  return `<div class="book-box_layout-tabs">
        ${listToHtml(tabList)}
        ${listToHtml(contentList)}
    </div>`;
}
