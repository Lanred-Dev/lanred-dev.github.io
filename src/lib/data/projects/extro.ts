import type { Project } from ".";

const extro: Project = {
    name: "extro",
    description: "A 2D game engine written in Python that uses Pyray (Raylib) as its backend.",
    technologies: ["pyray (raylib)", "nanobind", "CMake"],
    languages: ["Python", "C++"],
    version: {
        text: "v0.11.0-alpha",
        color: "--color-warning",
    },
    source: "https://github.com/Lanred-Dev/extro",
    images: [
        "/images/projects/extro/animated_sprite.gif",
        "/images/projects/extro/physics_and_collisions.gif",
        "/images/projects/extro/sin.gif",
    ],
};

export default extro;
