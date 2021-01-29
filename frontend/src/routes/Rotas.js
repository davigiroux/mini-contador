import { Route, Switch } from "react-router-dom"
import AdicionarConta from "../pages/AdicionarConta"
import Contas from "../pages/Contas"
import EditarConta from "../pages/EditarConta"
import Home from "../pages/Home"
import Login from "../pages/Login/Login"
import Registrar from "../pages/Registrar"
import RotaAutenticada from "./RotaAutenticada"

const rotas = [
    {path: '/contas/adicionar', component: AdicionarConta, rotaAutenticada: true },
    {path: '/contas', component: Contas, rotaAutenticada: true, exact: true },
    {path: '/contas/:contaId/editar', component: EditarConta, rotaAutenticada: true },
    {path: '/login', component: Login, rotaAutenticada: false },
    {path: '/registrar', component: Registrar, rotaAutenticada: false},
    {path: '/', component: Home, rotaAutenticada: false}
]


function Roteamento() {
    return (
        <Switch>
            {rotas.map((rota, index) => rota.rotaAutenticada 
            ? <RotaAutenticada key={index} path={rota.path} component={rota.component} exact />
            : <Route key={index} path={rota.path} component={rota.component} exact />
            )}
        </Switch>
    )
}

export default Roteamento