const Contato = require('../models/contatoModel')

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
}

exports.register = async (req, res) => {
    try {

        const contato = new Contato(req.body)
        await contato.register()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contato')
            })
            return
        }

        req.flash('success', 'Seu contato foi salvo com sucesso.')
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`)
        })

    } catch (e) {
        console.log(e)
        res.render('404')
    }

}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')

    const contato = await Contato.buscaPorId(req.params.id)
    if (!contato) return res.render('404')

    res.render('contato', { contato })
}

exports.edit = async (req, res) => {
    try {

        if (!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect(`/contato`)
            })
            return
        }

        req.flash('success', 'Seu contato foi alterado com sucesso.')
        req.session.save(function () {
            return res.redirect(`/contato/index/${contato.contato._id}`)
        })

    } catch (e) {
        console.log(e)
        res.rende('404')
    }
}