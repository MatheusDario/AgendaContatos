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
            let p = document.createElement('p')
            let errorMsg = document.createTextNode('E-mail inválido')
            p.appendChild(errorMsg)
            p.classList.add('erro')
            p.classList.add('text-danger')
            emailInput.after(p)
            valid = false
        }

        if (passwordInput.value.length < 3 || passwordInput.value.length > 20) {
            let p = document.createElement('p')
            let errorMsg = document.createTextNode('A senha precisa ter entre 3 e 20 caracteres')
            p.appendChild(errorMsg)
            p.classList.add('erro')
            p.classList.add('text-danger')
            emailInput.after(p)
            valid = false
        }
        if(valid) el.submit()
    }
}