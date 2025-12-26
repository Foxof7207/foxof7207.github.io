document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(btn => {
        btn.onclick = () => {
            const content = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close other accordions (optional, but cleaner)
            // accordionButtons.forEach(otherBtn => {
            //     if (otherBtn !== btn) {
            //         otherBtn.setAttribute('aria-expanded', 'false');
            //         otherBtn.nextElementSibling.style.maxHeight = null;
            //     }
            // });

            btn.setAttribute('aria-expanded', !isOpen);
            content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
        };
    });
});
