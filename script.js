/* =========================================================
   MUTHU MENAKA PORTFOLIO
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =====================================================
       YEAR
       ===================================================== */

    const year =
      document.getElementById("year");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }



    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar =
      document.getElementById("navbar");


    function updateNavbar() {

      if (!navbar) return;

      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );

    }


    window.addEventListener(
      "scroll",
      updateNavbar,
      {
        passive: true
      }
    );


    updateNavbar();



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn =
      document.getElementById("menuBtn");

    const navLinks =
      document.getElementById("navLinks");


    if (
      menuBtn &&
      navLinks
    ) {

      menuBtn.addEventListener(
        "click",
        () => {

          const isOpen =
            navLinks.classList.toggle(
              "open"
            );


          menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
          );

        }
      );


      navLinks
        .querySelectorAll("a")
        .forEach(
          link => {

            link.addEventListener(
              "click",
              () => {

                navLinks.classList.remove(
                  "open"
                );


                menuBtn.setAttribute(
                  "aria-expanded",
                  "false"
                );

              }
            );

          }
        );

    }



    /* =====================================================
       TYPING ANIMATION
       ===================================================== */

    const typingText =
      document.getElementById(
        "typingText"
      );


    const roles = [

      "Python Developer",

      "Web Developer",

      "Full Stack Developer",

      "Machine Learning Developer"

    ];


    let roleIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeRole() {

      if (!typingText) return;


      const currentRole =
        roles[roleIndex];


      if (!deleting) {


        typingText.textContent =
          currentRole.slice(
            0,
            characterIndex + 1
          );


        characterIndex++;


        if (
          characterIndex ===
          currentRole.length
        ) {

          deleting = true;


          setTimeout(
            typeRole,
            1500
          );


          return;

        }


      } else {


        typingText.textContent =
          currentRole.slice(
            0,
            characterIndex - 1
          );


        characterIndex--;


        if (
          characterIndex === 0
        ) {

          deleting = false;


          roleIndex =
            (
              roleIndex + 1
            ) %
            roles.length;

        }

      }


      setTimeout(
        typeRole,
        deleting
          ? 45
          : 80
      );

    }


    typeRole();



    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements =
      document.querySelectorAll(
        `
        .section-intro,
        .skill-card,
        .project-card,
        .experience-item,
        .education-card,
        .cert-card
        `
      );


    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "reveal",
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: .12
        }
      );


    revealElements.forEach(
      element => {

        element.classList.add(
          "reveal"
        );


        revealObserver.observe(
          element
        );

      }
    );



    /* =====================================================
       ACTIVE NAV
       ===================================================== */

    const sections =
      document.querySelectorAll(
        "main section[id]"
      );


    const navItems =
      document.querySelectorAll(
        ".nav-links a"
      );


    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              navItems.forEach(
                link => {

                  link.classList.remove(
                    "active"
                  );


                  if (
                    link.getAttribute(
                      "href"
                    ) ===
                    `#${entry.target.id}`
                  ) {

                    link.classList.add(
                      "active"
                    );

                  }

                }
              );

            }
          );

        },
        {
          threshold: .35
        }
      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );



    /* =====================================================
       PARTICLE BACKGROUND
       ===================================================== */

    const canvas =
      document.getElementById(
        "particles"
      );


    if (!canvas) return;


    const ctx =
      canvas.getContext("2d");


    let particles = [];


    const mouse = {

      x: null,

      y: null

    };


    function resizeCanvas() {

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      canvas.width =
        window.innerWidth *
        dpr;


      canvas.height =
        window.innerHeight *
        dpr;


      canvas.style.width =
        `${window.innerWidth}px`;


      canvas.style.height =
        `${window.innerHeight}px`;


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      createParticles();

    }



    function createParticles() {

      const particleCount =
        window.innerWidth < 700
          ? 35
          : 70;


      particles =
        Array.from(
          {
            length:
              particleCount
          },
          () => ({

            x:
              Math.random() *
              window.innerWidth,

            y:
              Math.random() *
              window.innerHeight,

            size:
              Math.random() *
              1.4 +
              .4,

            speedX:
              (
                Math.random() -
                .5
              ) *
              .25,

            speedY:
              (
                Math.random() -
                .5
              ) *
              .25,

            opacity:
              Math.random() *
              .45 +
              .15

          })
        );

    }



    function drawParticles() {

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );


      particles.forEach(
        (
          particle,
          index
        ) => {


          particle.x +=
            particle.speedX;


          particle.y +=
            particle.speedY;


          if (
            particle.x < 0 ||
            particle.x >
              window.innerWidth
          ) {

            particle.speedX *=
              -1;

          }


          if (
            particle.y < 0 ||
            particle.y >
              window.innerHeight
          ) {

            particle.speedY *=
              -1;

          }


          if (
            mouse.x !== null
          ) {

            const dx =
              particle.x -
              mouse.x;


            const dy =
              particle.y -
              mouse.y;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance < 130 &&
              distance > 0
            ) {

              particle.x +=
                (
                  dx /
                  distance
                ) *
                .45;


              particle.y +=
                (
                  dy /
                  distance
                ) *
                .45;

            }

          }


          ctx.beginPath();


          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );


          ctx.fillStyle =
            `rgba(
              184,
              255,
              92,
              ${particle.opacity}
            )`;


          ctx.fill();


          for (
            let j = index + 1;
            j < particles.length;
            j++
          ) {

            const other =
              particles[j];


            const dx =
              particle.x -
              other.x;


            const dy =
              particle.y -
              other.y;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance < 105
            ) {

              ctx.beginPath();


              ctx.moveTo(
                particle.x,
                particle.y
              );


              ctx.lineTo(
                other.x,
                other.y
              );


              ctx.strokeStyle =
                `rgba(
                  184,
                  255,
                  92,
                  ${
                    .055 *
                    (
                      1 -
                      distance /
                      105
                    )
                  }
                )`;


              ctx.lineWidth =
                .5;


              ctx.stroke();

            }

          }

        }
      );


      requestAnimationFrame(
        drawParticles
      );

    }



    /* MOUSE */

    window.addEventListener(
      "mousemove",
      event => {

        mouse.x =
          event.clientX;

        mouse.y =
          event.clientY;

      },
      {
        passive: true
      }
    );


    window.addEventListener(
      "mouseleave",
      () => {

        mouse.x = null;
        mouse.y = null;

      }
    );


    /* RESIZE */

    window.addEventListener(
      "resize",
      resizeCanvas
    );


    resizeCanvas();

    drawParticles();

  }
);
