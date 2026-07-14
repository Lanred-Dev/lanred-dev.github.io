<script lang="ts">
    import { SoftBackdrop, SoftBackdropBlob } from "$lib/components/SoftBackdrop";
    import { innerWidth, innerHeight } from "svelte/reactivity/window";
</script>

<footer class="flex-center pb-8 pt-16 relative">
    <p class="text-dark text-center">© 2026 Landon Redmond</p>

    <SoftBackdrop
        class="absolute bottom-0 left-0 -z-1 h-screen w-full pointer-events-none"
        width={innerWidth.current ?? 0}
        height={innerHeight.current ?? 0}
    >
        <SoftBackdropBlob x={0.5} y={1.2} radius={400} color="#fdda24" opacity={0.08} />
    </SoftBackdrop>
</footer>
