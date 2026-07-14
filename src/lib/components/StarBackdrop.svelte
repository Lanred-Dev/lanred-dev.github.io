<script lang="ts">
    import { onMount } from "svelte";
    import type { ClassValue } from "svelte/elements";

    let {
        class: className,
                width,
        height,
        starCount = 300,
        starSizeRange = [0.5, 1.5],
        fps = 30,
        starOpacity = 0.3,
    }: {
        class?: ClassValue;
        width: number;
        height: number;
        starCount?: number;
        starSizeRange?: [number, number];
        fps?: number;
        starOpacity?: number;
    } = $props();

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
    let lastFrameAt: number = Date.now();
    let Canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let stars: Star[] = [];

    function getRandomPosition() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
        };
    }

    function draw() {
        delta = Date.now() - lastFrameAt;
        lastFrameAt = Date.now();

        context.clearRect(0, 0, width, height);

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

            context.globalAlpha = star.opacity * starOpacity;
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            context.fillStyle = "#FFFFFF";
            context.fill();
        });
    }

    function generateStars() {
        stars = [];

        for (let index = 0; index < starCount; index++) {
            stars.push({
                ...getRandomPosition(),
                radius: Math.random() * (starSizeRange[1] - starSizeRange[0]) + starSizeRange[0],
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
        }, 1000 / fps);

        return () => {
            clearInterval(renderInterval);
        };
    });

    $effect(() => {
        if (!Canvas) return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = width * ratio;
        Canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        generateStars();
    });
</script>

<canvas
    class={className}
    bind:clientWidth={width}
    bind:clientHeight={height}
    bind:this={Canvas}
>
</canvas>
