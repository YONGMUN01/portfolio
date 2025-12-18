document.addEventListener("DOMContentLoaded", () => {
    fetch("/header.html")
        .then(res => {
            if (!res.ok) throw new Error("Header load failed");
            return res.text();
        })
        .then(html => {
            document.getElementById("header-container").innerHTML = html;
        })
        .catch(err => {
            console.error("헤더 로딩 실패:", err);
        });
});
