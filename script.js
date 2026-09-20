/* ============================================================
   TUTEDUDE - SHARED SCRIPTS
   ============================================================ */

/* ---------- THEME (applied immediately, before DOM ready) ----------
   Runs outside DOMContentLoaded so the correct color grade is set
   BEFORE first paint → no flash, no wrong-grade flicker.
   `colorScheme` is the missing piece: it tells the browser to render
   native UI (scrollbars, form controls, autofill) in the matching
   color scheme, which prevents the "broken grade" look on theme swap.
------------------------------------------------------------------- */
(function applyInitialTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    let theme;

    if (saved === 'dark' || saved === 'light') {
        theme = saved;
    } else {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
    root.style.colorScheme = theme;   // ← THE FIX
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle (Dark Mode) ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const htmlElement = document.documentElement;

        // Sync the icon with whatever theme was applied pre-paint
        const isDarkNow = htmlElement.getAttribute('data-theme') === 'dark';
        if (themeIcon) {
            themeIcon.classList.toggle('fa-sun', isDarkNow);
            themeIcon.classList.toggle('fa-moon', !isDarkNow);
        }

        themeToggle.addEventListener('click', () => {
            const currentlyDark = htmlElement.getAttribute('data-theme') === 'dark';

            if (currentlyDark) {
                htmlElement.removeAttribute('data-theme');
                htmlElement.style.colorScheme = 'light';
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                htmlElement.style.colorScheme = 'dark';
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Login/Logout Logic ---
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.getElementById('modalClose');
    const loginForm = document.getElementById('loginForm');

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true' && authButtons && userProfile) {
        authButtons.style.display = 'none';
        userProfile.style.display = 'flex';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', () => alert("Signup flow would go here."));
    }
    if (modalClose) {
        modalClose.addEventListener('click', () => loginModal.classList.remove('active'));
    }
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) loginModal.classList.remove('active');
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            if (authButtons) authButtons.style.display = 'none';
            if (userProfile) userProfile.style.display = 'flex';
            if (loginModal) loginModal.classList.remove('active');
            loginForm.reset();
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            if (authButtons) authButtons.style.display = 'flex';
            if (userProfile) userProfile.style.display = 'none';
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    // --- Search & Filter (Courses Page) ---
    const searchInput = document.getElementById('courseSearch');
    const categoryLinks = document.querySelectorAll('#categoryFilterList a');
    const courseCards = document.querySelectorAll('.course-list-card');
    const courseCount = document.getElementById('courseCount');

    function updateCount(count) {
        if (courseCount) {
            courseCount.textContent = `Showing ${count} course${count !== 1 ? 's' : ''}`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            courseCards.forEach(card => {
                const title = card.querySelector('h4') ? card.querySelector('h4').textContent.toLowerCase() : '';
                const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            updateCount(visibleCount);
        });
    }

    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const category = link.getAttribute('data-category');
                let visibleCount = 0;

                courseCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                updateCount(visibleCount);

                if (searchInput) searchInput.value = '';
            });
        });
    }

    if (courseCount && courseCards.length > 0) {
        updateCount(courseCards.length);
    }
});