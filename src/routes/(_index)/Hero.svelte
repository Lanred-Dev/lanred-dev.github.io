<script lang="ts">
    import { SoftBackdrop, SoftBackdropBlob } from "$lib/components/SoftBackdrop";
    import StarBackdrop from "$lib/components/StarBackdrop.svelte";
    import Icon from "$lib/components/Icon.svelte";
    import { MediaQuery } from "svelte/reactivity";
    import { innerWidth, innerHeight } from "svelte/reactivity/window";
    import { GitHub, email, LinkedIn } from "$lib/data/socials";

    // 768px is the same sizing used for md: in tailwind
    const isMobile: MediaQuery = new MediaQuery("(max-width: 768px)", true);
</script>

<div class="cover-screen relative overflow-hidden">
    <div class="absolute top-0 left-0 z-0 h-full w-full">
        <StarBackdrop
            class="absolute top-0 left-0 z-1 h-full w-full"
            width={innerWidth.current ?? 0}
            height={innerHeight.current ?? 0}
        />

        <SoftBackdrop
            class="absolute top-0 left-0 z-2 h-full w-full"
            width={innerWidth.current ?? 0}
            height={innerHeight.current ?? 0}
        >
            <SoftBackdropBlob x={0.05} y={0.9} radius={400} color="#003DA5" opacity={0.1} />
            <SoftBackdropBlob x={0.9} y={0.5} radius={300} color="#fdda24" opacity={0.05} />
        </SoftBackdrop>

        <div
            class="w-full h-full absolute top-0 left-0 z-3 bg-no-repeat bg-cover"
            style="background: linear-gradient(to top, var(--background-color-page) 0%, transparent 30%)"
        ></div>

        <div class="x-center bottom-15 z-4 size-7 opacity-70">
            <Icon
                icon="general/chevrons/Down"
                class="h-full w-full fill-white"
                style="animation: Arrow 3.5s infinite cubic-bezier(0.25, 1, 0.5, 1);"
            />

            <style lang="postcss">
                @keyframes Arrow {
                    0%,
                    40% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    45% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    46% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    55% {
                        opacity: 1;
                        transform: translateY(8px);
                    }
                    62% {
                        transform: translateY(-3px);
                    }
                    68% {
                        transform: translateY(1px);
                    }
                    73%,
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        </div>
    </div>

    <div class="lg:y-center absolute top-[30%] left-[6%] z-2 md:left-[13%] lg:left-[15%]">
        <h1 class="text-4xl font-medium md:text-5xl">Hi, I'm Landon</h1>
        <p class="mt-2 text-xl">
            a Computer Engineering student at<br />the University of Alabama in Huntsville
        </p>
    </div>

    <div class="md:y-center absolute right-0 bottom-[10%] z-3 h-[50%] w-full md:h-dvh md:w-[40%]">
        {#snippet profileLink(
            x: number,
            y: number,
            dx: number,
            dy: number,
            icon: string,
            alt: string,
            href: string
        )}
            <a
                {href}
                target="_blank"
                rel="external noopener noreferrer"
                class="group absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
                aria-label={alt}
                style:right="{isMobile.current ? dx : x}%"
                style:top="{isMobile.current ? dy : y}%"
            >
                <Icon
                    {icon}
                    class="size-8 fill-white"
                    style="filter: drop-shadow(0px 0px 3px #ffffff80);"
                />

                <p
                    class="-translate-y-1/4 opacity-0 transition-[translate,opacity] group-hover:-translate-y-1/2 group-hover:opacity-100 absolute top-1/2 left-10"
                >
                    {alt}
                </p>
            </a>
        {/snippet}

        {@render profileLink(42, 41, 42, 41, GitHub.icon, GitHub.text, GitHub.url)}
        {@render profileLink(65, 73, 15, 73, email.icon, email.text, email.url)}
        {@render profileLink(82, 28, 76, 70, LinkedIn.icon, LinkedIn.text, LinkedIn.url)}
    </div>
</div>
