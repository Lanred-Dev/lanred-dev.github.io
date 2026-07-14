<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
</script>

<div class="section" id="contact">
    <div class="header">
        <h2 class="title">Need to contact me?</h2>
        <p class="subtitle">
            I'm always open to discussing new projects, ideas, and to be part of your visions!
        </p>
    </div>

    <div class="flex-center flex-col">
        <a href="mailto:landon.redmond@gmail.com" class="button-attention">
            <Icon icon="general/Mail" />
            landon.redmond@gmail.com
        </a>

        <div class="flex gap-x-2 mt-4">
            <a
                href="https://github.com/lanred-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
            >
                <Icon class="size-7" icon="logos/GitHub" />
            </a>
        </div>
    </div>
</div>
