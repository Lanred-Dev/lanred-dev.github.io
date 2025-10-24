<script lang="ts">
    import scrollToElement from "$lib/utils/scrollToElement";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    let scrollPercent: number = $state.raw(0);

    function determineScrollPercent() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    }

    onMount(determineScrollPercent);
</script>

<svelte:window on:scroll={determineScrollPercent} />

<div
    class={[
        "x-center rounded-container fixed top-10 z-10 flex items-center justify-center gap-5 px-10 py-3 transition-all duration-300 will-change-[gap] sm:gap-15 md:gap-25 lg:gap-35",
        scrollPercent > 1 &&
            "bg-container/60 shadow-md backdrop-blur-md sm:gap-5! md:gap-10! lg:gap-15!",
    ]}
>
    {#snippet link(element: string, text: string)}
        <button
            class="text-lg opacity-30 transition-opacity hover:opacity-100"
            onclick={() => scrollToElement(element)}>{text}</button
        >
    {/snippet}

    {@render link("#about", "About")}
    {@render link("#projects", "Projects")}
    {@render link("#contact", "Contact")}
</div>

{#if scrollPercent > 5}
    <div
        class="y-center rounded-container bg-container fixed right-10 z-10 h-28 w-2 overflow-hidden"
        in:fly={{ x: 10, duration: 300 }}
        out:fade={{ duration: 300 }}
    >
        <div class="bg-uah-blue w-full" style:height={`${scrollPercent}%`}></div>
    </div>
{/if}
