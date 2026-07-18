import type { Project } from ".";

const MandelbrotViewer: Project = {
    name: "Mandelbrot Viewer",
    description: "A real-time Mandelbrot set viewer written in C++ using OpenGL.",
    technologies: ["glad", "GLFW", "OpenGL", "CMake"],
    languages: ["C++"],
    version: {
        text: "v2.1.0",
        color: "--color-success",
    },
    source: "https://github.com/Lanred-Dev/mandelbrot-viewer",
    action: {
        text: "Download",
        url: "https://github.com/Lanred-Dev/mandelbrot-viewer/releases",
    },
    images: [
        "/images/projects/MandelbrotViewer/screenshot1.png",
        "/images/projects/MandelbrotViewer/screenshot2.png",
        "/images/projects/MandelbrotViewer/screenshot3.png",
    ],
};

export default MandelbrotViewer;
