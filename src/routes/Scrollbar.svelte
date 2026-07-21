<script lang="ts">
    import { getViewportContext } from "$lib/utils/viewportContext";
    import { fade, fly } from "svelte/transition";

    const viewportContext = getViewportContext();
    let scrollPercent: number = $derived.by(() => {
        if (!viewportContext.Content) return 0;

        return (
            (viewportContext.scrollY /
                (viewportContext.Content.scrollHeight - viewportContext.height)) *
            100
        );
    });
    let thumbHeight: number = $state.raw(0);
    let isHoldingThumb: boolean = $state.raw(false);
    let Track: HTMLElement | null = $state(null);

    function handleDrag(event: MouseEvent | TouchEvent, animate: boolean) {
        if (!Track) return;

        const clientY: number = "touches" in event ? event.touches[0].clientY : event.clientY;
        const scrollbarBounding: DOMRect = Track.getBoundingClientRect();
        const clickY: number = clientY - scrollbarBounding.top;
        const scrollRatio: number = Math.min(1, Math.max(0, clickY / scrollbarBounding.height));
        const newScrollY: number =
            scrollRatio * (viewportContext.Content.scrollHeight - viewportContext.height);

        if (!animate) {
            window.scrollTo({ top: newScrollY });
        } else {
            window.scrollTo({ top: newScrollY, behavior: "smooth" });
        }
    }
</script>

<svelte:window
    onmousemove={(event) => {
        if (isHoldingThumb) handleDrag(event, false);
    }}
    ontouchmove={(event) => {
        if (isHoldingThumb) handleDrag(event, false);
    }}
    onmouseup={() => (isHoldingThumb = false)}
    ontouchend={() => (isHoldingThumb = false)}
    ontouchcancel={() => (isHoldingThumb = false)}
/>

{#if viewportContext.scrollY > 1 || isHoldingThumb}
    <div
        class="y-center fixed right-2 z-10 h-1/3 w-2 sm:right-5 md:right-10"
        in:fly={{ x: 20, duration: 300 }}
        out:fade={{ duration: 300 }}
    >
        <button
            class="w-full h-full x-center y-center bg-container hover:scale-x-150 transition-transform rounded-full"
            aria-label="Scrollbar track"
            onclick={(event) => handleDrag(event, true)}
            bind:this={Track}
        >
        </button>

        <button
            class="bg-scrollbar w-full h-1/14 absolute rounded-full transition-transform duration-300 z-1 ease-in-out hover:scale-180"
            style:scale={isHoldingThumb ? 1.8 : undefined}
            style:top="calc({scrollPercent}% - ({thumbHeight}px * {scrollPercent} / 100))"
            bind:clientHeight={thumbHeight}
            aria-label="Scrollbar thumb"
            onmousedown={() => (isHoldingThumb = true)}
            ontouchstart={() => (isHoldingThumb = true)}
        ></button>
    </div>
{/if}
