document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");
    if (!headerContainer) return;

    // 현재 페이지 경로 분석
    const path = window.location.pathname;

    // GitHub Pages 기준: /portfolio/ 가 루트
    // index.html → /portfolio/index.html
    // app/page.html → /portfolio/app/page.html
    const depth = path.split("/").filter(Boolean).length;

    // depth === 2 → /portfolio/index.html
    // depth >= 3 → /portfolio/app/xxx.html
    const headerPath = depth === 2
        ? "header.html"
        : "../header.html";

    fetch(headerPath)
        .then(res => res.text())
        .then(html => headerContainer.innerHTML = html)
        .catch(err => console.error("Header load failed:", err));
});
