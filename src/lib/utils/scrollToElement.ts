export default function scrollToElement(element: string) {
    document.querySelector(element)?.scrollIntoView({ behavior: "smooth" });
}
