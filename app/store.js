import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userLoginReducer} from "./reducers/userLoginReducer";

const reducer = combineReducers({
    user:userLoginReducer,
})
function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem("store", serializedStore);
    } catch (e) {
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem("store");
        if (serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch (e) {
        return undefined;
    }
}
const initialState = loadFromLocalStorage()

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) //TODO createStore() is deprecated

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store
