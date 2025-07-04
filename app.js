// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();

// Состояние приложения
let state = {
    decks: [],
    currentDeck: null,
    currentCardIndex: 0,
    isFlipped: false
};

// Данные колод и карточек (можно заменить на запрос к бэкенду)
const demoData = {
    decks: [
        {
            id: 1,
            name: "ТВУ",
            cards: [
                {
                    front: "assets/history_q1.jpg",
                    back: "assets/history_a1.jpg",
                    mnemonic: "assets/history_m1.jpg"
                },
                // ... другие карточки
            ]
        },
        // ... другие колоды
    ]
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    state.decks = demoData.decks;
    renderDecks();
    
    // Назначение обработчиков кнопок
    document.getElementById('prev-btn').addEventListener('click', showPrevCard);
    document.getElementById('next-btn').addEventListener('click', showNextCard);
    document.getElementById('flip-btn').addEventListener('click', flipCard);
});

// Рендер списка колод
function renderDecks() {
    const decksContainer = document.getElementById('decks-list');
    decksContainer.innerHTML = '';
    
    state.decks.forEach(deck => {
        const deckElement = document.createElement('div');
        deckElement.className = 'deck';
        deckElement.textContent = deck.name;
        deckElement.addEventListener('click', () => selectDeck(deck));
        decksContainer.appendChild(deckElement);
    });
}

// Выбор колоды
function selectDeck(deck) {
    state.currentDeck = deck;
    state.currentCardIndex = 0;
    state.isFlipped = false;
    
    document.getElementById('decks-list').classList.add('hidden');
    document.getElementById('card-container').classList.remove('hidden');
    document.getElementById('deck-title').textContent = deck.name;
    
    showCurrentCard();
}

// Показать текущую карточку
function showCurrentCard() {
    if (!state.currentDeck) return;
    
    const card = state.currentDeck.cards[state.currentCardIndex];
    const cardImage = document.getElementById('card-image');
    
    cardImage.src = state.isFlipped ? card.back : card.front;
}

// Перевернуть карточку
function flipCard() {
    state.isFlipped = !state.isFlipped;
    showCurrentCard();
    
    // Если перевернули на обратную сторону, показываем мнемонику через 2 секунды
    if (state.isFlipped) {
        setTimeout(() => {
            const card = state.currentDeck.cards[state.currentCardIndex];
            tg.showPopup({
                title: "Мнемоника",
                message: "Используйте этот образ для запоминания:",
                buttons: [{
                    id: 'ok',
                    type: 'default',
                    text: 'OK'
                }]
            }, () => {});
            
            // Здесь можно добавить показ картинки с мнемоникой
        }, 2000);
    }
}

// Следующая карточка
function showNextCard() {
    if (state.currentCardIndex < state.currentDeck.cards.length - 1) {
        state.currentCardIndex++;
        state.isFlipped = false;
        showCurrentCard();
    } else {
        tg.showAlert("Это последняя карточка в колоде!");
    }
}

// Предыдущая карточка
function showPrevCard() {
    if (state.currentCardIndex > 0) {
        state.currentCardIndex--;
        state.isFlipped = false;
        showCurrentCard();
    } else {
        tg.showAlert("Это первая карточка в колоде!");
    }
}
