import { createContext } from "svelte";

export const [getViewportContext, setViewportContext] = createContext<{
    scrollY: number;
    height: number;
    Content: HTMLElement;
}>();
