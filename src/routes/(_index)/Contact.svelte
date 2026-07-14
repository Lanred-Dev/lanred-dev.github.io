<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import socials from "$lib/utils/socials";
</script>

<div class="section" id="contact">
    <div class="header">
        <h2 class="title">Need to contact me?</h2>
        <p class="subtitle">
            I'm always open to discussing new projects, ideas, and to be part of your visions!
        </p>
    </div>

    <div class="flex-center flex-col">
        <a href={socials.email.url} class="button-attention">
            <Icon icon={socials.email.icon} />
            {socials.email.text}
        </a>

        <div class="flex gap-x-4 mt-4">
            {#each Object.values(socials) as social, key (key)}
                {#if social.url !== socials.email.url}
                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.text}
                    >
                        <Icon class="size-7 fill-white" icon={social.icon} />
                    </a>
                {/if}
            {/each}
        </div>
    </div>
</div>
