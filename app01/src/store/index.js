import { configureStore } from '@reduxjs/toolkit';
import todosReducers from './todosReducers';

export const store = configureStore({
    reducer: todosReducers
});