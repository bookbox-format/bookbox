


export function applyCss(text: string): HTMLStyleElement {
  const cssNode = document.createElement('style');
  cssNode.appendChild(document.createTextNode(text));
  document.head.appendChild(cssNode);
  return cssNode;
}

export type BrowserCssApi = (() => void) & { remove: () => void };
export function getBrowserCssApi(text: string): BrowserCssApi {
  let added = false;
  let node: HTMLStyleElement;
  const set = () => {
    if (added) return;
    node = applyCss(text);
    added = true;
  };
  return Object.assign(set, {
    remove: () => {
      if (!node) return;
      document.head.removeChild(node);
    },
  });
}

export function getCssApiForList(list: BrowserCssApi[]): BrowserCssApi {
  const set = () => {
    list.forEach(api => api());
  };
  return Object.assign(set, {
    remove: () => {
      list.forEach(api => api.remove());
    },
  });
}
