import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import thunk from 'redux-thunk';

const store = configureStore({
reducer: {
user: userReducer,
// ... другие редьюсеры
},
// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
    
    export default store;
    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
