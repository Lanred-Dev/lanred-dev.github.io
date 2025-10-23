<script lang="ts">
    import { onMount } from "svelte";

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
        "fixed top-10 z-10 flex x-center items-center justify-center gap-5 py-3 px-10 rounded-container sm:gap-15 md:gap-25 lg:gap-35 transition-all duration-300",
        scrollPercent > 1 && "bg-container/60 shadow-md backdrop-blur-md sm:gap-5! md:gap-10! lg:gap-15!",
    ]}
>
    {#snippet link(url: string, text: string)}
        <a href={url} class="text-lg opacity-30 transition-opacity hover:opacity-100">{text}</a>
    {/snippet}

    {@render link("#about", "About")}
    {@render link("#projects", "Projects")}
    {@render link("#contact", "Contact")}
</div>

<div class="y-center rounded-container bg-container fixed right-10 z-10 h-28 w-2 overflow-hidden">
    <div
        class="bg-uah-blue w-full transition-[height] duration-300 ease-in-out"
        style:height={`${scrollPercent}%`}
    ></div>
</div>
