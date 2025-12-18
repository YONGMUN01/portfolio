document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("header-container");
    if (!container) return;

    const path = window.location.pathname;

    /*
      실제 케이스
      /portfolio/                → index
      /portfolio/index.html      → index
      /portfolio/app/page.html   → sub
    */

    const isIndex =
        path === "/portfolio/" ||
        path === "/portfolio/index.html";

    const headerPath = isIndex
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

