import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selecionarUsuarioLogado } from "../pages/Login/usuarioLogadoSlice";

function RotaAutenticada ({component: Component, ...rest}) {
    const usuarioLogado = useSelector(selecionarUsuarioLogado);
    const autenticado = usuarioLogado.nome.length > 0;
    return (
      <Route
        {...rest}
        render={(props) => autenticado
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  export default RotaAutenticada;