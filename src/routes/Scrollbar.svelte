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

    function handleMouseMove(event: MouseEvent, animate: boolean) {
        if (!Track) return;

        const scrollbarBounding = Track.getBoundingClientRect();
        const clickY = event.clientY - scrollbarBounding.top;
        const scrollRatio = Math.min(1, Math.max(0, clickY / scrollbarBounding.height));
        const newScrollY =
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
        if (isHoldingThumb) handleMouseMove(event, false);
    }}
    onmouseup={() => (isHoldingThumb = false)}
/>

{#if viewportContext.scrollY > 1 || isHoldingThumb}
    <div
        class="y-center bg-container fixed right-2 z-10 h-1/3 w-1.5 rounded-full sm:right-5 md:right-10"
        in:fly={{ x: 20, duration: 300 }}
        out:fade={{ duration: 300 }}
    >
        <button
            class="w-full h-full x-center y-center"
            aria-label="Scrollbar track"
            onclick={(event) => handleMouseMove(event, true)}
            bind:this={Track}
        >
        </button>

        <button
            class="bg-scrollbar w-full h-1/14 absolute rounded-full transition-[scale,opacity] duration-300 z-1 ease-in-out hover:scale-180"
            style:top="calc({scrollPercent}% - ({thumbHeight}px * {scrollPercent} / 100))"
            bind:clientHeight={thumbHeight}
            aria-label="Scrollbar thumb"
            onmousedown={() => (isHoldingThumb = true)}
        ></button>
    </div>
{/if}
