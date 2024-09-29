document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <header>
            <img src="logo.png" alt="Lifters Link Logo" class="logo">
            <nav>
                <ul>
                    <li><a href="about_us.html">About Us</a></li>
                </ul>
            </nav>
        </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});
