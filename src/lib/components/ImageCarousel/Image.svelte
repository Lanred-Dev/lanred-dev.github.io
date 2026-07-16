<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { imageCarouselKey, type ImageCarouselContext } from ".";
    import { getContext } from "svelte";
    import { fly } from "svelte/transition";

    let {
        class: className,
        image,
        transitionInX = 30,
        transitionOutX = -30,
        transitionDuration = 800,
    }: {
        class?: ClassValue;
        image: string;
        transitionInX?: string | number;
        transitionOutX?: string | number;
        transitionDuration?: number;
    } = $props();

    const imageCarousel: ImageCarouselContext = getContext(imageCarouselKey);
    let index: number = $state.raw(imageCarousel.registerImage());

    $effect(() => {
        if (transitionDuration > imageCarousel.highestTransitionDuration)
            imageCarousel.highestTransitionDuration = transitionDuration;
    });
</script>

{#if imageCarousel.currentImageIndex === index}
    <img
        src={image}
        alt="Carousel Image {index + 1}"
        class={["w-full h-full object-cover absolute top-0 left-0", className]}
        style:z-index={index > imageCarousel.currentImageIndex ? 1 : 0}
        transition:fly={{
            x: imageCarousel.currentImageIndex !== index ? transitionOutX : transitionInX,
            duration: transitionDuration,
        }}
    />
{/if}
