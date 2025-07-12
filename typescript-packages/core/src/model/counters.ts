import { BookElements } from './elements';
import { BookSchema } from './model';

function getInitial(type: BookElements['counter']['props']['type'] = 'number', custom?: number | string) {
  switch (type) {
    case 'number': {
      if (custom === undefined) return 1;
      const n = typeof custom === 'number' ? custom : parseFloat(custom);
      if (Number.isNaN(n)) return 1;
      return n;
    }
    case 'char': {
      if (custom === undefined || typeof custom !== 'string' || custom.length !== 1) return 'a'.charCodeAt(0);
      return custom.charCodeAt(0);
    }
    case 'latin': {
      return 'a'.charCodeAt(0);
    }
    case 'big-latin': {
      return 'A'.charCodeAt(0);
    }
    case 'roman': {
      return 'ⅰ'.charCodeAt(0);
    }
    case 'big-roman': {
      return 'Ⅰ'.charCodeAt(0);
    }
    case 'cyrillic': {
      return 'а'.charCodeAt(0);
    }
    case 'big-cyrillic': {
      return 'А'.charCodeAt(0);
    }
    default: {
      return 1;
    }
  }
}

export function calculateCounters(
  schema: BookSchema,
  counters: Map<string, [number, boolean]> = new Map(),
  steps: Map<string, number> = new Map(),
  bumped: Set<string> = new Set(),
): void {
  for (const item of schema) {
    if (typeof item === 'string') {
      continue;
    }
    if (item.name !== 'counter') {
      calculateCounters(item.children, counters, steps, bumped);
      continue;
    }
    const props = item.props as BookElements['counter']['props'];

    const fillCounter = (name: string, bump = false) => {
      const [value, isUnicodeChar] = counters.get(name) ?? [1, false];
      let targetValue = value;
      if (bump && bumped.has(name)) {
        // use > 1
        const step = steps.get(name) ?? 1;
        const newValue = value + step;
        counters.set(name, [newValue, isUnicodeChar]);
        targetValue = newValue;
      }
      item.children = [isUnicodeChar ? String.fromCharCode(targetValue) : `${targetValue}`];
    };

    if (props.start) {
      const type = props.type ?? 'number';
      const isUnicodeChar = type !== 'number';
      const initial = getInitial(type, props.initial);
      counters.set(props.start, [initial, isUnicodeChar]);
      if (props.step) {
        steps.set(props.start, props.step);
      }
      continue;
    }
    if (props.end) {
      counters.delete(props.end);
      steps.delete(props.end);
      bumped.delete(props.end);
      continue;
    }
    if (props.use) {
      fillCounter(props.use, true);
      bumped.add(props.use);
      continue;
    }
    if (props.last) {
      fillCounter(props.last);
    }
  }
}
