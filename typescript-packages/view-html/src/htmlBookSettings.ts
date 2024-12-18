import { BookHeader, BookItemMeta, BookStore, rootBookHeader } from '@bookbox/core';

import { BookBoxHtmlGenerateParams, BookBoxHtmlParams, BookBoxNavigationItem, HtmlToken, listToHtml } from './model';

export function getBookBoxHtmlSettings({
  bookData,
  settingsOptions,
  layoutOptions,
}: BookBoxHtmlGenerateParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { viewTumbler = true, design = true, media = true, contents = true, custom = {} } = settingsOptions ?? {};
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
      ${Object.keys(custom)
        .map(settingsNamespace => {
          const { icon, getItems } = custom[settingsNamespace];
          const items = getItems({ bookData });
          return getNavigationPanel({
            settingsNamespace,
            icon,
            content: listToHtml(items.map(item => getBookBoxHtmlNavigationItem({ ...item, settingsNamespace }))),
          });
        })
        .join('\n')}
    </div>
    `;
}

export function getBookBoxHtmlSettingsDesign({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { contents } = meta;
  const themes = ['light', 'dark', 'sepia'];
  const getThemeItem = (theme: string, color: string, name: string) => `
<div
  onclick="
    document.querySelector('.book-box').classList.add('book-box_theme-${theme}');
    ${themes
      .filter(x => theme !== x)
      .map(otherTheme => `document.querySelector('.book-box').classList.remove('book-box_theme-${otherTheme}');`)
      .join('')}
    localStorage.setItem('book-box-theme', '${theme}')
  "
  class="book-box_layout-settings-design-theme"
>
  <div style="background: ${color}"></div>
  ${name}
</div>`;

  const content = `<div>
  <h2>Theme</h2>
  <div style="display: flex; gap: 16px">
  ${getThemeItem('light', 'white', 'Light')}
  ${getThemeItem('dark', 'var(--book-box-color-label-dark)', 'Dark')}
  ${getThemeItem('sepia', 'var(--book-box-color-label-sepia)', 'Sepia')}
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

interface GetBookBoxHtmlNavigationItemParams {
  settingsNamespace: string;
}

function getBookBoxHtmlNavigationItem(params: GetBookBoxHtmlNavigationItemParams & BookBoxNavigationItem) {
  const { settingsNamespace, key, value, level = 1 } = params;
  const offset = Math.max(level, 1);
  const offsetCss = `${offset * 2}ch`;
  return `<div
        class="book-box_layout-settings-navigation_item book-box_layout-settings-${settingsNamespace}-item"
        style="padding-left: ${offsetCss};"
        data-level="${level}"
        data-ref-key="${key}"
        onclick="gotoKey('${key}')"
    >
        ${listToHtml(value)}
    </div>`;
}

function getBookBoxHtmlContentHeader(item: BookHeader<HtmlToken>): HtmlToken {
  const { value, level, key } = item;
  return getBookBoxHtmlNavigationItem({ settingsNamespace: 'contents', key, value, level });
}

function getNavigationPanel(params: { settingsNamespace: string; icon: HtmlToken; content: HtmlToken }) {
  const { settingsNamespace, icon, content } = params;

  const panel = getPanel({
    prefix: `settings-${settingsNamespace}`,
    tumbler: { content: icon, classes: ['book-box_layout-settings-item'] },
    panel: {
      content,
      name: settingsNamespace[0].toUpperCase() + settingsNamespace.slice(1),
      classes: ['book-box_layout-settings-panel'],
    },
    fast: true,
  });

  return `<div class="book-box_layout-settings-namespace book-box_layout-settings-${settingsNamespace}">
        ${panel}
    </div>`;
}

export function getBookBoxHtmlSettingsContents({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { contents } = meta;
  const content = listToHtml(contents.map(getBookBoxHtmlContentHeader));

  return getNavigationPanel({ content, icon: '📚', settingsNamespace: 'contents' });
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
