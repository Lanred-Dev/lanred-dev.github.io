<script lang="ts">
    import scrollToElement from "$lib/utils/scrollToElement";

    interface Project {
        name: string;
        description: string;
        tech: string;
        source: string;
        demo?: {
            text: string;
            url: string;
        };
    }

    const PROJECTS: Project[] = [
        {
            name: "indxo.app",
            description: "A Quizlet-inspired studying website built with SvelteKit.",
            tech: "SvelteKit, Node.js, MongoDB",
            source: "https://github.com/Lanred-Dev/indxo.app",
            demo: {
                text: "Live Demo",
                url: "https://indxo.app",
            },
        },
        {
            name: "extro",
            description:
                "A 2D game engine written in Python that uses Pyray (Raylib) as its backend.",
            tech: "Python, Raylib, C++, nanobind",
            source: "https://github.com/Lanred-Dev/extro",
        },
        {
            name: "justreddit",
            description:
                "A simple no-dependency Reddit API wrapper for getting post, comment, and subreddit metadata.",
            tech: "TypeScript, Node.js",
            source: "https://github.com/Lanred-Dev/justreddit",
            demo: {
                text: "NPM Package",
                url: "https://www.npmjs.com/package/justreddit",
            },
        },
        {
            name: "Verbose",
            description:
                "A simple Discord bot that keeps track of the most used words in a server.",
            tech: "TypeScript, Discord.js, Node.js",
            source: "https://github.com/Lanred-Dev/verbose",
        },
        {
            name: "Mandelbrot Viewer",
            description: "A real-time Mandelbrot set viewer written in C++ using OpenGL.",
            tech: "C++, OpenGL",
            source: "https://github.com/Lanred-Dev/mandelbrot-viewer",
            demo: {
                text: "Download",
                url: "https://github.com/Lanred-Dev/mandelbrot-viewer/releases",
            },
        },
        {
            name: "HarderMC",
            description:
                "A Paper plugin that makes Minecraft survival harder with events, stronger mobs, and a fear system.",
            tech: "Java, PaperMC",
            source: "https://github.com/Lanred-Dev/HarderMC",
        },
        {
            name: "Fluid",
            description: "Alternative to Roblox's TweenService.",
            tech: "Lua",
            source: "https://github.com/Lanred-Dev/Fluid",
        },
    ];

    let showAll: boolean = $state.raw(false);
</script>

<div class="section min-h-screen" id="projects">
    <h2 class="text-3xl font-medium md:text-5xl">What have I done?</h2>

    <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {#snippet project({ name, description, tech, source, demo }: Project)}
            <div class="container flex flex-col justify-between">
                <p class="text-secondary mb-0.5 text-sm">{tech}</p>
                <h3 class="mb-2 text-2xl font-semibold">{name}</h3>
                <p class="grow text-lg">{description}</p>

                <div class="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    {#if demo}
                        <a
                            class="button-primary"
                            href={demo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {demo.text}
                        </a>
                    {/if}

                    <a class="button-icon" href={source} target="_blank" rel="noopener noreferrer">
                        <img src="/icons/GitHub.png" alt="GitHub" /> Source
                    </a>
                </div>
            </div>
        {/snippet}

        {#each PROJECTS as info, index}
            {#if showAll || index < 4}
                {@render project(info)}
            {/if}
        {/each}
    </div>

    <button
        class="button-secondary mt-6"
        onclick={() => {
            showAll = !showAll;

            if (!showAll) scrollToElement("#projects");
        }}
    >
        {#if showAll}Show Less{:else}Show All{/if}
    </button>
</div>
