const mongoose = require('mongoose')
const validator = require('validator')


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: false, default: '' },
    email: { type: String, require: false, default: '' },
    telefone: { type: String, require: false, default: '' },
    criadoEm: { type:Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }
    async register() {
        this.valida()

        if(this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    static async buscaPorId(id) {
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findById(id)
        return contato
    }

    static async buscaContatos() {
        const contatos = await ContatoModel.find()
        .sort({ criadoEm: -1 })
        return contatos
    }

    static async delete(id) {
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findOneAndDelete({ _id: id })
        return contato
    }

    async edit(id) {
        if(typeof id !== 'string') return
        this.valida()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new:true })
    }

    valida() {
        this.cleanUp()

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
        if (!this.body.email && !this.body.telefone) {
            this.errors.push('Para salvar um contato é preciso de um telefone ou um e-mail')
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }
}

module.exports = Contato