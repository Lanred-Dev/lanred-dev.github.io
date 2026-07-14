<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { softBackdropContextKey, type SoftBackdropContext } from ".";

    // eslint-disable-next-line svelte/no-unused-props
    let properties: {
        x: number;
        y: number;
        radius: number;
        color: string;
        opacity: number;
    } = $props();

    const softBackdropContext: SoftBackdropContext = getContext(softBackdropContextKey);

    onMount(() => {
        softBackdropContext.registerBlob(properties);

        return () => {
            softBackdropContext.unregisterBlob(properties);
        };
    });
</script>
