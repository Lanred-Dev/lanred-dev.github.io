<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import { email, GitHub, LinkedIn } from "$lib/data/socials";
</script>

<div class="section" id="contact">
    <div class="header">
        <h2 class="title">Need to contact me?</h2>
        <p class="subtitle">
            I'm always open to discussing new projects, ideas, and to be part of your visions!
        </p>
    </div>

    <div class="flex-center flex-col">
        <!--eslint-disable-next-line svelte/no-navigation-without-resolve-->
        <a href={email.url} class="button-attention">
            <Icon icon={email.icon} />
            {email.text}
        </a>

        <div class="flex gap-x-4 mt-4">
            {#each [GitHub, LinkedIn] as social, index (index)}
                <a
                    href={social.url}
                    target="_blank"
                    rel="external noopener noreferrer"
                    aria-label={social.text}
                >
                    <Icon class="size-7 fill-white" icon={social.icon} />
                </a>
            {/each}
        </div>
    </div>
</div>
