<script lang="ts">
    import { getContext } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import { imageCarouselKey, type ImageCarouselContext } from ".";

    let { class: className }: { class?: ClassValue } = $props();

    const imageCarousel: ImageCarouselContext = getContext(imageCarouselKey);
</script>

<ol class={["bottom-8 x-center flex gap-x-2 z-10", className]}>
    {#each Array.from({ length: imageCarousel.imageCount }, (_, index) => index) as index (index)}
        <li>
            <button
                class={[
                    "size-4 rounded-full transition-colors",
                    index === imageCarousel.currentImageIndex ? "bg-attention-light" : "bg-light",
                ]}
                onclick={() => {
                    imageCarousel.setCurrentImageIndex(index);
                }}
                aria-label="Go to image {index + 1}"
            ></button>
        </li>
    {/each}
</ol>
