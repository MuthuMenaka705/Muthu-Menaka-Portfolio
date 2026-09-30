/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

}


/* =====================================================
   NAVBAR SCROLL
===================================================== */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },

        {
            threshold: .35
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .10
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   CURSOR GLOW
===================================================== */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


window.addEventListener(
    "mousemove",
    event => {

        if (!cursorGlow) return;


        cursorGlow.style.left =
            event.clientX + "px";


        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =====================================================
   3D PROFILE CARD
===================================================== */

const profileCard =
    document.getElementById(
        "profileCard"
    );


if (profileCard) {

    profileCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                profileCard
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (x - centerX) / 18;


            const rotateX =
                (centerY - y) / 18;


            profileCard.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(
                    1.02,
                    1.02,
                    1.02
                )
                `;

        }
    );


    profileCard.addEventListener(
        "mouseleave",
        () => {

            profileCard.style.transform =
                "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

        }
    );

}


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

const magneticButtons =
    document.querySelectorAll(
        ".magnetic"
    );


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `
                translate(
                    ${x * .12}px,
                    ${y * .12}px
                )
                `;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0,0)";

        }
    );

});


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById(
        "particleCanvas"
    );


const ctx =
    canvas.getContext("2d");


let particles = [];


const mouse = {

    x: null,

    y: null,

    radius: 130

};


/* Resize */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* Mouse */

window.addEventListener(
    "mousemove",
    event => {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

    }
);


window.addEventListener(
    "mouseout",
    () => {

        mouse.x = null;

        mouse.y = null;

    }
);


/* =====================================================
   PARTICLE CLASS
===================================================== */

class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;


        this.y =
            Math.random() *
            canvas.height;


        this.size =
            Math.random() * 1.6 +
            .4;


        this.speedX =
            (Math.random() - .5) *
            .35;


        this.speedY =
            (Math.random() - .5) *
            .35;

    }


    update() {

        this.x +=
            this.speedX;


        this.y +=
            this.speedY;


        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.speedX *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.speedY *= -1;

        }


        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                this.x - mouse.x;


            const dy =
                this.y - mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                mouse.radius
            ) {

                const angle =
                    Math.atan2(
                        dy,
                        dx
                    );


                const force =
                    (
                        mouse.radius -
                        distance
                    ) /
                    mouse.radius;


                this.x +=
                    Math.cos(angle) *
                    force *
                    1.4;


                this.y +=
                    Math.sin(angle) *
                    force *
                    1.4;

            }

        }

    }


    draw() {

        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "rgba(184,255,92,.55)";


        ctx.fill();

    }

}


/* =====================================================
   CREATE PARTICLES
===================================================== */

function createParticles() {

    particles = [];


    const area =
        canvas.width *
        canvas.height;


    const count =
        Math.min(
            Math.floor(
                area / 15000
            ),
            110
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


/* =====================================================
   CONNECT PARTICLES
===================================================== */

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;


            const dy =
                particles[a].y -
                particles[b].y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < 120
            ) {

                const opacity =
                    1 -
                    distance / 120;


                ctx.beginPath();


                ctx.strokeStyle =
                    `
                    rgba(
                        184,
                        255,
                        92,
                        ${opacity * .12}
                    )
                    `;


                ctx.lineWidth =
                    .6;


                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );


                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );


                ctx.stroke();

            }

        }

    }

}


/* =====================================================
   PARTICLE ANIMATION
===================================================== */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    connectParticles();


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =====================================================
   RECREATE PARTICLES
===================================================== */

window.addEventListener(
    "resize",
    () => {

        createParticles();

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}