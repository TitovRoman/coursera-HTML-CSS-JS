'use strict';

function validateForm({formId, formValidClass, formInvalidClass, inputErrorClass}) {
    function checkRegExp(value, reg) {
        reg = new RegExp(reg);
        return reg.test(value);
    }
    function checkNumber(value, min, max) {
        let num = Number(value);

        if (isNaN(num)) {
            return false;
        }

        if (min && Number(min) > num) {
            return false
        }

        if (max && Number(max) < num) {
            return false
        }

        return checkRegExp(value, "^(-?\d+(\.\d+)?)|((-?\.\d+)?)$")
    }

    function validationInput(input) {
        if(input.dataset.hasOwnProperty('required') && input.value === '') {
            return false;
        }

        if(input.dataset.hasOwnProperty('validator') && input.value.length > 0) {
            if( input.dataset.validator === 'letters') {
                return checkRegExp(input.value, "^[a-zа-яё]+$");
            } else if( input.dataset.validator === 'number') {
                return checkNumber(input.value, input.dataset.validatorMin, input.dataset.validatorMax);
            } else if( input.dataset.validator === 'regexp') {
                return checkRegExp(input.value, input.dataset.validatorPattern);
            }
        }
        return true;
    }

    function checkInputAndSetClass(element) {
        if(element.tagName !== 'INPUT') {
            return;
        }
        if(validationInput(element)) {
            element.classList.remove(inputErrorClass);
            return true;
        } else {
            element.classList.add(inputErrorClass);
            return false;
        }
    }

    let form = document.querySelector('#' + formId);
    form.addEventListener('submit', function(event) 
        {
            event.preventDefault();
            let inputs = Array.from(document.querySelectorAll('#' + formId + ' input'));

            let flagInvalidInput = false;
            for( let input of inputs) {
                flagInvalidInput = !checkInputAndSetClass(input) || flagInvalidInput;
            }

            if(flagInvalidInput) {
                this.classList.remove(formValidClass);
                this.classList.add(formInvalidClass);
            } else {
                this.classList.remove(formInvalidClass);
                this.classList.add(formValidClass);
            }
        }
    );

    form.addEventListener('focus', function(event) 
        {
            if(event.target.tagName === 'INPUT') {
                event.target.classList.remove(inputErrorClass);
            }
        }, 
    true);

    form.addEventListener('blur', function(event) 
        {
            if(event.target.tagName === 'INPUT')
            {
                checkInputAndSetClass(event.target) 
            }
        }, 
    true);
}
