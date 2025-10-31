<!-- svelte-ignore non_reactive_update -->
<script lang="ts">
    import BlurredBlobs from "$lib/Components/BlurredBlobs.svelte";
    import { onMount } from "svelte";

    const STAR_COUNT: number = 300;
    const STAR_SIZE: [number, number] = [0.5, 1.5];
    const FPS: number = 30;
    const STAR_OPACITY: number = 0.3;

    interface Star {
        x: number;
        y: number;
        radius: number;
        opacity: number;
        isAnimating: boolean;
        opacityDirection: number;
        fadeSpeed: number;
    }

    let delta: number;
    let lastFrameTime: number = Date.now();
    let Canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let BlobsCanvas: HTMLCanvasElement;
    let canvasWidth: number = $state.raw(0);
    let canvasHeight: number = $state.raw(0);
    let stars: Star[] = [];

    function getRandomPosition() {
        return {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
        };
    }

    function draw() {
        delta = Date.now() - lastFrameTime;
        lastFrameTime = Date.now();

        context.clearRect(0, 0, canvasWidth, canvasHeight);

        stars.forEach((star) => {
            if (star.isAnimating) {
                star.opacity += star.fadeSpeed * star.opacityDirection * delta;

                if (star.opacity >= 1) {
                    star.opacity = 1;
                    star.isAnimating = false;
                    star.opacityDirection = 0;
                } else if (star.opacity <= 0) {
                    star.opacity = 0;
                    star.opacityDirection = 1;

                    const { x, y } = getRandomPosition();
                    star.x = x;
                    star.y = y;
                }
            } else if (Math.random() < 0.1) {
                star.isAnimating = true;
                star.opacityDirection = star.opacity === 1 ? -1 : 1;
            }

            context.globalAlpha = star.opacity * STAR_OPACITY;
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            context.fillStyle = "#FFFFFF";
            context.fill();
        });

        context.globalAlpha = 0.5;
        context.drawImage(BlobsCanvas, 0, 0, canvasWidth, canvasHeight);
    }

    function generateStars() {
        stars = [];

        for (let index = 0; index < STAR_COUNT; index++) {
            stars.push({
                ...getRandomPosition(),
                radius: Math.random() * (STAR_SIZE[1] - STAR_SIZE[0]) + STAR_SIZE[0],
                opacity: Math.random(),
                isAnimating: false,
                opacityDirection: 0,
                fadeSpeed: Math.random() * 0.003 + 0.0003,
            });
        }
    }

    onMount(() => {
        context = Canvas.getContext("2d") as CanvasRenderingContext2D;

        generateStars();

        requestAnimationFrame(draw);
        const renderInterval = setInterval(() => {
            requestAnimationFrame(draw);
        }, 1000 / FPS);

        return () => {
            clearInterval(renderInterval);
        };
    });

    $effect(() => {
        if (!Canvas) return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = canvasWidth * ratio;
        Canvas.height = canvasHeight * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        generateStars();
    });
</script>

<BlurredBlobs
    blobs={[
        {
            x: 0.05,
            y: 0.9,
            radius: 400,
            color: "#003DA5",
            opacity: 0.2,
        },
        {
            x: 0.9,
            y: 0.5,
            radius: 300,
            color: "#fdda24",
            opacity: 0.1,
        },
    ]}
    width={canvasWidth}
    height={canvasHeight}
    bind:Canvas={BlobsCanvas}
/>

<div class="cover-screen relative overflow-hidden">
    <canvas
        class="y-center x-center cover-screen"
        bind:this={Canvas}
        bind:clientWidth={canvasWidth}
        bind:clientHeight={canvasHeight}
    ></canvas>

    <div class="lg:y-center absolute top-[30%] left-[6%] z-2 md:left-[13%] lg:left-[15%]">
        <h1 class="text-4xl font-medium md:text-5xl">Hi, I'm Landon</h1>
        <p class="mt-2 text-xl">a Computer Engineering student at UAH</p>
    </div>

    <div class="y-center right-2 z-2 h-screen w-[40%]">
        {#snippet profileLink(x: number, y: number, icon: string, alt: string, href: string)}
            <a
                {href}
                target="_blank"
                rel="noopener noreferrer"
                class="profileLink group absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center gap-2 transition-all duration-200 hover:scale-110"
                aria-label={alt}
                style:right="{x}%"
                style:top="{y}%"
            >
                <img src={icon} {alt} class="aspect-square w-full" />
                <p
                    class="translate-y-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                >
                    {alt}
                </p>
            </a>
        {/snippet}

        <style lang="postcss">
            .profileLink img {
                filter: drop-shadow(0px 0px 0px #ffffff80);
            }

            .profileLink:hover img {
                filter: drop-shadow(0px 0px 10px #ffffff80);
            }
        </style>

        {@render profileLink(
            42,
            41,
            "/icons/GitHub.png",
            "Github",
            "https://github.com/lanred-dev"
        )}

        {@render profileLink(
            65,
            73,
            "/icons/Mail.svg",
            "Email",
            "mailto:landon.redmond0@gmail.com"
        )}

        {@render profileLink(82, 28, "/icons/Resume.svg", "Resume", "/Landon_Redmond_Resume.pdf")}
    </div>

    <div class="x-center bottom-15 z-2 size-7 opacity-70">
        <img
            src="/icons/ChevronDown.svg"
            alt="Down Arrow"
            class="aspect-square w-full"
            style:animation="Arrow 5s infinite ease-in-out"
        />

        <style lang="postcss">
            @keyframes Arrow {
                0%,
                40% {
                    opacity: 1;
                    transform: translateY(0px);
                }

                47% {
                    opacity: 0;
                }

                48% {
                    transform: translateY(15px);
                }

                49% {
                    transform: translateY(-15px);
                }

                87% {
                    transform: translateY(-15px);
                }

                89% {
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                    transform: translateY(0px);
                }
            }
        </style>
    </div>

    <div
        class="from-page absolute bottom-0 left-0 z-1 h-1/8 w-full bg-linear-to-t to-transparent"
    ></div>
</div>
