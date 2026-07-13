/**
 * A "OffscreenCanvas" is used to draw and blur the blobs before drawing them onto the main canvas. This "OffscreenCanvas" is just a canvas element that is not added to the DOM. This approach is taken because the actual OffscreenCanvas API has limited browser support. And to achieve better performance the offscreen canvas is rendered at a smaller size (scaled down by x amount) and then scaled up when drawn onto the main canvas.
 */

import type { ComponentProps } from "svelte";
import type Blob from "./Blob.svelte";

export { default as SoftBackdropBlob } from "./Blob.svelte";
export { default as SoftBackdrop } from "./Canvas.svelte";

export interface SoftBackdropContext {
    registerBlob: (blob: ComponentProps<typeof Blob>) => void;
    unregisterBlob: (blob: ComponentProps<typeof Blob>) => void;
}

export const softBackdropContextKey: symbol = Symbol("softBackdropContextKey");
