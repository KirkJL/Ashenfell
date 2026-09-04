"use strict";

/* ==========================================================
   ASHENFELL.WORLD
   Front-end interactions
========================================================== */


/* ==========================================================
   DOM REFERENCES
========================================================== */

const siteHeader =
    document.getElementById("siteHeader");

const mobileNavToggle =
    document.getElementById("mobileNavToggle");

const mainNavigation =
    document.getElementById("mainNavigation");

const scrollIndicator =
    document.getElementById("scrollIndicator");

const newsletterForm =
    document.getElementById("newsletterForm");

const emailAddress =
    document.getElementById("emailAddress");

const formMessage =
    document.getElementById("formMessage");

const currentYear =
    document.getElementById("currentYear");

const viewArchiveButton =
    document.getElementById("viewArchiveButton");


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

if (currentYear) {
    currentYear.textContent =
        String(new Date().getFullYear());
}


/* ==========================================================
   HEADER SCROLL STATE
========================================================== */

function updateHeaderState() {

    if (!siteHeader) {
        return;
    }

    const isScrolled =
        window.scrollY > 40;

    siteHeader.classList.toggle(
        "scrolled",
        isScrolled
    );
}

window.addEventListener(
    "scroll",
    updateHeaderState,
    {
        passive: true
    }
);

updateHeaderState();


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

function setMobileNavigation(open) {

    if (
        !mobileNavToggle ||
        !mainNavigation
    ) {
        return;
    }

    mobileNavToggle.classList.toggle(
        "active",
        open
    );

    mainNavigation.classList.toggle(
        "open",
        open
    );

    document.body.classList.toggle(
        "nav-open",
        open
    );

    mobileNavToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    mobileNavToggle.setAttribute(
        "aria-label",
        open
            ? "Close navigation"
            : "Open navigation"
    );
}


if (
    mobileNavToggle &&
    mainNavigation
) {

    mobileNavToggle.addEventListener(
        "click",
        function () {

            const open =
                mobileNavToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            setMobileNavigation(!open);

        }
    );


    mainNavigation
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    setMobileNavigation(false);

                }
            );

        });


    window.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                setMobileNavigation(false);
            }

        }
    );

}


/* ==========================================================
   HERO SCROLL BUTTON
========================================================== */

if (scrollIndicator) {

    scrollIndicator.addEventListener(
        "click",
        function () {

            const target =
                document.getElementById("world");

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealTargets =
    document.querySelectorAll(
        [
            ".section-heading",
            ".intro-heading",
            ".intro-copy",
            ".game-image",
            ".game-detail",
            ".map-content",
            ".chronicle-card",
            ".character-card",
            ".cards-copy",
            ".card-pack-display",
            ".newsletter-inner"
        ].join(",")
    );


revealTargets.forEach(function (element) {

    element.classList.add("reveal");

});


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.14,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealTargets.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealTargets.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* ==========================================================
   CHARACTER ARCHIVE
   Placeholder until the actual archive page exists.
========================================================== */

if (viewArchiveButton) {

    viewArchiveButton.addEventListener(
        "click",
        function () {

            const charactersSection =
                document.getElementById(
                    "characters"
                );

            if (!charactersSection) {
                return;
            }

            /*
             * When we build:
             * /characters/
             *
             * Replace this function with:
             *
             * window.location.href =
             *     "./characters/";
             */

            charactersSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* ==========================================================
   EMAIL VALIDATION
========================================================== */

function isValidEmail(value) {

    if (
        typeof value !== "string"
    ) {
        return false;
    }

    const cleaned =
        value.trim();

    if (
        cleaned.length < 3 ||
        cleaned.length > 254
    ) {
        return false;
    }

    /*
     * Intentionally simple.
     *
     * We don't attempt to fully implement RFC 5322
     * client-side because server-side validation
     * will remain authoritative.
     */
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(
        cleaned
    );
}


/* ==========================================================
   NEWSLETTER FORM
========================================================== */

if (
    newsletterForm &&
    emailAddress &&
    formMessage
) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                emailAddress.value.trim();

            formMessage.textContent = "";

            if (!isValidEmail(email)) {

                formMessage.textContent =
                    "Enter a valid email address.";

                emailAddress.focus();

                return;
            }


            /*
             * FRONT-END ONLY FOR NOW.
             *
             * We deliberately do not pretend the
             * subscription was sent anywhere.
             *
             * When the Cloudflare Worker / mailing
             * integration is created, this section
             * becomes a fetch() call to our own API.
             */

            formMessage.textContent =
                "The Ashenfell mailing list is opening soon.";

        }
    );

}
