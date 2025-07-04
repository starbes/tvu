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

// Демо-данные (замените на свои)
const demoData = {
    decks: [
        {
            id: 1,
            name: "ТВУ",
            cards: [
                {
                    front: "./s1-1.JPG", // Вопрос
                    back: "./s1-2.JPG"   // Ответ
                },
                {
                    front: "./s2-1.JPG", // Вопрос
                    back: "./s2-2.JPG"   // Ответ
                },
                {
                    front: "./s3-1.JPG", // Вопрос
                    back: "./s3-2.JPG"   // Ответ
                },
                {
                    front: "./s4-1.JPG", // Вопрос
                    back: "./s4-2.JPG"   // Ответ
                },
                {
                    front: "./s5-1.JPG", // Вопрос
                    back: "./s5-2.JPG"   // Ответ
                }
            ]
        }
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
