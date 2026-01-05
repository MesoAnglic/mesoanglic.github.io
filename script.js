const bahaiMonths = {
    en: [
        "Bahá", "Jalál", "Jamál", "'Aẓamat", "Núr", "Raḥmat",
        "Kalimát", "Kamál", "Asmá'", "'Izzat", "Mashíyyat", "'Ilm",
        "Qudrat", "Qawl", "Masá'il", "Sharaf", "Sulṭán", "Mulk",
        "Ayyám-i-Há", "'Alá'"
    ],
    jp: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18",
        "アヤメ・ハ", "19"
    ],
    eo: [
        "Bahao", "Ĵalalo", "Ĵamalo", "Azamato", "Nuro", "Ramato",
        "Kalemato", "Kamalo", "Asmao", "Ezato", "Maŝijato", "Elmo",
        "Godrato", "Goŭlo", "Masaelo", "Ŝarafo", "Soltano", "Molko",
        "Ajamo-i-Hao", "Alao"
    ],
    zh: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18",
        "阿亚密哈", "19"
    ]
};

const content = {
    en: {
        title: "Zoso Project",
        quote: '"Every night as I gazed up at the window I said to myself softly the word paralysis."',
        enter: "ENTER",
        home: "/en/en-home.html",
        todayIs: "Today is:",
        dateFormat: (day, month, year) => `${day} ${month} ${year} BE`
    },
    jp: {
        title: "ゾソProject",
        quote: '「結びつる心も深き元結ひに濃き紫の色し褪せずは。」',
        enter: "入力",
        home: "/jp/jp-home.html",
        todayIs: "今日は：",
        dateFormat: (day, month, year) => `${year}年${month}月${day}日`
    },
    eo: {
        title: "Zoso Projekto",
        quote: '"Kiam la popoloj povos interkompreniĝi, ili ĉesos malami unu la alian."',
        enter: "ENIRI",
        home: "/eo/eo-home.html",
        todayIs: "Hodiaŭ estas:",
        dateFormat: (day, month, year) => `${day} ${month} ${year} BE`
    },
    zh: {
        title: "土星Project",
        quote: '『潦倒不通庶务，愚顽怕读文章。』',
        enter: "入",
        home: "/zh/zh-home.html",
        todayIs: "今天是：",
        dateFormat: (day, month, year) => `${year}年${month}月${day}日`
    }
};

function setLanguage(lang) {
    const data = content[lang];

    document.getElementById('siteTitle').textContent = data.title;
    document.getElementById('quote').textContent = data.quote;
    document.getElementById('enterLink').textContent = data.enter;
    document.getElementById('enterLink').href = data.home;

    localStorage.setItem('selectedLanguage', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayBahaiCalendar(lang);
}

function getBahaiDate(date, lang = 'en') {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const nawRuzMonth = 2;
    const nawRuzDay = 20;

    let bahaiYear;
    if (month > nawRuzMonth || (month === nawRuzMonth && day >= nawRuzDay)) {
        bahaiYear = year - 1844 + 1;
    } else {
        bahaiYear = year - 1844;
    }

    const nawRuzDate = new Date(year, nawRuzMonth, nawRuzDay);
    let dayOfBahaiYear;

    if (month > nawRuzMonth || (month === nawRuzMonth && day >= nawRuzDay)) {
        dayOfBahaiYear = Math.floor((date - nawRuzDate) / (1000 * 60 * 60 * 24)) + 1;
    } else {
        const prevNawRuz = new Date(year - 1, nawRuzMonth, nawRuzDay);
        dayOfBahaiYear = Math.floor((date - prevNawRuz) / (1000 * 60 * 60 * 24)) + 1;
    }

    let bahaiMonth, bahaiDay;

    if (dayOfBahaiYear <= 342) {
        bahaiMonth = Math.ceil(dayOfBahaiYear / 19) - 1;
        bahaiDay = ((dayOfBahaiYear - 1) % 19) + 1;
    } else if (dayOfBahaiYear <= 346 || (dayOfBahaiYear <= 347 && isLeapYear(year))) {
        bahaiMonth = 18;
        bahaiDay = dayOfBahaiYear - 342;
    } else {
        bahaiMonth = 19;
        const ayyamLength = isLeapYear(year) ? 5 : 4;
        bahaiDay = dayOfBahaiYear - 342 - ayyamLength;
    }

    return {
        year: bahaiYear,
        month: bahaiMonths[lang][bahaiMonth],
        day: bahaiDay
    };
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function displayBahaiCalendar(lang = 'en') {
    const today = new Date();
    const bahaiDate = getBahaiDate(today, lang);
    const calendarDiv = document.getElementById('bahaiCalendar');
    const data = content[lang];

    if (calendarDiv && data) {
        const formattedDate = data.dateFormat(bahaiDate.day, bahaiDate.month, bahaiDate.year);
        calendarDiv.innerHTML = `<span class="bahai-label">${data.todayIs}</span> <span class="bahai-value">${formattedDate}</span>`;
    }
}

window.onload = function() {
    const saved = localStorage.getItem('selectedLanguage');
    const lang = (saved && content[saved]) ? saved : 'en';
    displayBahaiCalendar(lang);
};
