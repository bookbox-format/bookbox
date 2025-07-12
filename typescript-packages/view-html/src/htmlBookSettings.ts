import { BookHeader, BookItemMeta, BookStore, rootBookHeader } from '@bookbox/core';

import { BookBoxHtmlGenerateParams, BookBoxHtmlParams, BookBoxNavigationItem, HtmlToken, listToHtml } from './model';

const SETTINGS_ICONS = {
  contents: '📚',
  media: '🖼',
  design: '🛠',
};

export function getBookBoxHtmlSettings({
  bookData,
  settingsOptions,
  layoutOptions,
}: BookBoxHtmlGenerateParams): HtmlToken {
  const { tokens, meta, store } = bookData;

  const { viewTumbler = true, viewItems = true, design = true, media = true, contents = true, custom = {} } = settingsOptions ?? {};
  const { fullPage = false } = layoutOptions ?? {};
  const viewId = `settings-view`;
  const settingsId = `settings-settings`;
  return `
  <input type="checkbox" id="${viewId}" style="display: none;" class="book-box_layout-settings-view-tumbler" value="1" ${
    fullPage ? 'checked' : ''
  }/>
    <label for="${viewId}" class="book-box_layout-settings-item book-box_layout-settings-view" ${
    viewTumbler ? '' : `style="display:none"`
  } onclick="let p = bbx.getCurrentPage() || 0; (document.fullscreenElement && document.exitFullscreen ? document.exitFullscreen() : document.querySelector('.book-box').requestFullscreen()).then(() => bbx.gotoKey('page-' + p))"></label>
  <input type="checkbox" id="${settingsId}" style="display: none;" class="book-box_layout-settings-settings-tumbler" value="1" />`;
}

export function getBookBoxHtmlSettingsTabs({ bookData, settingsOptions }: BookBoxHtmlGenerateParams) {
  const getContent = (name: string, body: string) =>
    `<div class="book-box_layout-settings-namespace book-box_layout-settings-${name}"">${body}</div>`;
  const { custom = {}, design = true, media = true, contents = true } = settingsOptions ?? {};
  const tabs = getTabs(
    [
      ...(contents
        ? [
            {
              tab: SETTINGS_ICONS.contents,
              content: getContent('contents', getBookBoxHtmlSettingsContentsContent({ bookData })),
            },
          ]
        : []),
      ...(media
        ? [
            {
              tab: SETTINGS_ICONS.media,
              content: getContent('media', getBookBoxHtmlSettingsMediaContent({ bookData }, 'settings-tabs_')),
            },
          ]
        : []),
      ...(design
        ? [
            {
              tab: SETTINGS_ICONS.design,
              content: getContent('design', getBookBoxHtmlSettingsDesignContent({ bookData })),
            },
          ]
        : []),
      ...Object.keys(custom).map(settingsNamespace => {
        const { icon, getItems } = custom[settingsNamespace];
        const items = getItems({ bookData });
        return {
          tab: icon,
          content: listToHtml(items.map(item => getBookBoxHtmlNavigationItem({ ...item, settingsNamespace }))),
        };
      }),
    ],
    'settings-tabs',
  );

  return tabs;
}

export function getBookBoxHtmlSettingsDesignContent({ bookData }: BookBoxHtmlParams): HtmlToken {
  const getThemeItem = (theme: string, color: string, name: string) => `
<div
  onclick="bbx.setTheme({theme: '${theme}'})"
  class="book-box_layout-settings-design-theme"
>
  <div style="background: ${color}"></div>
  ${name}
</div>`;

  const content = `<div style="padding: 0 8px">
  <h2>Theme</h2>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
  ${getThemeItem('light', 'white', 'Light')}
  ${getThemeItem('dark', 'var(--book-box-color-label-dark)', 'Dark')}
  ${getThemeItem('sepia', 'var(--book-box-color-label-sepia)', 'Sepia')}
  </div>
</div>`;
  return content;
}

export function getBookBoxHtmlSettingsDesign({ bookData }: BookBoxHtmlParams): HtmlToken {
  return getNavigationPanel({
    settingsNamespace: 'design',
    icon: SETTINGS_ICONS.design,
    content: getBookBoxHtmlSettingsDesignContent({ bookData }),
  });
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
        onclick="bbx.gotoKey('${key}')"
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

export function getBookBoxHtmlSettingsContentsContent({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  const { contents } = meta;
  const content = listToHtml(contents.map(getBookBoxHtmlContentHeader));
  return content;
}

export function getBookBoxHtmlSettingsContents({ bookData }: BookBoxHtmlParams): HtmlToken {
  const content = getBookBoxHtmlSettingsContentsContent({ bookData });

  return getNavigationPanel({ content, icon: SETTINGS_ICONS.contents, settingsNamespace: 'contents' });
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
        ([key, imgHtml]) =>
          `<div class="book-box_layout-settings-media-item" onclick="bbx.gotoKey('${key}')"><div>${listToHtml(imgHtml)}</div><div>→</div></div>`,
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

export function getBookBoxHtmlSettingsMediaContent({ bookData }: BookBoxHtmlParams, prefix = ''): HtmlToken {
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
    prefix + 'layout-media',
  );

  return tabs;
}

export function getBookBoxHtmlSettingsMedia({ bookData }: BookBoxHtmlParams): HtmlToken {
  return getNavigationPanel({
    settingsNamespace: 'media',
    icon: SETTINGS_ICONS.media,
    content: getBookBoxHtmlSettingsMediaContent({ bookData }),
  });
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
