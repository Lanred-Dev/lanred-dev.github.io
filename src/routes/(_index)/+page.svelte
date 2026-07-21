<script lang="ts">
    import AboutMe from "./AboutMe.svelte";
    import Contact from "./Contact.svelte";
    import Header from "./Header.svelte";
    import Hero from "./Hero.svelte";
    import Projects from "./Projects.svelte";
</script>

<svelte:head>
    <title>Landon Redmond</title>
</svelte:head>

<Header />

<div class="space-y-55">
    <Hero />

    <AboutMe />

    <Projects />

    <Contact />
</div>

<style lang="postcss">
    @reference "../../app.css";

    :global(.section) {
        @apply page-x-padding relative w-full;

        :global(.header) {
            @apply mb-8 flex w-full flex-col items-center gap-y-2 text-center;

            :global(.title) {
                @apply text-3xl font-medium md:text-5xl;
            }

            :global(.subtitle) {
                @apply text-dark text-lg md:max-w-3/4 md:text-xl;
            }
        }
    }
</style>
