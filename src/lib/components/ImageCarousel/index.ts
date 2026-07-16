export { default as ImageCarousel } from "./Carousel.svelte";
export { default as ImageCarouselImage } from "./Image.svelte";
export { default as ImageCarouselIndicators } from "./Indicators.svelte";

export interface ImageCarouselContext {
    highestTransitionDuration: number;
    imageCount: number;
    currentImageIndex: number;
    registerImage: () => number;
    setCurrentImageIndex: (index: number) => void;
}

export const imageCarouselKey: symbol = Symbol("imageCarouselKey");