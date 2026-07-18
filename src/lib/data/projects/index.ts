interface Tag {
    text: string;
    color: string;
}

export interface Project {
    name: string;
    description: string;
    technologies?: string[];
    languages: string[];
    version: Tag;
    source: string;
    action?: {
        text: string;
        url: string;
    };
    images: string[];
}

export { default as extro } from "./extro";
export { default as Fluid } from "./Fluid";
export { default as HarderMC } from "./HarderMC";
export { default as indxo } from "./indxo";
export { default as justreddit } from "./justreddit";
export { default as MandelbrotViewer } from "./MandelbrotViewer";
export { default as verbose } from "./verbose";
