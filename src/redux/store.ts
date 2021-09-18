import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {contactReducer, CardsReducersActionTypes} from "./reducers/contact-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';


 const rootReducer = combineReducers({
  contactReducer:contactReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType=CardsReducersActionTypes
// @ts-ignore
window.store = store;