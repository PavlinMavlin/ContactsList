import {AppActionsType, AppRootStateType} from "../store";
import {ThunkAction} from "redux-thunk";
import {contactsAPI, ContactType, GetContactResponseType} from "../../api/api";


enum CONTACTS_ACTIONS_TYPES {
    SET_CONTACT = "SET_CONTACT",
    REMOVE_CONTACT = "REMOVE_CONTACT",
    ADD_CONTACT = "ADD_CONTACT",
    UPDATE_CONTACT = "UPDATE_CONTACT",
}


const initialState = {
    data: [] as Array<ContactType>
}


type InitialStateType = typeof initialState


export const contactReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case CONTACTS_ACTIONS_TYPES.SET_CONTACT:
            return {...state, ...action.contactsState}

        case CONTACTS_ACTIONS_TYPES.REMOVE_CONTACT: {
            return {...state, data: state.data.filter(ct => ct.id !== action.id)}
        }
        case CONTACTS_ACTIONS_TYPES.ADD_CONTACT:
            const newContact: ContactType = {
                id: +(action.id),
                avatar: "",
                email: "efwefwfwef@e.com",
                first_name: action.name,
                last_name: action.lastName
            }
            return {
                ...state, data: [...state.data, newContact]
            }
        case CONTACTS_ACTIONS_TYPES.UPDATE_CONTACT:
            const contact = state.data.find(ct => ct.id === action.id);
            if (contact) {
                contact.first_name = action.name;
                contact.last_name = action.lastName;
            }
            return {...state, data: [...state.data]}

        default:
            return state
    }
}


// actions
export const setContactAC = (contactsState: GetContactResponseType) => (
    {type: CONTACTS_ACTIONS_TYPES.SET_CONTACT, contactsState} as const)

export const removeContactAC = (id: number) => (
    {type: CONTACTS_ACTIONS_TYPES.REMOVE_CONTACT, id} as const)

export const addContactAC = (name: string, lastName: string, id: number) => (
    {type: CONTACTS_ACTIONS_TYPES.ADD_CONTACT, name, lastName, id} as const)

export const updateContactAC = (name: string, lastName: string, id: number) => (
    {type: CONTACTS_ACTIONS_TYPES.UPDATE_CONTACT, id, name, lastName} as const)

//thunk
export const fetchContactsTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            const res = await contactsAPI.getContacts()
            dispatch(setContactAC(res.data))
        } catch (error) {
            console.log(error)
        } finally {
            // some code...
        }
    }

export const updateContactTC = (name: string, lastName: string, id: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            const res = await contactsAPI.updateContact(name, lastName, id)
            dispatch(updateContactAC(res.data.name, res.data.job, id))

        } catch (error) {
            console.log(error)

        } finally {
            // some code...
        }
    }
export const addCardTC = (name: string, lastName: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            const res = await contactsAPI.createContact(name, lastName)
            dispatch(addContactAC(res.data.name, res.data.job, +(res.data.id)))
        } catch (error) {
            console.log(error)
        } finally {
            // some code...
        }
    }
export const deleteContactTC = (id: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            const res = await contactsAPI.deleteContact(id)
            dispatch(removeContactAC(id))
        } catch (error) {
            console.log(error)
        } finally {
            // some code...
        }
    }


//types


export type CardsReducersActionTypes = ReturnType<typeof removeContactAC>
    | ReturnType<typeof addContactAC>
    | ReturnType<typeof updateContactAC>
    | ReturnType<typeof setContactAC>


