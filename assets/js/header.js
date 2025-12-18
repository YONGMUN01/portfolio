document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("header-container");
    if (!container) return;

    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    /*
      GitHub Pages 기준
      /portfolio/index.html           → segments.length === 2
      /portfolio/app/page.html        → segments.length >= 3
    */

    const headerPath =
        segments.length === 2
            ? "header.html"
            : "../header.html";

    fetch(headerPath)
        .then(res => {
            if (!res.ok) throw new Error("Header load failed");
            return res.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(err => {
            console.error("헤더 로딩 실패:", err);
        });
});
