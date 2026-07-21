<script lang="ts">
    import scrollToElement from "$lib/utils/scrollToElement";
    import { getViewportContext } from "$lib/utils/viewportContext";

    const viewportContext = getViewportContext();
</script>

<div
    class={[
        "x-center fixed top-10 z-10 grid grid-cols-3 w-max items-center justify-center gap-8 sm:gap-12 rounded-full px-5 md:px-10 py-3 transition-all duration-300 will-change-[gap] md:gap-25 lg:gap-35",
        viewportContext.scrollY > 1 &&
            "bg-container/60 gap-8! shadow-md backdrop-blur-md md:gap-12! lg:gap-15!",
    ]}
>
    {#snippet link(element: string, text: string)}
        <button
            class="text-lg text-placeholder transition-colors hover:text-primary w-full text-center"
            onclick={() => scrollToElement(element)}>{text}</button
        >
    {/snippet}

    {@render link("#about", "About")}
    {@render link("#projects", "Projects")}
    {@render link("#contact", "Contact")}
</div>
