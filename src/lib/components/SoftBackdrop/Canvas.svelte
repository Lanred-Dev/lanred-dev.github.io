<script lang="ts">
    import { blurRGBA } from "glur";
    import { onMount, setContext, type ComponentProps, type Snippet } from "svelte";
    import { softBackdropContextKey, type SoftBackdropContext } from ".";
    import type Blob from "./Blob.svelte";
    import type { ClassValue } from "svelte/elements";

    let {
        class: className,
        width,
        height,
        scale = 0.9,
        children,
    }: {
        class: ClassValue;
        width: number;
        height: number;
        scale?: number;
        children: Snippet<[]>;
    } = $props();

    let Canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let blobs: ComponentProps<typeof Blob>[] = [];

    setContext<SoftBackdropContext>(softBackdropContextKey, {
        registerBlob: (blob) => {
            blobs.push(blob);
            if (context) draw();
        },
        unregisterBlob: (blob) => {
            blobs = blobs.filter((b) => b !== blob);
            if (context) draw();
        },
    });

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
        blurRGBA(data, Canvas.width, Canvas.height, 140);
        context.putImageData(imageData, 0, 0);
    }

    onMount(() => {
        context = Canvas.getContext("2d") as CanvasRenderingContext2D;
    });

    $effect(() => {
        if (!Canvas || width <= 0 || height <= 0) return;

        const ratio: number = Math.ceil(window.devicePixelRatio);
        Canvas.width = width * scale * ratio;
        Canvas.height = height * scale * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.scale(scale, scale);

        draw();
    });
</script>

<canvas class={className} bind:clientWidth={width} bind:clientHeight={height} bind:this={Canvas}>
    {@render children?.()}
</canvas>
