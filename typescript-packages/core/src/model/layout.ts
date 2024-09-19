import { LayoutProps } from "./elements";
import { BookLayoutView } from "./model";

export function getLayoutView(props: LayoutProps): BookLayoutView {
    if (props.inline) {
        return 'inline';
    }
    if (props.block) {
        return 'block';
    }
    return props.position === 'inline' ? 'inline' : 'block';
}
