
export default class ValidaContato {
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
        const nomeInput = el.querySelector('input[name="nome"]')
        const emailInput = el.querySelector('input[name="email"]')
        console.log(emailInput, nomeInput)
    }
}

