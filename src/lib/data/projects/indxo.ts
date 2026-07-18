import type { Project } from ".";

const indxo: Project = {
    name: "indxo.app",
    description: "A Quizlet-inspired studying website built with SvelteKit.",
    technologies: ["SvelteKit", "node.js", "MongoDB"],
    languages: ["TypeScript"],
    version: {
        text: "In Development",
        color: "--color-warning",
    },
    source: "https://github.com/Lanred-Dev/indxo.app",
    action: {
        text: "Live Demo",
        url: "https://indxo.app",
    },
    images: [
        "/images/projects/indxo/create-study-set.png",
        "/images/projects/indxo/favorites.png",
        "/images/projects/indxo/sort-mode.png",
        "/images/projects/indxo/study-set.png",
    ],
};

export default indxo;
