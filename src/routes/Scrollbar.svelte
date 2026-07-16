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
</script>

{#if viewportContext.scrollY > 1}
    <div
        class="y-center bg-container fixed right-2 z-10 h-1/3 w-1.5 overflow-hidden rounded-full sm:right-5 md:right-10"
        in:fly={{ x: 20, duration: 300 }}
        out:fade={{ duration: 300 }}
    >
        <div class="bg-scrollbar w-full" style:height={`${scrollPercent}%`}></div>
    </div>
{/if}
