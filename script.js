// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // В начальном состоянии должна быть видна только домашняя вкладка
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    const homePane = document.getElementById('home');
    if (homePane) homePane.classList.add('active');

    // пока видео не просмотрено, вкладки скрыты
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) tabsContainer.style.display = 'none';
});

const birthdayVideo = document.getElementById('birthdayVideo');

// Функциональность вкладок
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Удаляем активный класс со всех кнопок и вкладок
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Добавляем активный класс к текущей кнопке и вкладке
        this.classList.add('active');
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
        }

        // Скрываем видео на остальных вкладках
        if (birthdayVideo) {
            birthdayVideo.style.display = (tabId === 'home') ? 'block' : 'none';
        }

        // Убираем уведомление (значок) при первом открытии вкладки
        if (tabId !== 'home') {
            const badge = document.getElementById(`badge-${tabId}`);
            if (badge) badge.classList.add('hidden');
        }
    });
});

// Функциональность письма и конверта
const envelope = document.getElementById('envelope');
const letterBox = document.getElementById('letterBox');
if (envelope) {
    envelope.addEventListener('click', function() {
        letterBox.classList.remove('hidden');
    });
}

// Видео на главной
const tabsContainer = document.querySelector('.tabs-container');
if (tabsContainer) {
    tabsContainer.style.display = 'none';
}

const playBirthdayVideoBtn = document.getElementById('playBirthdayVideo');
if (playBirthdayVideoBtn && birthdayVideo) {
    playBirthdayVideoBtn.addEventListener('click', function() {
        birthdayVideo.style.display = 'block';
        this.style.display = 'none';
        birthdayVideo.play().catch(() => {
            // автозапуск может блокироваться, но кнопка уже нажата
        });
    });

    let tabsUnlocked = false;

    function unlockTabs() {
        if (tabsUnlocked) return;
        tabsUnlocked = true;
        if (tabsContainer) {
            tabsContainer.style.display = 'flex';
        }
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.disabled = false;
        });
        ['tab1', 'tab2', 'tab3', 'tab4'].forEach(tabId => {
            const badge = document.getElementById(`badge-${tabId}`);
            if (badge) badge.classList.remove('hidden');
        });
    }

    birthdayVideo.addEventListener('timeupdate', function() {
        if (birthdayVideo.currentTime >= 18) {
            unlockTabs();
        }
    });

    birthdayVideo.addEventListener('ended', function() {
        unlockTabs();
    });
}

// Закрытие письма при клике вне него (на серый фон)
document.addEventListener('click', function(event) {
    if (letterBox && !letterBox.classList.contains('hidden') && 
        !letterBox.contains(event.target) && 
        event.target !== envelope && 
        !envelope.contains(event.target)) {
        letterBox.classList.add('hidden');
    }
});

const texts = [
  "ты красивый",
  "у тебя очень красивые глаза",
  "у тебя прелестная улыбка",
  "у тебя красивый голос",
  "ты умный",
  "ты во многом разбираешься",
  "ты спортивный",
  "ты очень красиво играешь на гитаре",
  "ты добрый",
  "ты всегда готов выслушать",
  "ты заботишься о чувствах других",
  "ты умеешь ценить и любить",

  "с тобой очень комфортно общаться",
  "тебе всегда можно довериться, не боясь реакции",
  "ты уделяешь время близким людям",
  "ты не бросаешь в трудные моменты",
  "мне спокойнее с таким другом, как ты",
  "тебе можно рассказать даже самые странные вещи, и ты не осудишь",
  "твоя поддержка очень помогает",
  "с тобой можно посплетничать",

  "с тобой нет ощущения, что надо быть «идеальной»",
  "ты не пропадаешь",
  "ты умеешь писать первым",
  "с тобой легко начать разговор",
  "ты не игнорируешь",
  "ты не обесцениваешь",
  "ты живой в общении",
  "с тобой не скучно",
  "ты видел меня разной, и все равно остался моим другом",
  "у тебя кайфовый юмор",

  "+ за то, что ты понравился лоне",
  "с тобой можно просто болтать ни о чем",
  "ты стал частью моей повседневности, моей жизни",
  "ты позволяешь считать тебя близким человеком",
  "ты показал мне, что можно доверять людям",
  "ты научил меня быть терпеливее",
  "ты научил меня по здоровому любить и ценить людей",
  "ты принимаешь мою тревожность",
  "ты не пытаешься менять людей",
  "ты умеешь не задевать человека в уязвимые моменты",
  "с тобой легче переживать сложные моменты",

  "ты бываешь рядом, когда нужен",
  "ты умеешь отвлекать и улучшать настроение",
  "ты не холодный человек",
  "ты умеешь проявляться",
  "ты не отталкиваешь",
  "ты интересный",
  "с тобой есть, о чем поговорить",
  "ты заботишься о других, нередко сильнее, чем о себе",
  "ты просто есть, и я это безумно ценю"
];

// Добавление 100 маленьких бумажек во вторую вкладку
const paperList = document.getElementById('paperList');
if (paperList) {
    for (let i = 1; i <= 50; i++) {
        const paper = document.createElement('div');
        paper.className = 'paper-item';
         // 👇 ВОТ ЭТО ГЛАВНОЕ
        const text = texts[(i - 1) % texts.length];

        paper.textContent = `№${i}: ${text}`;
        paperList.appendChild(paper);
    }
}

// Получаем обе иконки
const icons = [
    document.querySelector('.corner-icon-container'),
    document.querySelector('.second-icon-container')
];

// Обработчик клика на вкладки
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');

        icons.forEach(icon => {
            if (!icon) return;
            // Скрываем во второй вкладке, показываем во всех остальных
            icon.style.display = (tabId === 'tab2') ? 'none' : 'block';
        });
    });
});
