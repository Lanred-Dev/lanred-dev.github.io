<script lang="ts">
</script>

<div class="w-full px-[10%] py-[10%] md:px-[13%] lg:px-[15%]">
    <h2 class="text-3xl font-medium md:text-5xl">What have I done?</h2>

    <div class=" mt-10 grid grid-cols-3 gap-6">
        {#snippet project(name: string, description: string, link: string)}
            <div class="p-10 flex flex-col justify-between bg-container rounded-container">
                <h3 class="mb-2 text-2xl font-semibold">{name}</h3>
                <p class="grow text-lg">{description}</p>

                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button-primary mt-10"
                >
                    View Project
                </a>
            </div>
        {/snippet}

        {@render project(
            "indxo.app",
            "A Quizlet inspired studying website built with SvelteKit.",
            "https://example.com/personal-portfolio"
        )}

        {@render project(
            "extro",
            "A 2D game engine written in Python, using pyray (Raylib) for rendering.",
            "https://github.com/Lanred-Dev/extro"
        )}

        {@render project(
            "justreddit",
            "A simple no-dependency Reddit API wrapper for getting post, comment, and subreddit metadata.",
            "https://github.com/Lanred-Dev/justreddit"
        )}

        {@render project(
            "Verbose",
            "A simple Discord bot that keeps track of the most used words in a server.",
            "https://github.com/Lanred-Dev/verbose"
        )}

        {@render project(
            "Mandelbrot Viewer",
            "A real-time Mandelbrot set viewer written in C++ using OpenGL.",
            "https://github.com/Lanred-Dev/mandelbrot-viewer"
        )}

        {@render project(
            "HarderMC",
            "A Paper plugin that makes Minecraft survival harder with events, stronger mobs, and a fear system.",
            "https://github.com/Lanred-Dev/HarderMC"
        )}

        {@render project(
            "Fluid",
            "Alternative to Roblox's TweenService.",
            "https://github.com/Lanred-Dev/Fluid"
        )}
    </div>
</div>
