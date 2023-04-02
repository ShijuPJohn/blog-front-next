import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from './reducers/user_slice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export default store
store.subscribe(() => {
    localStorage.setItem('store', JSON.stringify(store.getState()))
})