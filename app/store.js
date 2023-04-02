import {configureStore} from '@reduxjs/toolkit'
import {userReducer} from './reducers/user_slice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export default store
store.subscribe(() => {
    console.log("store.getState()",store.getState())
    localStorage.setItem('store', JSON.stringify(store.getState()))
})