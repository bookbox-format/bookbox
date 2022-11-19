import {htmlBook} from "../dynamicCss";
import { setGlobalActions } from "./globalActions";


export function browserInit() {
    setGlobalActions();
    htmlBook();
}