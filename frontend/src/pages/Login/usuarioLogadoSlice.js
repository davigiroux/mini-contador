import { createSlice } from '@reduxjs/toolkit';

export const usuarioLogadoSlice = createSlice({
  name: 'usuarioLogado',
  initialState: JSON.parse(localStorage.getItem('usuarioLogado')) || { nome: "", _id: "", token: "" },
  reducers: {
    logadoComSucesso: (state, action) => { // Reducers
      localStorage.setItem('usuarioLogado', JSON.stringify(action.payload));

      return action.payload
    },
    deslogadoComSucesso: (state, action) => { // Reducers
      localStorage.removeItem('usuarioLogado');

      return {
        nome: "",
        token: "",
        _id: ""
      };
    },
  },
});

export const { logadoComSucesso, deslogadoComSucesso } = usuarioLogadoSlice.actions; // Actions

export const selecionarUsuarioLogado = state => state.usuarioLogado; // Retorno de state

export default usuarioLogadoSlice.reducer;
