<script lang="ts">
    import { onMount } from "svelte";
    import { innerHeight, innerWidth } from "svelte/reactivity/window";
    import glur from "glur";

    const STAR_COUNT: number = 300;
    const STAR_SIZE: [number, number] = [0.5, 1.5];
    const FPS: number = 30;
    const OFFSCREEN_SCALE: number = 0.4;
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

    /**
     * A "OffscreenCanvas" is used to draw and blur the colored blobs before drawing them onto the main canvas. This "OffscreenCanvas" is just a canvas element that is not added to the DOM. This approach is taken because the actual OffscreenCanvas API has limited browser support. And to achieve better performance the offscreen canvas is rendered at a smaller size (scaled down by OFFSCREEN_SCALE) and then scaled up when drawn onto the main canvas.
     */

    interface Blob {
        x: number;
        y: number;
        radius: number;
        color: string;
        opacity: number;
    }

    let delta: number;
    let lastFrameTime: number = Date.now();
    let Canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let OffscreenCanvas: HTMLCanvasElement;
    let offscreenContext: CanvasRenderingContext2D;
    let canvasWidth: number = 0;
    let canvasHeight: number = 0;
    let stars: Star[] = [];
    let blobs: Blob[] = [
        {
            x: 0.05,
            y: 0.7,
            radius: 400,
            color: "#003DA5",
            opacity: 0.1,
        },
        {
            x: 0.9,
            y: 0.5,
            radius: 300,
            color: "#fdda24",
            opacity: 0.1,
        },
    ];

    function getRandomPosition() {
        return {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
        };
    }

    function drawBlobsOnOffscreenCanvas() {
        offscreenContext.clearRect(0, 0, canvasWidth, canvasHeight);
        offscreenContext.globalCompositeOperation = "lighter";

        blobs.forEach(({ x, y, radius, color, opacity }) => {
            offscreenContext.globalAlpha = opacity;
            offscreenContext.fillStyle = color;
            offscreenContext.beginPath();
            offscreenContext.arc(canvasWidth * x, canvasHeight * y, radius, 0, Math.PI * 2);
            offscreenContext.closePath();
            offscreenContext.fill();
        });

        const imageData = offscreenContext.getImageData(
            0,
            0,
            OffscreenCanvas.width,
            OffscreenCanvas.height
        );
        const data = new Uint8Array(imageData.data.buffer);
        glur(data, OffscreenCanvas.width, OffscreenCanvas.height, 140);
        offscreenContext.putImageData(imageData, 0, 0);
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
        context.drawImage(OffscreenCanvas, 0, 0, canvasWidth, canvasHeight);
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
        OffscreenCanvas = document.createElement("canvas");
        offscreenContext = OffscreenCanvas.getContext("2d", {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;

        generateStars();

        drawBlobsOnOffscreenCanvas();
        requestAnimationFrame(draw);
        const renderInterval = setInterval(() => {
            requestAnimationFrame(draw);
        }, 1000 / FPS);

        return () => {
            OffscreenCanvas.remove();
            clearInterval(renderInterval);
        };
    });

    $effect(() => {
        if (
            !Canvas ||
            !OffscreenCanvas ||
            typeof innerWidth.current !== "number" ||
            typeof innerHeight.current !== "number"
        )
            return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = innerWidth.current * ratio;
        Canvas.height = innerHeight.current * ratio;
        OffscreenCanvas.width = Canvas.width * OFFSCREEN_SCALE;
        OffscreenCanvas.height = Canvas.height * OFFSCREEN_SCALE;
        Canvas.style.width = `${innerWidth.current}px`;
        Canvas.style.height = `${innerHeight.current}px`;
        canvasWidth = innerWidth.current;
        canvasHeight = innerHeight.current;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        offscreenContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        offscreenContext.scale(OFFSCREEN_SCALE, OFFSCREEN_SCALE);

        drawBlobsOnOffscreenCanvas();
        generateStars();
    });
</script>

<div class="cover-screen relative overflow-hidden">
    <canvas bind:this={Canvas} class="y-center x-center cover-screen"></canvas>

    <div class="y-center left-[10%] z-2 md:left-[13%] lg:left-[15%]">
        <h1 class="text-3xl font-medium md:text-5xl">Hi, I'm Landon</h1>
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

                47%,
                80% {
                    opacity: 0;
                }

                48% {
                    transform: translateY(15px);
                }

                49% {
                    transform: translateY(0px);
                }

                100% {
                    opacity: 1;
                }
            }
        </style>
    </div>

    <div
        class="from-page absolute bottom-0 left-0 z-1 h-1/8 w-full bg-linear-to-t to-transparent"
    ></div>
</div>
