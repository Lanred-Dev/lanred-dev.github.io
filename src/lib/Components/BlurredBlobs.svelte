<script lang="ts">
    /**
     * A "OffscreenCanvas" is used to draw and blur the colored blobs before drawing them onto the main canvas. This "OffscreenCanvas" is just a canvas element that is not added to the DOM. This approach is taken because the actual OffscreenCanvas API has limited browser support. And to achieve better performance the offscreen canvas is rendered at a smaller size (scaled down by OFFSCREEN_SCALE) and then scaled up when drawn onto the main canvas.
     */

    import glur from "glur";
    import { onMount } from "svelte";

    const OFFSCREEN_SCALE: number = 0.4;

    export interface Blob {
        x: number;
        y: number;
        radius: number;
        color: string;
        opacity: number;
    }

    let {
        blobs,
        canvasWidth,
        canvasHeight,
        Canvas = $bindable(),
    }: {
        blobs: Blob[];
        canvasWidth: number;
        canvasHeight: number;
        Canvas: HTMLCanvasElement;
    } = $props();

    let context: CanvasRenderingContext2D;

    function draw() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.globalCompositeOperation = "lighter";

        blobs.forEach(({ x, y, radius, color, opacity }) => {
            context.globalAlpha = opacity;
            context.fillStyle = color;
            context.beginPath();
            context.arc(canvasWidth * x, canvasHeight * y, radius, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        });

        const imageData = context.getImageData(0, 0, Canvas.width, Canvas.height);
        const data = new Uint8Array(imageData.data.buffer);
        glur(data, Canvas.width, Canvas.height, 140);
        context.putImageData(imageData, 0, 0);
    }

    onMount(() => {
        Canvas = document.createElement("canvas");
        context = Canvas.getContext("2d") as CanvasRenderingContext2D;

        draw();

        return () => {
            Canvas.remove();
        };
    });

    $effect(() => {
        if (!Canvas || canvasWidth <= 0 || canvasHeight <= 0) return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = canvasWidth * ratio * OFFSCREEN_SCALE;
        Canvas.height = canvasHeight * ratio * OFFSCREEN_SCALE;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.scale(OFFSCREEN_SCALE, OFFSCREEN_SCALE);

        draw();
    });
</script>
