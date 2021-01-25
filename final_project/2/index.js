class Card {
    constructor(nth_child, emoji, gameObj) {
        this.card = document.querySelector(`.cards .card:nth-child(${nth_child+1})`);
        let emojiNode = document.querySelector(`.cards .card:nth-child(${nth_child+1}) .emoji`);
        emojiNode.innerHTML = emoji;
        this.card.addEventListener('click', function(event) {
            gameObj.step(nth_child);
        });
    }

    removeSideClasses() {
        this.card.classList.remove('card__back_side');
        this.card.classList.remove('card__front_side');
    }

    toFrontSide() {
        this.removeSideClasses()
        this.card.classList.add('card__front_side');
    }

    toBackSide() {
        this.removeSideClasses()
        this.card.classList.add('card__back_side');
    }

    removeClass(className) {
        this.card.classList.remove(className);
    }
    addClass(className) {
        this.card.classList.add(className);
    }
}

class MemojiGame {
    constructor() {
        this.emojis = MemojiGame.availableEmoji.concat(MemojiGame.availableEmoji);
        this.emojis = this.emojis.sort(() => Math.random() - 0.5);
        
        this.finishCards = new Set();
        this.cards = new Array();
        for( let i = 0; i < 12; ++i) {
            this.cards.push(new Card(i, this.emojis[i], this));
        }
        this.gameState = 0; // 0 - нет открытой карты; 1 - есть открытая карта; 2 - две неыерные карты открыты
        this.prevCards = [];
    }

    
    luckyStep() {
        for(let cardIndex of this.prevCards) {
            this.cards[cardIndex].addClass('card__correct');
            this.finishCards.add(cardIndex);
        }   
        this.prevCards = [];   
        this.gameState = 0;
    }

    failedStep() {
        for(let cardIndex of this.prevCards) {
            this.cards[cardIndex].addClass('card__incorrect');
        }   
        this.gameState = 2;
    }
    failedCardsToBackSide() {
        for(let cardIndex of this.prevCards) {
            this.cards[cardIndex].toBackSide();
            this.cards[cardIndex].removeClass('card__incorrect');
        }
        this.prevCards = []; 
        this.gameState = 0;
    }

    step(curCard) {
        if(this.prevCards.includes(curCard) || this.finishCards.has(curCard)) {
            return;
        }
        if(this.gameState === 2) {
            this.failedCardsToBackSide();
        }

        this.cards[curCard].toFrontSide();
        this.prevCards.push(curCard);       
        if(this.gameState === 0) {
            this.gameState = 1;
        } else {
            if(this.emojis[this.prevCards[0]] == this.emojis[curCard]) {
                this.luckyStep();
            } else {
                this.failedStep();
            }
        }
    }
}

MemojiGame.availableEmoji = ['🐰', '🐻', '🐶', '🐸', '🐓', '🐨']

let game = new MemojiGame();