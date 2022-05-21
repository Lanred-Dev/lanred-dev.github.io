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
            duration: 750,
            easing: "easeOutExpo",
            delay: (_, Index) => 50 * Index,
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
            duration: 750,
            easing: "easeOutExpo",
            delay: (_, Index) => 50 * Index,
        });
})();

(function () {
    const Page_Navbar = document.querySelector(".page-navbar");
    const Scroll_Status_Container = Page_Navbar.querySelector(".scroll-status-container");
    const Scroll_Status_Items = {};
    Scroll_Status_Container.querySelectorAll(".text").forEach((Item) => {
        Scroll_Status_Items[Item.dataset.section] = Item;
    });
    const Page_Sections = document.querySelectorAll(".page-section");
    let Current_Page_Section = Page_Sections[0];
    const Update_Scroll_Status = () => {
        Page_Sections.forEach((Section) => {
            const Section_Name = Section.dataset.section;
            const Section_Top = Section.offsetTop;
            const Section_Height = Section.clientHeight;
            const Scroll_Status_Item = Scroll_Status_Items[Section_Name];

            if (scrollY >= (Section_Top - Section_Height / 3)) {
                Current_Page_Section = Section_Name;
            }
        });

        for (const Item in Scroll_Status_Items) {
            if (Item === Current_Page_Section) {
                Scroll_Status_Items[Item].classList.add("active");
            } else {
                Scroll_Status_Items[Item].classList.remove("active");
            }
        }
    }

    Update_Scroll_Status();

    window.addEventListener("scroll", () => {
        Update_Scroll_Status();
    });
})();
