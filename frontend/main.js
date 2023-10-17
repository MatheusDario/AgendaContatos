import 'core-js/stable'
import 'regenerator-runtime/runtime'

import ValidaLogin from './modules/ValidaLogin'
import ValidaContato from './modules/ValidaContato'

const login = new ValidaLogin('.form-login')
const cadastro = new ValidaLogin('.form-cadastro')
const contato = new ValidaContato('.form-contato')

login.init()
cadastro.init()
//contato.init()
