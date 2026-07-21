<script lang="ts">
    import { resolve } from "$app/paths";
    import Icon from "$lib/components/Icon.svelte";
    import { indxo, extro, MandelbrotViewer, justreddit } from "$lib/data/projects";
    import { GitHub } from "$lib/data/socials";
    import {
        ImageCarousel,
        ImageCarouselImage,
        ImageCarouselIndicators,
    } from "$lib/components/ImageCarousel";

    let isSnapping = false;
    let lastScrollY = 0;
    let coastingTimeout: NodeJS.Timeout | undefined;
    let viewAllProjectsButton: {
        backgroundColor: string | null;
        hoverColor: string | null;
        textColor: string | null;
    } = $state({
        backgroundColor: null,
        hoverColor: null,
        textColor: null,
    });

    function breakSnap() {
        isSnapping = false;
    }

    function snapToNearestProject() {
        if (isSnapping) return;

        const projectCards: NodeListOf<HTMLDivElement> =
            document.querySelectorAll("[data-project]");
        const viewportCenter: number = window.innerHeight / 2;
        const stretch: number = window.innerHeight * 0.47;
        let isAtProject: boolean = false;

        for (let index = 0; index < projectCards.length; index++) {
            const card = projectCards[index];
            const boundingBox: DOMRect = card.getBoundingClientRect();
            const cardCenter: number = boundingBox.top + boundingBox.height / 2;
            const distanceToCenter: number = Math.abs(viewportCenter - cardCenter);

            if (distanceToCenter <= stretch) {
                isAtProject = true;
            }

            if (distanceToCenter > 5 && distanceToCenter < stretch) {
                const accentColor: string = card.getAttribute("data-accent-color") || "";
                const accentColorLight: string = card.getAttribute("data-accent-color-light") || "";
                const accentTextColor: string = card.getAttribute("data-accent-text-color") || "";
                viewAllProjectsButton.backgroundColor = accentColor;
                viewAllProjectsButton.hoverColor = accentColorLight;
                viewAllProjectsButton.textColor = accentTextColor;

                isSnapping = true;
                card.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => {
                    isSnapping = false;
                }, 600);

                break;
            }
        }

        if (!isAtProject) {
            viewAllProjectsButton.backgroundColor = null;
            viewAllProjectsButton.hoverColor = null;
            viewAllProjectsButton.textColor = null;
        }
    }

    function handleScroll() {
        if (isSnapping) return;

        const currentScrollY = window.scrollY;
        const speed = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;

        if (speed > 25) {
            clearTimeout(coastingTimeout);
            coastingTimeout = undefined;
            return;
        }

        if (!coastingTimeout)
            coastingTimeout = setTimeout(() => {
                snapToNearestProject();
                coastingTimeout = undefined;
            }, 50);
    }
</script>

<svelte:window
    onscroll={handleScroll}
    onresize={snapToNearestProject}
    onwheel={breakSnap}
    ontouchstart={breakSnap}
    onpointerdown={breakSnap}
/>

<div class="section" id="projects">
    <div class="header h-svh flex-center flex-col">
        <h2 class="title">What have I done?</h2>
        <p class="subtitle">
            Here’s a look at various personal and collaborative projects that showcase my skills and
            passion for development. I primarily write in C++, TypeScript (JS), Python, Java, and
            Luau, and I rely on tech like Node.js, Svelte, CMake, and Visual Studio to bring these
            ideas to life.
        </p>
    </div>

    <div>
        <div class="flex flex-col">
            {#each [indxo, extro, MandelbrotViewer, justreddit] as project, index (index)}
                <div
                    class="min-h-svh flex flex-col-reverse lg:flex-row items-center justify-center gap-y-8"
                    data-project
                    data-accent-color={project.theme.accentColor}
                    data-accent-color-light={project.theme.accentColorLight}
                    data-accent-text-color={project.theme.accentTextColor}
                    style:font-family="'{project.theme.font}', sans-serif"
                >
                    <div class="w-full lg:w-1/2">
                        <li class="flex gap-2">
                            {#each project.technologies as technology, index (index)}
                                <p class="rounded-full px-2 py-1 font-medium bg-light text-dark">
                                    {technology}
                                </p>
                            {/each}
                        </li>

                        <div class="mb-8 mt-4">
                            <div class="flex items-center gap-x-2 flex-wrap-reverse mb-1">
                                <p class="text-3xl font-medium md:text-5xl">{project.name}</p>

                                {#if project.version}
                                    <p
                                        class="rounded-full px-2 py-1 font-medium"
                                        style:background-color="var({project.version.color})"
                                    >
                                        {project.version.text}
                                    </p>
                                {/if}
                            </div>

                            <p class="text-dark mt-2 text-xl">{project.description}</p>
                        </div>

                        <div class="flex gap-x-4 gap-y-2 flex-wrap">
                            {#if project.action}
                                <a
                                    class="button-attention bg-(--background-color) hover:bg-(--hover-background-color)"
                                    href={project.action.url}
                                    target="_blank"
                                    rel="external noopener noreferrer"
                                    style:color={project.theme.accentTextColor}
                                    style:--background-color={project.theme.accentColor}
                                    style:--hover-background-color={project.theme.accentColorLight}
                                >
                                    {project.action.text}
                                </a>
                            {/if}

                            <a
                                class="button-primary"
                                href={project.source}
                                target="_blank"
                                rel="external noopener noreferrer"
                            >
                                <Icon icon="logos/GitHub" />
                                Source
                            </a>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 flex items-center justify-start lg:justify-end">
                        <ImageCarousel
                            class="w-4/5 md:w-1/2 lg:w-3/4 aspect-square overflow-hidden rounded-container"
                            interval={null}
                        >
                            {#each project.images as image, index (index)}
                                <ImageCarouselImage
                                    {image}
                                    transitionInX="100%"
                                    transitionOutX="-100%"
                                />
                            {/each}

                            <ImageCarouselIndicators selectedColor={project.theme.accentColor} />
                        </ImageCarousel>
                    </div>
                </div>
            {/each}
        </div>

        <div class="w-full flex-center gap-4 sticky bottom-6">
            <a
                class="button-primary p-2"
                href={GitHub.url}
                target="_blank"
                rel="external noopener noreferrer"
            >
                <Icon icon={GitHub.icon} />
            </a>

            <a
                href={resolve("/projects")}
                class="button-attention bg-(--background-color) hover:bg-(--hover-background-color)"
                style:color={viewAllProjectsButton.textColor ?? "var(--color-container)"}
                style:--background-color={viewAllProjectsButton.backgroundColor ??
                    "var(--color-attention)"}
                style:--hover-background-color={viewAllProjectsButton.hoverColor ??
                    "var(--color-attention-light)"}
            >
                View All Projects
                <Icon icon="general/arrows/Right" class="fill-black" />
            </a>
        </div>
    </div>
</div>
