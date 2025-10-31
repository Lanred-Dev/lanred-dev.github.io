<!-- svelte-ignore non_reactive_update -->
<script lang="ts">
    import BlurredBlobs from "$lib/Components/BlurredBlobs.svelte";
    import { onMount } from "svelte";

    const FPS: number = 1;

    let BlobsCanvas: HTMLCanvasElement;
    let Canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let canvasWidth: number = $state.raw(0);
    let canvasHeight: number = $state.raw(0);

    function draw() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.globalAlpha = 0.5;
        context.drawImage(BlobsCanvas, 0, 0, canvasWidth, canvasHeight);
    }

    onMount(() => {
        context = Canvas.getContext("2d") as CanvasRenderingContext2D;

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
    });
</script>

<BlurredBlobs
    blobs={[
        {
            x: 0.9,
            y: 1,
            radius: 300,
            color: "#fdda24",
            opacity: 0.2,
        },
    ]}
    width={canvasWidth}
    height={canvasHeight}
    bind:Canvas={BlobsCanvas}
/>

<div class="section relative" id="contact">
    <canvas
        class="absolute top-0 left-0 z-0 h-full w-full"
        bind:this={Canvas}
        bind:clientWidth={canvasWidth}
        bind:clientHeight={canvasHeight}
    ></canvas>

    <div class="relative z-1">
        <h2 class="text-3xl font-medium md:text-5xl">Need to contact me?</h2>
        <p class="mt-2 text-xl">
            You can send me an email at <a
                href="mailto:landon.redmond@gmail.com"
                class="text-[#e4c83b]">landon.redmond@gmail.com</a
            >.
        </p>
    </div>

    <p class="text-secondary absolute bottom-10 left-[6%] md:left-[13%] lg:left-[15%]">
        © 2025 Landon Redmond
    </p>
</div>
