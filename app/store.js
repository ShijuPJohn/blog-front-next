import {configureStore} from '@reduxjs/toolkit'
import {nextReducer, userReducer} from './reducers/user_slice'
import {createWrapper} from "next-redux-wrapper";

const store = configureStore({
    reducer: {
        user: nextReducer
    }
})
export default store
store.subscribe(() => {
    localStorage.setItem('store', JSON.stringify(store.getState()))
})
export const wrapper = createWrapper(store)