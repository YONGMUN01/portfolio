const headerOffset = 80; // header 높이

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function smoothScrollTo(targetY, duration = 900) {
            const startY = window.pageYOffset;
            const distance = targetY - startY;
            let startTime = null;

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easing = easeInOutCubic(progress);

                window.scrollTo(0, startY + distance * easing);

                if (elapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (!target) return;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerOffset;

                smoothScrollTo(targetPosition);
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".project-slider");
    const wrapper = document.querySelector(".project-track-wrapper");
    const track = document.querySelector(".project-track");
    const cards = document.querySelectorAll(".project-card");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (!slider || cards.length === 0) return;

    const gap = 40;
    let index = 0;

    function cardWidth() {
        return cards[0].offsetWidth + gap;
    }

    function totalWidth() {
        return cards.length * cardWidth();
    }

    function needSlide() {
        return totalWidth() > slider.offsetWidth;
    }

    function maxIndex() {
        return Math.max(cards.length - Math.floor(slider.offsetWidth / cardWidth()), 0);
    }

    function update() {
        track.style.transform = `translateX(${-index * cardWidth()}px)`;
    }

    function refresh() {
        if (needSlide()) {
            slider.classList.add("is-slide");
            nextBtn.style.display = "flex";
            prevBtn.style.display = "flex";
            update();
        } else {
            slider.classList.remove("is-slide");
            track.style.transform = "translateX(0)";
            nextBtn.style.display = "none";
            prevBtn.style.display = "none";
            index = 0;
        }
    }

    nextBtn?.addEventListener("click", () => {
        index = Math.min(index + 1, maxIndex());
        update();
    });

    prevBtn?.addEventListener("click", () => {
        index = Math.max(index - 1, 0);
        update();
    });

    window.addEventListener("resize", refresh);

    refresh();
});
