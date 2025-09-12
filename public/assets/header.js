document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <header>
            <img src="logo.png" alt="Lifters Link Logo" class="logo">
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
