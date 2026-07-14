<script lang="ts">
    import "../app.css";
    import { setViewportContext } from "$lib/utils/viewportContext";
    import Scrollbar from "./Scrollbar.svelte";
    import Footer from "./Footer.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let viewportScrollY: number = $state.raw(0);
    let viewportHeight: number = $state.raw(0);
    let Viewport: HTMLElement;

    setViewportContext({
        get scrollY() {
            return viewportScrollY;
        },
        get height() {
            return viewportHeight;
        },
        get Content() {
            return Viewport;
        },
    });

    onMount(() => {
        Viewport = document.body;
    });
</script>

<svelte:window bind:scrollY={viewportScrollY} bind:innerHeight={viewportHeight} />

<Scrollbar />

<main class="w-full">
    {@render children()}
</main>

<Footer />
