let eventMixin = {
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName].push(handler);
    },
  
    off(eventName, handler) {
      let handlers = this._eventHandlers && this._eventHandlers[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i--, 1);
        }
      }
    },
  
    trigger(eventName, ...args) {
      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return; 
      }
  
      this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};

class Card {
    constructor(nth_child) {
        this.card = document.querySelector(`.cards .card:nth-child(${nth_child+1})`);
        this.emojiNode = document.querySelector(`.cards .card:nth-child(${nth_child+1}) .emoji`);
    }

    addEventListener(eventName, handler) {
        this.card.addEventListener(eventName, handler);
    }

    setEmoji(emoji) {
        this.emojiNode.innerHTML = emoji;
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

class Timer {
    constructor(interval) {
        this.timer = document.querySelector(`#timer`);
        this.interval = interval;
        this.init();
    }

    init() {
        this.timerState = 0;
        this.printTime(this.interval);
    }

    start() {
        if(this.timerState === 0) {
            this.init();   
            this.timerState = 1;
            this.currentTime = this.interval;
        }
        
        this.timerId = setInterval(() => {
            this.currentTime -= 1;
            this.printTime(this.currentTime);
            if(this.currentTime === 0) {
                this.timerState = 0;
                this.pause();
                this.trigger('endTime');
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.timerId);
    }


    _addLeadingZero(value) {
        value = String(value);
        return value.length < 2 ? '0' + value : value;
    }

    printTime(time) {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        this.timer.innerHTML = `${this._addLeadingZero(min)}:${this._addLeadingZero(sec)}`;
    }
}

class Popup {
    constructor() {
        this.popup = document.querySelector(`.cards__popup`);
        this.disable();

        document.querySelector(`.cards__popup__button`).addEventListener('click', 
            event => {
                this.disable();
                this.trigger('buttonClick');
            });
    }
    disable() {
        this.popup.classList.add('disable');
    }

    win() {
        this.popup.classList.remove('disable');
        this.popup.classList.remove('lose');
        document.querySelector(`.cards__popup__button`).value = "Play again";

        this.popup.classList.add('win');
    }

    lose() {
        this.popup.classList.remove('disable');
        this.popup.classList.remove('win');
        document.querySelector(`.cards__popup__button`).value = "Try again";

        this.popup.classList.add('lose');
    }
}
class MemojiGame {
    constructor() {
        this.emojis = MemojiGame.availableEmojis.concat(MemojiGame.availableEmojis);

        this.timer = new Timer(60);
        this.timer.on('endTime', this.gameOver.bind(this));

        this.popup = new Popup();
        this.popup.on('buttonClick', this.initNewGame.bind(this));

        this.cards = new Array();
        for( let i = 0; i < 12; ++i) {
            let card = new Card(i);
            card.addEventListener('click', (event) => {
                this.step(i);
            });
            this.cards.push(card);
        }

        this.initNewGame();
    }

    gameOver() {
        this.popup.lose();
    }

    winGame() {
        this.timer.pause();
        this.popup.win();
    }

    async shuffle() {
        let openCards = Array.from(this.finishCards ?? []).concat(this.prevCards ?? []);
        openCards.sort((l, r) => Number(l) - Number(r));

        if(openCards.length > 0)
        { 
            await new Promise(resolve => setTimeout(resolve, 200));
            for(let cardId of openCards) {
                this.cards[cardId].toBackSide();
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        this.cards.forEach(card => {
            card.removeClass('card__incorrect');
            card.removeClass('card__correct');
            card.toBackSide()
        });
        this.setEmojis();
        this.timer.init();
    }

    initNewGame() {
        this.gameState = -2; // -2 - не активно -1 - таймер в 1:00 0 - нет открытой карты; 1 - есть открытая карта; 2 - две неверные карты открыты
        this.shuffle().then(
            () => {
                this.finishCards = new Set();
                this.prevCards = [];
                this.cntFinishCards = 0;
                this.gameState = -1;
            }
        );             
    }

    setEmojis() {
        this.emojis = this.emojis.sort(() => Math.random() - 0.5);
        this.cards.forEach((card, ind) => card.setEmoji(this.emojis[ind]));
    }
    
    luckyStep() {
        for(let cardIndex of this.prevCards) {
            this.cards[cardIndex].addClass('card__correct');
            this.finishCards.add(cardIndex);
        }   
        this.cntFinishCards += this.prevCards.length;
        this.prevCards = [];
         
        if(this.cntFinishCards === this.emojis.length) {
            this.winGame();
        } else {
            this.gameState = 0;
        }
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
        if(this.gameState == -2 || this.prevCards.includes(curCard) || this.finishCards.has(curCard)) {
            return;
        }
        if(this.gameState == -1) {
            this.timer.start();
            this.gameState = 0;
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

MemojiGame.availableEmojis = ['🐰', '🐻', '🐶', '🐸', '🐓', '🐨']
Object.assign(Timer.prototype, eventMixin);
Object.assign(Popup.prototype, eventMixin);

let game = new MemojiGame();