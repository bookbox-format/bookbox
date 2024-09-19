import { BookLayoutView, LayoutProps, getLayoutView } from "@bookbox/core";

const defaultSize = 100;

const getNormalSize = (value: number) =>
    value <= 0 ? defaultSize : Math.floor(value);

export function parseSize(value: string | number = 1): number {
    if (typeof value === 'string') {
        if (value[value.length - 1] === '%') {
            const size = parseFloat(value);
            if (Number.isNaN(size)) {
                return defaultSize;
            }
            return getNormalSize(size);
        }
        return defaultSize;
    }
    return getNormalSize(value * defaultSize);
}

export function getCssSizeStyle(params: {
    width: number;
    height: number;
}): string {
    const { width, height } = params;
    return `max-height: ${height}vh; max-width: ${width}%`;
}

export function getLayoutParams(props: LayoutProps): {
    view: BookLayoutView;
    position: LayoutProps['position'];
} {
    return {
        view: getLayoutView(props),
        position: props.position ?? 'center',
    };
}
