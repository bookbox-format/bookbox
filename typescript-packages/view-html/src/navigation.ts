type CurrentNavigationData = { index: number | null; visible: Set<number> };

const contentsSelector = '.book-box_layout-settings-contents';
const currentHeaderClass = 'book-box_layout-settings-contents-item-current';
const currentHeaderSelector = `.${currentHeaderClass}`;

const getHeadersNavigationCallback =
  (listHeaders: HTMLElement[], listHeadersMap: Map<string, number>, current: CurrentNavigationData) =>
  (entries: IntersectionObserverEntry[]) => {
    const headersElem = document.querySelector(contentsSelector) as HTMLElement;
    if (!headersElem) {
      return;
    }
    const { targetIndex } = getCurrentItemIndex({
      listMap: listHeadersMap,
      current,
      entries,
    });

    if (targetIndex === current.index) {
      return;
    }

    const targetElem = listHeaders[targetIndex];
    // возможно заменить на прямой индекс
    const currentElem = headersElem.querySelector(currentHeaderSelector);
    if (currentElem) {
      currentElem.classList.remove(currentHeaderClass);
    }
    targetElem.classList.add(currentHeaderClass);
    targetElem.parentElement!.scrollTop = targetElem.offsetTop - 50;
    current.index = targetIndex;
  };

const getPagesNavigationCallback =
  (listPagesMap: Map<string, number>, current: CurrentNavigationData) => (entries: IntersectionObserverEntry[]) => {
    const { targetIndex } = getCurrentItemIndex({
      listMap: listPagesMap,
      current,
      entries,
    });

    if (targetIndex === current.index) {
      return;
    }

    replaceHistory({ hash: `page-${targetIndex}` });
    current.index = targetIndex;
  };

type URLOptions = Partial<Omit<URL, 'origin' | 'searchParams'>>;
function getUrl(url: string | URL, options?: URLOptions) {
  const targetUrl = typeof url === 'string' ? new URL(url) : url;
  Object.assign(targetUrl, options ?? {});

  return targetUrl;
}

export function replaceHistory(options: Partial<URL>) {
  window.history.replaceState(null, '', getUrl(window.location.toString(), options));
}

export function pushHistory(options: Partial<URL>) {
  window.history.pushState(null, '', getUrl(window.location.toString(), options));
}

function getCurrentItemIndex({
  listMap,
  current,
  entries,
}: {
  listMap: Map<string, number>;
  current: CurrentNavigationData;
  entries: IntersectionObserverEntry[];
}) {
  let overTopMaximum: number = -Infinity;
  let overBottomMinimum: number = Infinity;
  for (const entry of entries) {
    const { isIntersecting, target, boundingClientRect, intersectionRect } = entry;
    const border = getBorder({ boundingClientRect, intersectionRect });
    const key = (target as HTMLElement).dataset.key ?? '';
    const i = listMap.get(key) ?? 0;
    if (isIntersecting) {
      current.visible.add(i);
    } else {
      current.visible.delete(i);
      if (border === 'top') {
        // исчезание сверху
        if (i > overTopMaximum) {
          overTopMaximum = i;
        }
      } else if (border === 'bottom') {
        // исчезание снизу
        if (i < overBottomMinimum) {
          overBottomMinimum = i;
        }
      }
    }
  }

  let targetIndex = current.index;

  if (current.visible.size > 0) {
    targetIndex = Math.min(...current.visible);
  } else {
    const vars = [];
    if (targetIndex !== null) {
      vars.push(targetIndex);
    }
    if (overBottomMinimum !== Infinity) {
      vars.push(overBottomMinimum - 1);
    }
    if (overTopMaximum !== -Infinity) {
      vars.push(overTopMaximum);
    }
    // TODO: оптимизировать
    targetIndex = Math.max(0, Math.min(...vars));
  }

  return { targetIndex };
}

function getBorder({
  boundingClientRect,
  intersectionRect,
}: {
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
}): 'top' | 'bottom' {
  const { top, bottom } = boundingClientRect;
  const { top: itop, bottom: ibottom } = intersectionRect;
  if ((top ^ 0) === (itop ^ 0)) {
    return 'bottom';
  }
  return 'top';
}

const PAGE_PREFIX = 'page-'.length;

export function getCurrentPage() {
  const pageHash = window.location.hash;
  const page = +pageHash.slice(PAGE_PREFIX + 1);
  return Number.isNaN(page) ? null : page;
}

export function getNavigation(bookHtmlContainer: Element = document.body) {
  // headers navigation

  const contentHeaders = bookHtmlContainer.querySelectorAll('.book-box_content [data-name="header"]');
  const listHeaders = Array.from(
    bookHtmlContainer.querySelectorAll('.book-box_layout-settings-contents [data-name="header"]'),
  ) as HTMLElement[];

  const listHeadersMap = new Map(listHeaders.map((elem, i) => [elem.dataset.key!, i]));
  const headersCurrent: CurrentNavigationData = {
    index: null,
    visible: new Set<number>(),
  };
  const headersNavigationCallback = getHeadersNavigationCallback(
    listHeaders.map(e => e.parentElement!),
    listHeadersMap,
    headersCurrent,
  );
  const headersObserver = new IntersectionObserver(headersNavigationCallback, {
    threshold: 0.5,
  });
  const observeHeaders = () => {
    for (const header of Array.from(contentHeaders)) {
      headersObserver.observe(header);
    }
  };

  // page navigation

  const contentPages = Array.from(
    bookHtmlContainer.querySelectorAll('.book-box_content [data-name=".page"]'),
  ) as HTMLElement[];
  const listPageMap = new Map(
    contentPages
      .map(elem => elem.dataset.key)
      .filter((key): key is string => Boolean(key))
      .map(key => [key, +key.slice(PAGE_PREFIX)]),
  );
  const pagesCurrent: CurrentNavigationData = {
    index: null,
    visible: new Set<number>(),
  };
  const pagesNavigationCallback = getPagesNavigationCallback(listPageMap, pagesCurrent);

  const pageObserver = new IntersectionObserver(pagesNavigationCallback, {
    threshold: 0.5,
  });

  const observePages = () => {
    for (const page of contentPages) {
      pageObserver.observe(page);
    }
  };

  const observeNavigation = () => {
    observeHeaders();
    observePages();
  };

  const disconnectNavigation = () => {
    headersObserver.disconnect();
    pageObserver.disconnect();
  };

  return {
    headersObserver,
    pageObserver,
    observeNavigation,
    disconnectNavigation,
  };
}
