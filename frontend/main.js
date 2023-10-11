import 'core-js/stable'
import 'regenerator-runtime/runtime'

import ValidaLogin from './modules/ValidaLogin'

const login = new ValidaLogin('.form-login')
const cadastro = new ValidaLogin('.form-cadastro')
login.init()
cadastro.init()

