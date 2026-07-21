<script lang="ts">
    import { getContext } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import { imageCarouselKey, type ImageCarouselContext } from ".";

    let {
        class: className,
        selectedColor = "var(--color-attention)",
        unselectedColor = "var(--background-color-light)",
    }: { class?: ClassValue; selectedColor?: string; unselectedColor?: string } = $props();

    const imageCarousel: ImageCarouselContext = getContext(imageCarouselKey);
</script>

<ol class={["bottom-8 x-center flex gap-x-2 z-10", className]}>
    {#each Array.from({ length: imageCarousel.imageCount }, (_, index) => index) as index (index)}
        <li>
            <button
                class="size-4 rounded-full transition-colors border border-primary"
                style:background-color={index === imageCarousel.currentImageIndex
                    ? selectedColor
                    : unselectedColor}
                onclick={() => {
                    imageCarousel.setCurrentImageIndex(index);
                }}
                aria-label="Go to image {index + 1}"
            ></button>
        </li>
    {/each}
</ol>
