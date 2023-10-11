const validator = require('validator')

export default class ValidaLogin {
    constructor(formClass) {
        this.formClass = formClass
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const el = e.target
        this.isValid(el)
    }

    isValid(el) {
        let valid = true
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        const erros = document.querySelectorAll('.erro')

        for (let p of erros) {
            p.remove()
        }

        if (!validator.isEmail(emailInput.value)) {
            this.creatErr(emailInput, 'E-mail inválido, informe um e-mail válido')
            valid = false
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 20) {
            this.creatErr(passwordInput, 'Senha inválida, a senha precisa ter entre 3 e 20 caracteres')
            valid = false
        }

        if (valid) el.submit()
    }

    creatErr(field, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('erro')
        div.classList.add('text-danger')
        div.classList.add('mt-2')
        field.insertAdjacentElement('afterend', div);
    }
}