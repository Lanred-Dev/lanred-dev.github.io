(function () {
    new Granim({
        element: ".site-banner",
        direction: "radial",
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ["#FB116F", "#ff3094"],
                    ["#ff3094", "#FB116F"],
                    ["#7730FF", "#cf30ff"],
                    ["#cf30ff", "#7730FF"],
                ],
            },
        },
    });
})();

(function () {
    const Welcome_Container = document.querySelector(".welcome");
    const Logo_Container = Welcome_Container.querySelector(".logo");
    const Logo_Text_Container = Logo_Container.querySelector(".logo-text-container");
    const Logo_Text = Logo_Text_Container.querySelector(".logo-text");
    Logo_Text.innerHTML = Logo_Text.textContent.replace(/\S/g, `<span class="letter">$&</span>`);
    const Letters = Logo_Text.querySelectorAll(".letter");
    Letters.forEach((Letter, Index) => {
        if (Index === 8) {
            Letter.insertAdjacentHTML("afterend", "<br>");
        }
    });
    const Slogan_Container = Logo_Container.querySelector(".slogan-container");
    const Slogan_Text = Slogan_Container.querySelector(".slogan-text");
    Slogan_Text.innerHTML = Slogan_Text.textContent.replace(/\S/g, `<span class="letter">$&</span>`);

    anime
        .timeline({ loop: false })
        .add({
            targets: Letters,
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            opacity: {
                value: [0, 1],
                duration: 400,
                easing: "linear",
            },
            duration: 1000,
            easing: "easeOutExpo",
            delay: (_, Index) => 75 * Index,
            begin: () => {
                Logo_Text.style["display"] = "block";
                Slogan_Text.style["display"] = "block";
            },
        })
        .add({
            targets: ".page-content .welcome .slogan-container .slogan-text .letter",
            translateY: ["1.1em", 0],
            translateX: ["0.55em", 0],
            translateZ: 0,
            rotateZ: [180, 0],
            opacity: {
                value: [0, 1],
                duration: 400,
                easing: "linear",
            },
            duration: 1000,
            easing: "easeOutExpo",
            delay: (_, Index) => 75 * Index,
        });
})();
