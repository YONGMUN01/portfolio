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

    const gap = parseFloat(getComputedStyle(track).gap) || 30;
    let index = 0;

    function viewportWidth() {
        const s = getComputedStyle(wrapper);
        const pl = parseFloat(s.paddingLeft) || 0;
        const pr = parseFloat(s.paddingRight) || 0;
        return wrapper.clientWidth - pl - pr;
    }

    function cardWidth() {
        return cards[0].getBoundingClientRect().width + gap;
    }

    function totalWidth() {
        return cards.length * cardWidth();
    }

    function needSlide() {
        return track.scrollWidth > viewportWidth();
    }
    function maxIndex() {
        const maxTranslate = Math.max(track.scrollWidth - viewportWidth(), 0);
        return Math.ceil(maxTranslate / cardWidth());
    }

    function update() {
        const maxTranslate = Math.max(track.scrollWidth - viewportWidth(), 0);
        const step = cardWidth();

        let x = index * step;

        // 마지막에서는 끝까지 붙여서 "잘림" 제거
        if (index >= maxIndex()) x = maxTranslate;

        x = Math.min(x, maxTranslate);

        track.style.transform = `translateX(${-x}px)`;

        prevBtn.style.display = (index <= 0) ? "none" : "flex";
        nextBtn.style.display = (x >= maxTranslate - 1) ? "none" : "flex"; // -1은 미세오차 방지
    }


    function refresh() {
        if (needSlide()) {
            slider.classList.add("is-slide");

            index = Math.min(index, maxIndex()); // ✅ 추가
            update(); // ✅ update가 버튼 표시까지 처리

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
