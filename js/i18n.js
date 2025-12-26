let translations = {};

async function initI18n() {
    try {
        const response = await fetch('data/translations.json');
        translations = await response.json();
        
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        const selector = document.getElementById('languageSelector');
        if (selector) selector.value = savedLang;
        
        changeLanguage(savedLang);
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('selectedLanguage', lang);
}

// Hook into the selector if it exists
document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
