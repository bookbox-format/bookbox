import { pushHistory, replaceHistory } from "./navigation";

export interface GoToOptions {
  useHistory?: "push" | "replace" | boolean;
  url?: Partial<URL>;
}

const actions = {
  push: pushHistory,
  replace: replaceHistory,
};

const className = "book-box_highlight";

export function goto(selector: string, options?: GoToOptions): void {
  const node = document.querySelector(selector);
  if (!node) return;
  const { useHistory = false, url } = options ?? {};
  node.scrollIntoView();
  if (useHistory && url) {
    const method = typeof useHistory === "string" ? useHistory : "replace";
    actions[method](url);
  }

  node.classList.add(className);
  setTimeout(() => (node ? node.classList.remove(className) : undefined), 1000);
}

export function gotoKey(key: string, options?: GoToOptions): void {
  goto(`.book-box_content *[data-layout='top'][data-key='${key}']`, options);
}
