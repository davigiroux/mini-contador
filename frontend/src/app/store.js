import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import nomeReducer from '../features/nome/nomeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    nome: nomeReducer
  },
});
