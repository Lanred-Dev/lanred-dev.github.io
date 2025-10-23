<script lang="ts">
</script>

<div class="cover-screen px-[10%] py-[10%] md:px-[13%] lg:px-[15%]" id="projects">
    <h2 class="text-3xl font-medium md:text-5xl">What have I done?</h2>

    <div class="mt-10 grid grid-cols-2 gap-6">
        {#snippet project(name: string, description: string, tech: string, link: string)}
            <div class="container flex flex-col justify-between">
                <p class="text-sm mb-0.5 text-secondary">{tech}</p>
                <h3 class="mb-2 text-2xl font-semibold">{name}</h3>
                <p class="grow text-lg">{description}</p>

                <div class="mt-8 flex gap-6 items-center">
                    <a class="button-primary" href={link} target="_blank" rel="noopener noreferrer"> Live Demo </a>
                    <a class="button-icon" href={link} target="_blank" rel="noopener noreferrer"> <img src="/icons/GitHub.png" alt="GitHub"> Source </a>
                </div>
            </div>
        {/snippet}

        {@render project(
            "indxo.app",
            "A Quizlet inspired studying website built with SvelteKit.",
            "SvelteKit, Node.js, MongoDB",
            "https://example.com/personal-portfolio"
        )}

        {@render project(
            "extro",
            "A 2D game engine written in Python, using pyray (Raylib) for rendering.",
            "Python, Raylib, C++",
            "https://github.com/Lanred-Dev/extro"
        )}

        {@render project(
            "justreddit",
            "A simple no-dependency Reddit API wrapper for getting post, comment, and subreddit metadata.",
            "TypeScript, Node.js",
            "https://github.com/Lanred-Dev/justreddit"
        )}

        {@render project(
            "Verbose",
            "A simple Discord bot that keeps track of the most used words in a server.",
            "TypeScript, Discord.js, Node.js",
            "https://github.com/Lanred-Dev/verbose"
        )}

        {@render project(
            "Mandelbrot Viewer",
            "A real-time Mandelbrot set viewer written in C++ using OpenGL.",
            "C++, OpenGL",
            "https://github.com/Lanred-Dev/mandelbrot-viewer"
        )}

        {@render project(
            "HarderMC",
            "A Paper plugin that makes Minecraft survival harder with events, stronger mobs, and a fear system.",
            "Java, PaperMC",
            "https://github.com/Lanred-Dev/HarderMC"
        )}

        {@render project(
            "Fluid",
            "Alternative to Roblox's TweenService.",
            "Lua",
            "https://github.com/Lanred-Dev/Fluid"
        )}
    </div>
</div>
