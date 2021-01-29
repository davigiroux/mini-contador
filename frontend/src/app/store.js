import { configureStore } from '@reduxjs/toolkit';
import usuarioLogadoReducer from '../pages/Login/usuarioLogadoSlice';

export default configureStore({
  reducer: {
    usuarioLogado: usuarioLogadoReducer,
  },
});
