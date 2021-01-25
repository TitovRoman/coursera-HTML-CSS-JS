function rotateRegidter() {
    let cards = Array.from(document.querySelectorAll('.card'));

    console.log();

    let handler = function(event) {
        let obj = this;
        obj.classList.remove('card__back_side');
        obj.classList.remove('card__front_side');

        obj.dataset.side = obj.dataset.side ?? 'back';
        if (obj.dataset.side === 'back') {
            obj.classList.add('card__front_side');
            obj.dataset.side = 'front';
        } else {
            obj.classList.add('card__back_side');
            obj.dataset.side = 'back';
        }
    }

    cards.forEach( element => element.addEventListener('click', handler));
}

rotateRegidter();