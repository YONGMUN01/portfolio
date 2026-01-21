function smoothScrollTo(targetY, duration = 900) {
            const startY = window.pageYOffset;
            const distance = targetY - startY;
            let startTime = null;

            function easeInOutCubic(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);

                window.scrollTo(0, startY + distance * eased);

                if (elapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }

        document.querySelectorAll('.side-nav a').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // ✅ #으로 시작하는 내부 섹션 링크만 가속 스크롤 적용
                if (!href.startsWith('#')) {
                    return; // 브라우저 기본 동작 허용 (페이지 이동)
                }

                e.preventDefault();

                const targetEl = document.querySelector(href);
                if (!targetEl) return;

                const rect = targetEl.getBoundingClientRect();
                const elementTop = rect.top + window.pageYOffset;
                const elementHeight = rect.height;
                const viewportHeight = window.innerHeight;

                const targetPosition =
                    elementTop
                    - (viewportHeight / 2)
                    + (elementHeight / 2);

                smoothScrollTo(targetPosition);
            });
        });