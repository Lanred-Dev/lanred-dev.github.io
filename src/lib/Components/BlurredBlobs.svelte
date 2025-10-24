<script lang="ts">
    /**
     * A "OffscreenCanvas" is used to draw and blur the colored blobs before drawing them onto the main canvas. This "OffscreenCanvas" is just a canvas element that is not added to the DOM. This approach is taken because the actual OffscreenCanvas API has limited browser support. And to achieve better performance the offscreen canvas is rendered at a smaller size (scaled down by CANVAS_SCALE) and then scaled up when drawn onto the main canvas.
     */

    import glur from "glur";
    import { onMount } from "svelte";

    const CANVAS_SCALE: number = 0.6;

    export interface Blob {
        x: number;
        y: number;
        radius: number;
        color: string;
        opacity: number;
    }

    let {
        blobs,
        width,
        height,
        Canvas = $bindable(),
    }: {
        blobs: Blob[];
        width: number;
        height: number;
        Canvas: HTMLCanvasElement;
    } = $props();

    let context: CanvasRenderingContext2D;

    function draw() {
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = "lighter";

        blobs.forEach(({ x, y, radius, color, opacity }) => {
            context.globalAlpha = opacity;
            context.fillStyle = color;
            context.beginPath();
            context.arc(width * x, height * y, radius, 0, Math.PI * 2);
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
        // The reason for not using `willReadFrequently` here is because its not intended for the blobs to redrawn frequently.
        context = Canvas.getContext("2d") as CanvasRenderingContext2D;

        return () => {
            Canvas.remove();
        };
    });

    $effect(() => {
        if (!Canvas || width <= 0 || height <= 0) return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = width * CANVAS_SCALE * ratio;
        Canvas.height = height * CANVAS_SCALE * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.scale(CANVAS_SCALE, CANVAS_SCALE);

        draw();
    });
</script>
