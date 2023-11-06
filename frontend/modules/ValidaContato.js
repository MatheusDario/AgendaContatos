const validator = require('validator');

export default class ValidaContato {
    constructor(formClass) {
        this.formClass = formClass;
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) return
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        this.isValid(e);
    }

    isValid(e) {
        const el = e.target
        let valid = true;

        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        const erros = document.querySelectorAll('.erro');

        for (const element of erros) {
            element.remove();
        }

        if (!nomeInput.value) {
            this.createErrors(nomeInput, 'Seu contato precisa de um nome ou um e-mail válido');
            valid = false;
        }

        if (!sobrenomeInput.value) {
            this.createErrors(sobrenomeInput, 'Seu contato precisa de um sobrenome válido');
            valid = false;
        }

        if (!validator.isEmail(emailInput.value)) {
            this.createErrors(emailInput, 'Por favor, Informe um e-mail válido');
            valid = false;
        }

        if (!telefoneInput.value) {
            this.createErrors(telefoneInput, 'Informe o telefone de seu contato');
            valid = false;
        }

        if (valid) el.submit()
    }

    createErrors(field, msg) {
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('erro')
        div.classList.add('text-danger')
        div.classList.add('mt-2')
        field.insertAdjacentElement('afterend', div);
    }
}

