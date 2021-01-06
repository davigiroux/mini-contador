import { createSlice } from '@reduxjs/toolkit';

export const nomeSlice = createSlice({
  name: 'nome',
  initialState: '',
  reducers: {
    alterarNome: (state, action) => { // Reducers
      return action.payload;
    },
  },
});

export const { alterarNome } = nomeSlice.actions; // Actions

export const selecionaNome = state => state.nome; // Retorno de state

export default nomeSlice.reducer;
