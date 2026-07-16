<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { onMount, setContext, type Snippet } from "svelte";
    import { imageCarouselKey, type ImageCarouselContext } from ".";

    let {
        class: className,
        interval = 3000,
        children,
    }: {
        class?: ClassValue;
        interval?: number | null;
        children: Snippet<[]>;
    } = $props();

    let currentImageIndex: number = $state.raw(0);
    let timeoutId: NodeJS.Timeout;
    let imageCount: number = $state.raw(0);
    let highestTransitionDuration: number = 0;

    setContext(imageCarouselKey, {
        highestTransitionDuration,
        get imageCount() {
            return imageCount;
        },
        get currentImageIndex() {
            return currentImageIndex;
        },
        registerImage: () => {
            const index: number = imageCount;
            imageCount += 1;
            return index;
        },
        setCurrentImageIndex,
    } satisfies ImageCarouselContext);

    function setCurrentImageIndex(index: number) {
        currentImageIndex = index % imageCount;

        if (timeoutId) clearTimeout(timeoutId);

        if (typeof interval === "number" && interval > 0) {
            timeoutId = setTimeout(() => {
                setCurrentImageIndex(currentImageIndex + 1);
            }, interval + highestTransitionDuration);
        }
    }

    onMount(() => {
        setCurrentImageIndex(currentImageIndex);

        return () => {
            if (timeoutId !== null) clearTimeout(timeoutId);
        };
    });
</script>

<div class={["overflow-x-hidden relative", className]}>
    {@render children()}
</div>
