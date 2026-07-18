<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { imageCarouselKey, type ImageCarouselContext } from ".";
    import { getContext, onMount } from "svelte";
    import ExpandableImage from "../ExpandableImage.svelte";

    let {
        class: className,
        image,
        transitionInX = "30px",
        transitionOutX = "-30px",
        transitionDuration = 800,
    }: {
        class?: ClassValue;
        image: string;
        transitionInX?: string;
        transitionOutX?: string;
        transitionDuration?: number;
    } = $props();

    const imageCarousel: ImageCarouselContext = getContext(imageCarouselKey);
    let index: number = $state.raw(imageCarousel.registerImage());
    let xPosition: string = $derived.by(() => {
        if (index > imageCarousel.currentImageIndex) return transitionInX;
        if (index < imageCarousel.currentImageIndex) return transitionOutX;
        return "0px";
    });

    onMount(() => {
        const imagePreload = new Image();
        imagePreload.src = image;
        imagePreload.onload = () => {
            imagePreload.remove();
        };
    });

    $effect(() => {
        if (transitionDuration > imageCarousel.highestTransitionDuration)
            imageCarousel.highestTransitionDuration = transitionDuration;
    });
</script>

<div
    class={["w-full h-full absolute top-0 left-0 translate-[translate,opacity]", className]}
    style:z-index={index > imageCarousel.currentImageIndex ? 1 : 0}
    style:opacity={index === imageCarousel.currentImageIndex ? 1 : 0}
    style:transition-duration="{transitionDuration}ms"
    style:translate="{xPosition} 0"
>
    <ExpandableImage
        src={image}
        alt="Carousel Image {index + 1}"
        class="w-full h-full object-cover"
        triggerClass="w-full h-full"
    />
</div>
