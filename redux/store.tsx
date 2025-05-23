// Learning page of typescript
'use client'
import {configureStore} from '@reduxjs/toolkit';
import colorPickerReducer from './slice';

export const store = configureStore({
    reducer: {
        colorpicker:  colorPickerReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;