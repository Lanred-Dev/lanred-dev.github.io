import type { Project } from ".";

const justreddit: Project = {
    name: "justreddit",
    description:
        "A simple no-dependency Reddit API wrapper for getting post, comment, and subreddit metadata.",
    technologies: ["node.js"],
    languages: ["TypeScript"],
    version: {
        text: "v5.2.3",
        color: "--color-success",
    },
    source: "https://github.com/Lanred-Dev/justreddit",
    action: {
        text: "NPM Package",
        url: "https://www.npmjs.com/package/justreddit",
    },
    images: [],
    theme: {
        font: "GoogleSansCode",
        accentColor: "#D93900",
        accentTextColor: "#FFFFFF",
        accentColorLight: "#FF6A4D",
    },
};

export default justreddit;
