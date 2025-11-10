// Language content
const content = {
    en: {
        title: "Zoso Project",
        quote: '"Every night as I gazed up at the window I said to myself softly the word paralysis."',
        enter: "ENTER",
        home: "/en/en-home.html"
    },
    jp: {
        title: "ゾソProject",
        quote: '「結びつる心も深き元結ひに濃き紫の色し褪せずは。」',
        enter: "入力",
        home: "/jp/jp-home.html"
    },
    eo: {
        title: "Zoso Projekto",
        quote: '"Kiam la popoloj povos interkompreniĝi, ili ĉesos malami unu la alian."',
        enter: "ENIRI",
        home: "/eo/eo-home.html"
    },
    zh: {
        title: "土星Project",
        quote: '『潦倒不通庶务，愚顽怕读文章。』',
        enter: "入",
        home: "/zh/zh-home.html"
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
