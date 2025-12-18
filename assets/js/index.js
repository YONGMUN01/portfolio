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