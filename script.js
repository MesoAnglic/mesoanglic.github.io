// Language content
const content = {
    en: {
        title: "My Website",
        quote: '"The journey of a thousand miles begins with a single step."',
        enter: "ENTER",
        home: "en-home.html"
    },
    es: {
        title: "Mi Sitio Web",
        quote: '"Un viaje de mil millas comienza con un solo paso."',
        enter: "ENTRAR",
        home: "es-home.html"
    },
    fr: {
        title: "Mon Site Web",
        quote: '"Un voyage de mille lieues commence par un pas."',
        enter: "ENTRER",
        home: "fr-home.html"
    },
    de: {
        title: "Meine Webseite",
        quote: '"Eine Reise von tausend Meilen beginnt mit einem einzigen Schritt."',
        enter: "EINTRETEN",
        home: "de-home.html"
    },
    zh: {
        title: "我的网站",
        quote: '"千里之行，始于足下。"',
        enter: "入",
        home: "zh-home.html"
    }
};

// Set language function
function setLanguage(lang) {
    const data = content[lang];
    
    document.getElementById('siteTitle').textContent = data.title;
    document.getElementById('quote').textContent = data.quote;
    document.getElementById('enterLink').textContent = data.enter;
    document.getElementById('enterLink').href = data.home;
    
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
    
    // Update active button styling
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Load saved language on page load
window.onload = function() {
    const saved = localStorage.getItem('selectedLanguage');
    if (saved && content[saved]) {
        setLanguage(saved);
    }
};
